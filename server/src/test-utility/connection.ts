import {DataSource} from 'typeorm';
import {Category} from '../entity/catalogs/Category';
import {Profile} from '../entity/Profile';
import {Socials} from '../entity/Socials';
import {User} from '../entity/User';

export const testConnection = (drop = false) => {
    return new DataSource({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'rootuser',
        password: 'password',
        database: 'hoppon-test',
        synchronize: drop,
        dropSchema: drop,
        entities: [User, Profile, Socials, Category],
        uuidExtension: 'pgcrypto',
        installExtensions: true,
    }).initialize();
};
