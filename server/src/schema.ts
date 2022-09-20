import {buildSchema} from 'type-graphql';
import {ProfileResolver} from './resolvers/ProfileResolvers';
import {UserResolver} from './resolvers/UserResolver';

export const createSchema = () =>
    buildSchema({resolvers: [UserResolver, ProfileResolver]});
