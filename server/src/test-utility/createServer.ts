import {ApolloServer, ExpressContext} from 'apollo-server-express';
import {createSchema} from '../schema';

let apolloServer: ApolloServer<ExpressContext> | null;

type Params = {
    context?: {};
};

export const createServer = async ({context}: Params = {}) => {
    if (apolloServer) {
        await apolloServer.stop();
    }
    apolloServer = new ApolloServer({
        schema: await createSchema(),
        context,
    });

    return apolloServer;
};

export const cleanServer = async () => {
    if (apolloServer) {
        await apolloServer.stop();
    }
    apolloServer = null;
};
