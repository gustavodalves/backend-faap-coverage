import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';

import { AppDataSource } from '../../database/data_source';
import User from '../models/User';
import { generateToken } from '../../utils/token';
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
            return error(res, httpStatus.unauthorized, 'Passowrd is invalid');
        }

        const token = generateToken({
            id: user.id
        });

        return res.status(httpStatus.ok).send({
            ...user,
            password: undefined,
            token
        });
    }
}

export default new AuthController();
