import 'reflect-metadata';
import {DataSource} from 'typeorm';
import {Category} from './entity/catalogs/Category';
import {Language} from './entity/catalogs/Language';
import {DraftProfile} from './entity/DraftProfile';
import { Event } from './entity/Event';
import { Image } from './entity/Image';
import {Photo} from './entity/Photo';
import {Profile} from './entity/Profile';
import {User} from './entity/User';

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'rootuser',
    password: 'password',
    database: 'hoppon',
    synchronize: true,
    dropSchema:false,
    logging: false,
    entities: [User, Profile, DraftProfile, Category, Language, Photo, Image, Event],
    migrations: [],
    subscribers: [],
    uuidExtension: 'pgcrypto',
});
