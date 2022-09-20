import {verify} from 'jsonwebtoken';
import {MyContext} from '../ts-types/context';
import {MiddlewareFn} from 'type-graphql';
import {AuthenticationError} from 'apollo-server-express';

export const isAuth: MiddlewareFn<MyContext> = ({context}, next) => {
    const authorization = context.req.headers['authorization'];

    if (!authorization) {
        throw new AuthenticationError('not authenticated');
    }
    try {
        const token = authorization.split(' ')[1];
        const payload = verify(
            token,
            process.env.ACCESS_TOKEN_SECRET!
        ) as MyContext['currentUser'];
        context.currentUser = payload;
    } catch (err) {
        console.log(err);
        throw new AuthenticationError('not authenticated');
    }

    return next();
};
