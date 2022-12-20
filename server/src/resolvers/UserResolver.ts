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
import {UserInputError} from 'apollo-server-express';

@Resolver(() => User)
export class UserResolver {
    @Query(() => Boolean)
    async isLoggedIn(@Ctx() {currentUser}: MyContext): Promise<Boolean | null> {
        return !!currentUser;
    }

    @Query(() => User)
    @UseMiddleware(isAuth)
    async user(@Ctx() {currentUser}: MyContext): Promise<User | null> {
        return User.findOne({
            where: {username: currentUser!.username},
            relations: {
                profile: {
                    interests: true,
                },
            },
        });
    }

    @Query(() => [User])
    async users(): Promise<User[]> {
        return User.find({relations: {profile: true}});
    }

    @Mutation(() => Boolean)
    async register(@Arg('input') {email, password, username}: CreateUserInput) {
        const alreadyExist = await User.findOne({
            where: [{email}, {username}],
        });
        if (alreadyExist) {
            throw new UserInputError(
                'User already exist! Please sign in.'
            );
        }
        try {
            const user = new User();
            user.email = email;
            user.username = username;
            user.password = await hash(password);
            await User.save(user);
            return true;
        } catch (err) {
            console.log(err);
            throw new GraphQLError("Couldn't register new user");
        }
    }

    @Mutation(() => LoginResponse)
    async login(
        @Arg('input') {email, password}: LoginUserInput,
        @Ctx() {res}: MyContext
    ): Promise<LoginResponse> {
        const user = await User.findOne({where: {email}});

        if (!user) {
            throw new UserInputError('Invalid login or password');
        }

        const valid = password && (await verify(user.password, password));
        if (!valid) {
            throw new UserInputError('Invalid login or password');
        } else {
            sendRefreshToken(res, createRefreshToken(user));

            return {
                accessToken: createAccessToken(user),
            };
        }
    }

    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async logout(@Ctx() {res}: MyContext) {
        sendRefreshToken(res, '');
        res.clearCookie('rto');

        return true;
    }

    @Mutation(() => Boolean)
    async revokeRefreshTokensForUser(
        @Arg('username', () => Int) username: string
    ) {
        await AppDataSource.getRepository(User).increment(
            {username},
            'tokenVersion',
            1
        );
        return true;
    }
}
