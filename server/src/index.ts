import 'reflect-metadata';
import 'dotenv/config';
import express from 'express';
import {ApolloServer, gql} from 'apollo-server-express';
import {GraphQLUpload, graphqlUploadExpress} from 'graphql-upload-ts';
import {AppDataSource} from './data-source';
import cookieParser from 'cookie-parser';
import {verify} from 'jsonwebtoken';
import {User} from './entity/User';
import {createAccessToken, createRefreshToken} from './utils/auth';
import {sendRefreshToken} from './utils/sendRereshToken';
import cors from 'cors';
import {createSchema} from './schema';
import {formatError} from './utils/formatError';
import {join} from 'path';
import DateScalar from './entity/scalars/Date';

(async () => {
    const app = express();
    app.use(cookieParser());
    app.use(
        cors({
            origin: 'http://localhost:3000',
            credentials: true,
        })
    );
    app.use('/images', express.static(join(__dirname + '/../images')));

    app.post('/refresh_token', async (req, res) => {
        const token = req.cookies.rto;
        if (!token) {
            return res.send({ok: false, accessToken: ''});
        }

        let payload: any = null;
        try {
            payload = verify(token, process.env.REFRESH_TOKEN_SECRET!);
        } catch (err) {
            console.log(err);
            return res.send({ok: false, accessToken: ''});
        }

        // token is valid and we can send back an access token
        const user = await User.findOne({where: {username: payload.username}});

        if (!user) {
            return res.send({ok: false, accessToken: ''});
        }

        if (user.tokenVersion !== payload.tokenVersion) {
            return res.send({ok: false, accessToken: ''});
        }

        sendRefreshToken(res, createRefreshToken(user)); // refresh refresh token

        return res.send({
            ok: true,
            accessToken: createAccessToken(user),
        });
    });

    await AppDataSource.initialize();

    const apolloServer = new ApolloServer({
        schema: await createSchema(),
        context: ({req, res}) => ({
            req,
            res,
        }),
        formatError,
        typeDefs: gql`
            scalar Upload
            scalar Date
        `,
        resolvers: {
            Upload: GraphQLUpload,
            Date: DateScalar,
        },
    });

    await apolloServer.start();
    app.use(graphqlUploadExpress());
    apolloServer.applyMiddleware({app, cors: false});

    app.listen(4000, () => {
        console.log('express server started on port 4000');
    });
})();
