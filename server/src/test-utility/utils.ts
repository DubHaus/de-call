import {faker} from '@faker-js/faker';
import {User} from '../entity/User';
import {createAccessToken} from '../utils/auth';
import {createServer} from './createServer';

export const createTestUser = () => ({
    email: faker.internet.email(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    password: faker.internet.password(),
});

export const createServerWithoutUser = () => {
    return createServer({
        context: {
            req: {
                headers: {
                    // no authorization
                },
            },
        },
    });
};

export const createServerWithUser = async () => {
    const user = createTestUser();
    await User.insert(user);
    const dbUser = (await User.findOne({
        where: {email: user.email},
    })) as User;
    const correctToken = createAccessToken(dbUser);

    return {
        server: await createServer({
            context: {
                req: {
                    headers: {
                        authorization: `bearer ${correctToken}`,
                    },
                },
            },
        }),
        user: dbUser,
    };
};
