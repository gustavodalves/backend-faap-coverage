import jwt from 'jsonwebtoken';
import { jwtSecret } from '../config';

const EXPIRES_TOKEN_TIME = '1d';

export function generateToken(payload = {}) {
    return jwt.sign(payload, jwtSecret!, {
        expiresIn: EXPIRES_TOKEN_TIME,
    });
}

export function decodeToken(token: string) {
    try {
        return jwt.decode(token);
    } catch {
        return false;
    }
}
