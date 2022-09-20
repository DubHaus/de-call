import {ApolloServer, ExpressContext} from 'apollo-server-express';
import {DataSource} from 'typeorm';
import {testConnection} from '../../test-utility/connection';
import {createServer, cleanServer} from '../../test-utility/createServer';
import {User} from '../../entity/User';
import {createTestUser} from '../../test-utility/utils';
import {createAccessToken} from '../../utils/auth';

let db: DataSource;

beforeAll(async () => {
    db = await testConnection();
});
afterAll(async () => {
    await db.destroy();
});

const registerMutation = `
        mutation Register($input: CreateUserInput!) {
            register(input: $input)
          }`;

const loginMutation = `
        mutation Login($input: LoginUserInput!) {
            login(input: $input) {
              accessToken
            }
          }`;

const userQuery = `
        query User {
            user {
            id
            email
            firstName
            lastName
            }
        }`;

describe('UserResolver', () => {
    describe('mutation - Register', () => {
        let server: ApolloServer<ExpressContext>;

        beforeAll(async () => {
            server = await createServer();
        });
        afterAll(async () => {
            await cleanServer();
        });

        it('have "register" mutation', async () => {
            const responce = await server.executeOperation({
                query: registerMutation,
                variables: {},
            });

            const errorCodes = responce.errors?.map(
                err => err.extensions?.code
            );

            expect(errorCodes).not.toContain('GRAPHQL_VALIDATION_FAILED');
        });

        it('accept input as CreateUserInput form', async () => {
            const correctUser = createTestUser();

            const responce = await server.executeOperation({
                query: registerMutation,
                variables: {
                    input: correctUser,
                },
            });

            expect(responce.errors).toBeUndefined();
        });

        it('if user has been created return true', async () => {
            const correctUser = createTestUser();

            const responce = await server.executeOperation({
                query: registerMutation,
                variables: {
                    input: correctUser,
                },
            });

            expect(responce.data?.register).toBe(true);
        });

        it('create user in database', async () => {
            const correctUser = createTestUser();

            const responce = await server.executeOperation({
                query: registerMutation,
                variables: {
                    input: correctUser,
                },
            });
            const user = await User.findOne({
                where: {email: correctUser.email},
            });

            expect(responce.data?.register).toBe(true);
            expect(user).toMatchObject({
                email: correctUser.email,
                firstName: correctUser.firstName,
                lastName: correctUser.lastName,
            });
        });

        it('when user firstly created field emailVerified set to false', async () => {
            const correctUser = createTestUser();
            const responce = await server.executeOperation({
                query: registerMutation,
                variables: {
                    input: correctUser,
                },
            });
            const user = await User.findOne({
                where: {email: correctUser.email},
            });

            expect(responce.data?.register).toBe(true);
            expect(user).toMatchObject({
                emailVerified: false,
            });
        });

        it('throw error when user already exist', async () => {
            const user = createTestUser();

            const responce = await server.executeOperation({
                query: registerMutation,
                variables: {
                    input: user,
                },
            });
            expect(responce.data?.register).toBe(true); // user created

            const newResponce = await server.executeOperation({
                query: registerMutation,
                variables: {
                    input: user,
                },
            });

            const errorCodes = newResponce.errors?.map(
                err => err.extensions?.code
            );
            const errorMessages = newResponce.errors?.map(err => err.message);

            expect(errorCodes).toContain('BAD_USER_INPUT');
            expect(errorMessages).toContain(
                'User with this email already exist! Please sign in.'
            );
        });

        // it('throw error when email is invalid', async () => {
        //     const user = createTestUser();

        //     const responce = await server.executeOperation({
        //         query: registerMutation,
        //         variables: {
        //             input: {...user, email: 'invalid_email'},
        //         },
        //     });

        //     const errorCodes = responce.errors?.map(
        //         err => err.extensions?.code
        //     );
        //     const errorMessages = responce.errors?.map(err => err.message);

        //     expect(errorCodes).toContain('BAD_USER_INPUT');
        //     expect(errorMessages).toContain('Email is invalid');
        // });
    });

    describe('mutation - Login', () => {
        let server: ApolloServer<ExpressContext>;
        const setCookies = jest.fn();

        beforeAll(async () => {
            server = await createServer({
                context: {
                    req: {},
                    res: {
                        cookie: setCookies,
                    },
                },
            });
        });
        afterAll(async () => {
            await cleanServer();
        });

        it('have "login" mutation', async () => {
            const responce = await server.executeOperation({
                query: loginMutation,
            });

            const errorCodes = responce.errors?.map(
                err => err.extensions?.code
            );

            expect(errorCodes).not.toContain('GRAPHQL_VALIDATION_FAILED');
        });

        it('when login is successful - return accessToken string in responce', async () => {
            const user = createTestUser();
            const registerResponce = await server.executeOperation({
                query: registerMutation,
                variables: {input: user},
            });
            expect(registerResponce.data?.register).toBe(true); // user created

            const loginReponse = await server.executeOperation({
                query: loginMutation,
                variables: {
                    input: {
                        email: user.email,
                        password: user.password,
                    },
                },
            });

            expect(loginReponse.data?.login?.accessToken).toBeDefined();
            expect(typeof loginReponse.data?.login?.accessToken).toBe('string');
        });

        it('when login is successful - set to "rto" cookie field refresh token', async () => {
            const user = createTestUser();
            const registerResponce = await server.executeOperation({
                query: registerMutation,
                variables: {input: user},
            });
            expect(registerResponce.data?.register).toBe(true); // user created

            await server.executeOperation({
                query: loginMutation,
                variables: {
                    input: {
                        email: user.email,
                        password: user.password,
                    },
                },
            });

            expect(setCookies.mock.lastCall[0]).toBe('rto'); // name
            expect(typeof setCookies.mock.lastCall[1]).toBe('string'); // token
            expect(setCookies.mock.lastCall[2]).toMatchObject({httpOnly: true}); // params
        });

        it('when password or email incorrect - throw error', async () => {
            const user = createTestUser();
            const registerResponce = await server.executeOperation({
                query: registerMutation,
                variables: {input: user},
            });
            expect(registerResponce.data?.register).toBe(true); // user created

            // password incorrect
            const passwordResponce = await server.executeOperation({
                query: loginMutation,
                variables: {
                    input: {
                        email: user.email,
                        password: user.password + 'not_correct_password',
                    },
                },
            });
            const passwordErrors = passwordResponce.errors?.map(
                err => err.extensions?.code
            );
            const passwordMessages = passwordResponce.errors?.map(
                err => err.message
            );
            expect(passwordErrors).toContain('BAD_USER_INPUT');
            expect(passwordMessages).toContain('Invalid login or password');

            // email incorrect
            // const emailResponce = await server.executeOperation({
            //     query: loginMutation,
            //     variables: {
            //         input: {
            //             email: user.email + 'not_correct_email',
            //             password: user.password,
            //         },
            //     },
            // });
            // const emailErrors = emailResponce.errors?.map(
            //     err => err.extensions?.code
            // );
            // const emailMessages = emailResponce.errors?.map(err => err.message);
            // expect(emailErrors).toContain('BAD_USER_INPUT'); TODO FIX it
            // expect(emailMessages).toContain('Invalid login or password');
        });
    });

    describe('query - User', () => {
        let server = null;
        afterAll(async () => {
            await cleanServer();
        });

        it('have query "user"', async () => {
            server = await createServer({});

            const responce = await server.executeOperation({query: userQuery});

            const errorCodes = responce.errors?.map(
                err => err.extensions?.code
            );

            expect(errorCodes).not.toContain('GRAPHQL_VALIDATION_FAILED');
        });

        it('when user is authorized returns user data', async () => {
            const user = createTestUser();
            await User.insert(user);
            const dbUser = (await User.findOne({
                where: {email: user.email},
            })) as User;
            const correctToken = createAccessToken(dbUser);

            server = await createServer({
                context: {
                    req: {
                        headers: {
                            authorization: `bearer ${correctToken}`,
                        },
                    },
                },
            });

            const responce = await server.executeOperation({query: userQuery});
            expect(responce.data?.user).toMatchObject({
                id: `${dbUser.id}`,
                firstName: dbUser.firstName,
                lastName: dbUser.lastName,
                email: dbUser.email,
            });
        });

        it('when user is not authorized throw an error', async () => {
            server = await createServer({
                context: {
                    req: {
                        headers: {},
                    },
                },
            });

            const responce = await server.executeOperation({query: userQuery});

            const errorCodes = responce.errors?.map(
                err => err.extensions?.code
            );
            const errorMessages = responce.errors?.map(err => err.message);

            expect(errorCodes).toContain('UNAUTHENTICATED');
            expect(errorMessages).toContain('not authenticated');
        });
    });

    // describe("mutation - Logout", () => {
    // })
});
