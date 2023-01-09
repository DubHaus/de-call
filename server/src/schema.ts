import {buildSchema} from 'type-graphql';
import {CatalogResolver} from './resolvers/CatalogResolver';
import {DraftProfileResolver} from './resolvers/DraftProfileResolver';
import {EventReslover} from './resolvers/EventResolver';
import {ImageResolver} from './resolvers/ImageResolver';
import {PhotoResolver} from './resolvers/PhotoResolver';
import {ProfileResolver} from './resolvers/ProfileResolvers';
import {UserResolver} from './resolvers/UserResolver';

export const createSchema = () =>
    buildSchema({
        resolvers: [
            UserResolver,
            ProfileResolver,
            DraftProfileResolver,
            CatalogResolver,
            PhotoResolver,
            ImageResolver,
            EventReslover,
        ],
    });
