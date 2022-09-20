import jwt from 'jsonwebtoken';
import Token from '../app/models/Token';
import User from '../app/models/User';
import { jwtSecret } from '../config';
import { AppDataSource } from '../database/data_source';

const EXPIRES_TOKEN_TIME: string | number = '1d';
const JWT_SECRET = jwtSecret ?? '';

const repository = AppDataSource.getRepository(Token);

export async function generateToken(
    payload = {},
    user: User,
    type: string,
    expiresIn: string | number = EXPIRES_TOKEN_TIME
): Promise<string> {
    const token = jwt.sign(payload, JWT_SECRET, {
        expiresIn,
    });

    const tokenRepository = repository.create({
        type,
        token,
        isExpire: false,
        user,
    });

    await repository.save(tokenRepository);

    return token;
}

export async function decodeToken<T>(token: string): Promise<T | false>  {
    try {
        const userToken = await repository.findOneBy({
            token
        });

        if(userToken?.isExpire || !userToken) {
            throw new Error();
        }

        return jwt.verify(token, JWT_SECRET) as T;
    } catch {
        return false;
    }
}

export async function expiresToken(token: string): Promise<Token | false>  {
    const userToken = await repository.findOneBy({
        token
    });

    if(!userToken) {
        return false;
    }

    return await repository.save({
        ...userToken,
        isExpire: true,
    });
}
