import jwt from 'jsonwebtoken';
import { jwtSecret } from '../config';

const EXPIRES_TOKEN_TIME: string | number = '1d';

export function generateToken(payload = {}, expiresIn: string | number = EXPIRES_TOKEN_TIME) {
    return jwt.sign(payload, jwtSecret!, {
        expiresIn,
    });
}

export function decodeToken<T>(token: string) {
    try {
        return jwt.verify(token, jwtSecret!) as T;
    } catch {
        return false;
    }
}
