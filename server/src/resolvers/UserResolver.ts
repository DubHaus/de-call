import {User} from '../entity/User';
import {
    Arg,
    Ctx,
    Int,
    Mutation,
    Query,
    Resolver,
    UseMiddleware,
} from 'type-graphql';
import {CreateUserInput, LoginResponse, LoginUserInput} from './types/user';
import {hash, verify} from 'argon2';
import {GraphQLError} from 'graphql';
import {MyContext} from '../ts-types/context';
import {createAccessToken, createRefreshToken} from '../utils/auth';
import {isAuth} from '../middleware/isAuth';
import {sendRefreshToken} from '../utils/sendRereshToken';
import {AppDataSource} from '../data-source';

@Resolver(() => User)
export class UserResolver {
    @Query(() => User)
    @UseMiddleware(isAuth)
    async user(@Ctx() {currentUser}: MyContext): Promise<User | null> {
        return User.findOne({where: {id: currentUser!.userId}});
    }

    @Query(() => [User])
    async users(): Promise<User[]> {
        return User.find();
    }

    @Mutation(() => Boolean)
    async register(@Arg('input') newUser: CreateUserInput) {
        const hashedPassword = await hash(newUser.password);
        try {
            await User.insert({...newUser, password: hashedPassword});
            return true;
        } catch (err) {
            console.log(err);
            throw new GraphQLError("Couldn't register new user", err);
        }
    }

    @Mutation(() => LoginResponse)
    async login(
        @Arg('input') {email, password}: LoginUserInput,
        @Ctx() {res}: MyContext
    ): Promise<LoginResponse> {
        const user = await User.findOne({where: {email}});

        if (!user) {
            throw new GraphQLError('Invalid login');
        }

        if (!password) {
            throw new GraphQLError('Invalid password');
        }

        const valid = await verify(user.password, password);
        if (!valid) {
            throw new GraphQLError('Invalid password');
        } else {
            sendRefreshToken(res, createRefreshToken(user));

            return {
                accessToken: createAccessToken(user),
            };
        }
    }

    @Mutation(() => Boolean)
    async logout(@Ctx() {res}: MyContext) {
        sendRefreshToken(res, '');
        res.clearCookie('rto');

        return true;
    }

    @Mutation(() => Boolean)
    async revokeRefreshTokensForUser(@Arg('userId', () => Int) userId: number) {
        await AppDataSource.getRepository(User).increment(
            {id: userId},
            'tokenVersion',
            1
        );
        return true;
    }
}
