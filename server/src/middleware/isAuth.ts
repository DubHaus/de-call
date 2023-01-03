import {verify} from 'jsonwebtoken';
import {MyContext} from '../ts-types/context';
import {MiddlewareFn} from 'type-graphql';
import {AuthenticationError} from 'apollo-server-express';

type Params = {
    throwError?: boolean;
};

export const isAuth: (params?: Params) => MiddlewareFn<MyContext> =
    ({throwError = true} = {}) =>
    ({context}, next) => {
        const authorization = context.req.headers['authorization'];

        if (!authorization) {
            if (throwError) {
                throw new AuthenticationError('not authenticated');
            }
        } else {
            try {
                const token = authorization.split(' ')[1];
                const payload = verify(
                    token,
                    process.env.ACCESS_TOKEN_SECRET!
                ) as MyContext['currentUser'];
                context.currentUser = payload;
            } catch (err) {
                console.log(err);
                if (throwError) {
                    throw new AuthenticationError('not authenticated');
                }
            }
        }

        return next();
    };
