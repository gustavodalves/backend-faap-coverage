import { Request, Response, NextFunction } from 'express';

import error from '../../utils/error';
import { decodeToken } from '../../utils/token';
import httpStatus from '../../utils/httpStatus';
import JwtPayload from '../../interfaces/UserJwtPayload';

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;
    const [ scheme, token ] = authorization!.split(' ');

    if(scheme.toLowerCase() != 'bearer') {
        return error(res, httpStatus.badRequest, 'token mal formatted');
    }

    const tokenDecoded = decodeToken<JwtPayload>(token);

    if(tokenDecoded) {
        req.body.id = tokenDecoded.id;
        return next();
    }

    return error(res, httpStatus.unauthorized, 'invalid token');
}
