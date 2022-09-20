import {ApolloServer, ExpressContext} from 'apollo-server-express';
import {DataSource} from 'typeorm';
import {Category} from '../../entity/catalogs/Category';
import {User} from '../../entity/User';
import {testConnection} from '../../test-utility/connection';
import {cleanServer} from '../../test-utility/createServer';
import {
    createServerWithoutUser,
    createServerWithUser,
} from '../../test-utility/utils';

let db: DataSource;

beforeAll(async () => {
    db = await testConnection();
});
afterAll(async () => {
    await db.destroy();
});

const createProfileMutation = `mutation CreateProfile($input: CreateProfileInput!) {
    createProfile(input: $input)
  }`;

describe('ProfileResolver', () => {
    let server: ApolloServer<ExpressContext>;
    afterAll(async () => {
        await cleanServer();
    });
    describe('mutation - CreateProfile', () => {
        it('have "createProfile" mutation', async () => {
            server = await createServerWithoutUser();

            const responce = await server.executeOperation({
                query: createProfileMutation,
                variables: {},
            });

            const errorCodes = responce.errors?.map(
                err => err.extensions?.code
            );

            expect(errorCodes).not.toContain('GRAPHQL_VALIDATION_FAILED');
        });

        it('if user not authorized will throw error', async () => {
            server = await createServerWithoutUser();
            const input = {
                bio: 'bio',
                categories: [],
                socials: {
                    github: 'github.com',
                    instagramm: 'instagramm.com',
                    twitter: 'twitter.com',
                },
            };

            const responce = await server.executeOperation({
                query: createProfileMutation,
                variables: {
                    input,
                },
            });

            const errorCodes = responce.errors?.map(
                err => err.extensions?.code
            );

            expect(errorCodes).toContain('UNAUTHENTICATED');
        });

        it(`if user does not exist - will throw error`, async () => {
            const {user, server: serverWithUser} = await createServerWithUser();
            server = serverWithUser;

            await User.remove(user); // now user does not exist

            const input = {
                bio: 'bio',
                categories: [],
                socials: {
                    github: 'github.com',
                    instagramm: 'instagramm.com',
                    twitter: 'twitter.com',
                },
            };

            const responce = await server.executeOperation({
                query: createProfileMutation,
                variables: {
                    input,
                },
            });

            const errorCodes = responce.errors?.map(
                err => err.extensions?.code
            );

            const errorMsgs = responce.errors?.map(err => err.message);

            expect(errorCodes).toContain('INTERNAL_SERVER_ERROR');
            expect(errorMsgs).toContain('User does not exist');
        });

        it(`when user is authorized, doesn't have a profile - will create new profile for user `, async () => {
            const {user, server: serverWithUser} = await createServerWithUser();
            server = serverWithUser;

            const input = {
                bio: 'bio',
                categories: [],
                socials: {
                    github: 'github.com',
                    instagramm: 'instagramm.com',
                    twitter: 'twitter.com',
                },
            };

            const responce = await server.executeOperation({
                query: createProfileMutation,
                variables: {
                    input,
                },
            });

            const updatedUser = await User.findOne({
                where: {email: user.email},
                relations: {
                    profile: {
                        categories: true,
                        socials: true,
                    },
                },
            });

            expect(responce.data?.createProfile).toBe(true);
            expect(updatedUser?.profile).toMatchObject(input);
        });

        it(`set categories to profile`, async () => {
            const {user, server: serverWithUser} = await createServerWithUser();
            server = serverWithUser;

            const categories = [new Category(), new Category()];
            categories.forEach((cat, idx) => (cat.title = `Category ${idx}`));
            await Category.save(categories);

            const input = {
                bio: 'bio',
                categories: categories.map(el => el.id),
                socials: {
                    github: 'github.com',
                    instagramm: 'instagramm.com',
                    twitter: 'twitter.com',
                },
            };

            const responce = await server.executeOperation({
                query: createProfileMutation,
                variables: {
                    input,
                },
            });

            const updatedUser = await User.findOne({
                where: {email: user.email},
                relations: {
                    profile: {
                        categories: true,
                        socials: true,
                    },
                },
            });

            expect(responce.data?.createProfile).toBe(true);
            expect(updatedUser?.profile?.categories).toMatchObject(categories);
        });
    });
});
