import jwt from 'jsonwebtoken';

import User from '../app/models/User';
import { jwtSecret } from '../config';
import tokenRepository from '../repositories/tokenRepository';

const EXPIRES_TOKEN_TIME: string | number = '1d';
const JWT_SECRET = jwtSecret ?? '';

export async function generateToken(
    payload = {},
    user: User,
    type: string,
    expiresIn: string | number = EXPIRES_TOKEN_TIME
): Promise<string> {
    const token = jwt.sign(payload, JWT_SECRET, {
        expiresIn,
    });

    const tokenCreated = tokenRepository.create({
        type,
        token,
        isExpire: false,
        user,
    });

    await tokenRepository.save(tokenCreated);

    return token;
}

export async function decodeToken<T>(token: string): Promise<T | false> {
    try {
        const userToken = await tokenRepository.findOneBy({
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

export async function expiresToken(token: string): Promise<boolean> {
    const userToken = await tokenRepository.findOneBy({
        token
    });

    if(!userToken) {
        return false;
    }

    const tokenIsExpired = await tokenRepository.save({
        ...userToken,
        isExpire: true,
    });

    return !!tokenIsExpired;
}
