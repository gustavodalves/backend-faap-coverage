import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { pgDatabase, pgHost, pgPassword, pgUsername, pgPort } from '../env/config';

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: pgHost,
    port: pgPort ? +pgPort : 3000,
    username: pgUsername,
    password: pgPassword,
    database: pgDatabase,
    entities: ['src/app/models/*.ts', 'dist/app/models/*.js'],
    migrations: ['src/database/migrations/*.ts', 'dist/database/migrations/*.js'],
});
