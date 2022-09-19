import 'dotenv/config';

interface ProcessEnv {
    [key: string]: string | undefined
}

export const {
    PORT: port,
    JWT_SECRET: jwtSecret,
    PG_HOST: pgHost,
    PG_DATABASE: pgDatabase,
    PG_USERNAME: pgUsername,
    PG_PASSWORD: pgPassword,
    PG_PORT: pgPort,
}: ProcessEnv = process.env;
