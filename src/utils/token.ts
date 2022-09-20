import jwt from 'jsonwebtoken';
import Token from '../app/models/Token';
import User from '../app/models/User';
import { jwtSecret } from '../config';
import { AppDataSource } from '../database/data_source';

const EXPIRES_TOKEN_TIME: string | number = '1d';

const repository = AppDataSource.getRepository(Token);

export async function generateToken(payload = {}, user: User, type: string, expiresIn: string | number = EXPIRES_TOKEN_TIME) {
    const token = jwt.sign(payload, jwtSecret!, {
        expiresIn,
    });

    console.log(user);

    const tokenRepo = repository.create({
        type,
        token,
        is_expire: false,
        user,
    });

    await repository.save(tokenRepo);

    return token;
}

export async function decodeToken<T>(token: string) {
    try {
        const userToken = await repository.findOneBy({
            token
        });

        if(userToken?.is_expire || !userToken) {
            throw new Error();
        }

        return jwt.verify(token, jwtSecret!) as T;
    } catch {
        return false;
    }
}

export async function expiresToken(token: string) {
    const userToken = await repository.findOneBy({
        token
    });

    if(!userToken) {
        return false;
    }

    return await repository.save({
        ...userToken,
        is_expire: true,
    });
}
