import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';

import { AppDataSource } from '../../database/data_source';
import User from '../models/User';
import { expiresToken, generateToken } from '../../utils/token';
import error from '../../utils/error';
import httpStatus from '../../utils/httpStatus';

const repository = AppDataSource.getRepository(User);

class AuthController {
    async authenticate(req: Request, res: Response) {
        const { email, password } = req.body;

        const user = await repository.createQueryBuilder('user')
            .addSelect('user.password')
            .where('user.email = :email', { email })
            .getOne();

        if(!user) {
            return error(res, httpStatus.notFound, 'User not found');
        }

        const isValidPassword = await bcrypt.compare(password, user.password);

        if(!isValidPassword) {
            return error(res, httpStatus.unauthorized, 'Password is invalid');
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
            return error(res, httpStatus.badRequest, 'token not provided');
        }

        const [ scheme, token ] = authorization.split(' ');

        if(scheme.toLowerCase() != 'bearer') {
            return error(res, httpStatus.badRequest, 'token mal formatted');
        }

        if(await expiresToken(token)) {
            return res.sendStatus(httpStatus.ok);
        }

        return error(res, httpStatus.badRequest, 'Token is not exists');
    }
}

export default new AuthController();
