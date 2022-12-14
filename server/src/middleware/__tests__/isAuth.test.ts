import {AuthenticationError} from 'apollo-server-express';
import {ResolverData} from 'type-graphql';
import {DataSource} from 'typeorm';
import {User} from '../../entity/User';
import {testConnection} from '../../test-utility/connection';
import {createTestUser} from '../../test-utility/utils';
import {MyContext} from '../../ts-types/context';
import {createAccessToken} from '../../utils/auth';
import {isAuth} from '../isAuth';

let db: DataSource;

beforeAll(async () => {
    db = await testConnection();
});
afterAll(async () => {
    await db.destroy();
});

describe('isAuth', () => {
    it('middleware is a function', () => {
        expect(typeof isAuth).toBe('function');
    });

    it(`when provied context with correct authorization header 
        - will extract current user id and set it in context field`, async () => {
        const user = createTestUser();
        await User.insert(user);
        const dbUser = await User.findOne({where: {email: user.email}});
        const correctToken = createAccessToken(dbUser!);

        const params = {
            context: {
                req: {
                    headers: {
                        authorization: `bearer ${correctToken}`,
                    },
                },
                res: {},
            },
        } as ResolverData<MyContext>;

        isAuth(params, jest.fn());

        expect(params.context).toMatchObject({
            currentUser: {
                username: dbUser!.username,
            },
        });
    });

    it(`when provied context with correct authorization header 
        - will call "next" function`, async () => {
        const user = createTestUser();
        await User.insert(user);
        const dbUser = await User.findOne({where: {email: user.email}});
        const correctToken = createAccessToken(dbUser!);
        const next = jest.fn();

        const params = {
            context: {
                req: {
                    headers: {
                        authorization: `bearer ${correctToken}`,
                    },
                },
                res: {},
            },
        } as ResolverData<MyContext>;

        isAuth(params, next);

        expect(next).toBeCalled();
    });

    it(`when provied context with incorrect authrizaiton headers 
        - will throw error`, async () => {
        const correctToken = 'random_incorrect_token';

        const params = {
            context: {
                req: {
                    headers: {
                        authorization: `bearer ${correctToken}`,
                    },
                },
                res: {},
            },
        } as ResolverData<MyContext>;

        expect(() => isAuth(params, jest.fn())).toThrowError(
            'not authenticated'
        );
    });

    it(`when provied context with no authrizaiton headers 
        - will throw error`, async () => {
        const params = {
            context: {
                req: {
                    headers: {},
                },
                res: {},
            },
        } as ResolverData<MyContext>;

        expect(() => isAuth(params, jest.fn())).toThrowError(
            new AuthenticationError('not authenticated')
        );
    });
});
