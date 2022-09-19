import { Request, Response, NextFunction } from 'express';

import error from '../../utils/error';
import { decodeToken } from '../../utils/token';
import httpStatus from '../../utils/httpStatus';
import UserJwtPayload from '../../interfaces/UserJwtPayload';

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;

    if(!authorization) {
        return error(res, httpStatus.badRequest, 'token not provided');
    }

    const [ scheme, token ] = authorization.split(' ');

    if(scheme.toLowerCase() != 'bearer') {
        return error(res, httpStatus.badRequest, 'token mal formatted');
    }

    const { id } = await decodeToken<any>(token);

    if(id) {
        req.body.id = id;
        return next();
    }

    return error(res, httpStatus.unauthorized, 'invalid token');
}
