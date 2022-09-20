import 'reflect-metadata';
import {DataSource} from 'typeorm';
import {Category} from './entity/catalogs/Category';
import {Profile} from './entity/Profile';
import {Socials} from './entity/Socials';
import {User} from './entity/User';

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'rootuser',
    password: 'password',
    database: 'hoppon',
    synchronize: true,
    logging: false,
    entities: [User, Profile, Socials, Category],
    migrations: [],
    subscribers: [],
    uuidExtension: 'pgcrypto',
});
