import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { pgDatabase, pgHost, pgPassword, pgUsername, pgPort } from '../config';

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: pgHost,
    port: +pgPort!,
    username: pgUsername,
    password: pgPassword,
    database: pgDatabase,
    entities: ['src/app/models/*.ts'],
    migrations: ['src/database/migrations/*.ts'],
});
