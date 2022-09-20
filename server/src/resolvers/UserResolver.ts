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
    @Query(() => User)
    @UseMiddleware(isAuth)
    async user(@Ctx() {currentUser}: MyContext): Promise<User | null> {
        return User.findOne({
            where: {id: currentUser!.userId},
            relations: {
                profile: {
                    categories: true,
                    socials: true,
                },
            },
        });
    }

    @Query(() => [User])
    async users(): Promise<User[]> {
        return User.find();
    }

    @Mutation(() => Boolean)
    async register(
        @Arg('input') {email, firstName, password, lastName}: CreateUserInput
    ) {
        const alreadyExist = await User.findOne({
            where: {email},
        });
        if (alreadyExist) {
            throw new UserInputError(
                'User with this email already exist! Please sign in.'
            );
        }
        try {
            const user = new User();
            user.email = email;
            user.firstName = firstName;
            user.lastName = lastName;
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
    async revokeRefreshTokensForUser(@Arg('userId', () => Int) userId: string) {
        await AppDataSource.getRepository(User).increment(
            {id: userId},
            'tokenVersion',
            1
        );
        return true;
    }
}
