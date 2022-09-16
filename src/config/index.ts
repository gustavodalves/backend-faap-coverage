import 'dotenv/config';

export const {
    PORT: port,
    JWT_SECRET: jwtSecret,
    PG_HOST: pgHost,
    PG_DATABASE: pgDatabase,
    PG_USERNAME: pgUsername,
    PG_PASSWORD: pgPassword,
    PG_PORT: pgport,
} = process.env