import { Request, Response, NextFunction } from 'express';
import { decodeToken } from '../../utils/token';

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;
    const [ scheme, token ] = authorization!.split(' ');

    if(scheme.toLowerCase() != 'bearer') {
        return res.status(500).send({
            message: 'token malformmated'
        })
    }

    const tokenDecoded = decodeToken(token)

    if(tokenDecoded) {
        next();
    }

    return res.status(401).send({
        message: 'invalid token'
    })

}