import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';

import { AppDataSource } from '../../database/data_source';
import User from '../models/User';
import { expiresToken, generateToken } from '../../utils/token';
import httpStatus from '../../utils/httpStatus';
import { BadRequestError, NotFoundError, UnauthorizedError } from '../../helpers/ApiError';

const repository = AppDataSource.getRepository(User);

class AuthController {
    async authenticate(req: Request, res: Response) {
        const { email, password } = req.body;

        const user = await repository.createQueryBuilder('user')
            .addSelect('user.password')
            .where('user.email = :email', { email })
            .getOne();

        if(!user) {
            throw new NotFoundError('User not found');
        }

        const isValidPassword = await bcrypt.compare(password, user.password);

        if(!isValidPassword) {
            throw new UnauthorizedError('Invalid Password');
        }

        const token = await generateToken({
            id: user.id
        }, user, 'authenticate');

        return res.status(httpStatus.ok).send({
            ...user,
            password: undefined,
            token
        });
    }

    async logout(req: Request, res: Response) {
        const { authorization } = req.headers;

        if(!authorization) {
            throw new BadRequestError('Token is not provided');
        }

        const [ scheme, token ] = authorization.split(' ');

        if(scheme.toLowerCase() != 'bearer') {
            throw new BadRequestError('Token mal formmated');
        }

        if(!await expiresToken(token)) {
            throw new BadRequestError('Invalid token');
        }

        return res.sendStatus(httpStatus.ok);
    }
}

export default new AuthController();
