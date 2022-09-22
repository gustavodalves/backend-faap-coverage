import { Request, Response, NextFunction } from 'express';

import IUserJwtPayload from '../../interfaces/UserJwtPayload';
import { BadRequestError, UnauthorizedError } from '../../helpers/ApiError';
import TokenService from '../services/TokenService';

async function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;

    if(!authorization) {
        throw new BadRequestError('Token not provided');
    }

    const [ scheme, token ] = authorization.split(' ');

    if(scheme.toLowerCase() !== 'bearer') {
        throw new BadRequestError('Token mal formmated');
    }

    const tokenDecoded = await TokenService.decodeToken<IUserJwtPayload>(token);

    if(!tokenDecoded || !tokenDecoded.id) {
        throw new UnauthorizedError('Invalid token');
    }

    const { id } = tokenDecoded;
    if(id) {
        req.body.id = id;
        return next();
    }
}

export default authMiddleware;
