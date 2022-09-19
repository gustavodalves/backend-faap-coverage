import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';

import { AppDataSource } from '../../database/data_source';
import User from '../models/User';
import { decodeToken, generateToken } from '../../utils/token';
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
            return error(res, 404, 'User not found');
        }

        const isValidPassword = await bcrypt.compare(password, user.password);

        if(!isValidPassword) {
            return error(res, 401, 'Passowrd is invalid');
        }

        const token = generateToken({
            id: user.id
        });

        return res.status(200).send({
            ...user,
            password: undefined,
            token
        });
    }

    async forgotPassword(req: Request, res: Response) {
        const { email } = req.body;

        const userExists = await repository.findOne({
            where: {
                email
            }
        });

        if(!userExists) {
            return error(res, httpStatus.notFound, 'User not found');
        }

        const token = generateToken({
            email,
        }, '1h');

        return res.status(httpStatus.ok).send({
            token
        });
    }

    async resetPassword(req: Request, res: Response) {
        const { token } = req.params;
        const { password } = req.body;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { email } = decodeToken<any>(token);

        if(!email)
            return error(res, 500, 'invalid token');

        const user = await repository.findOneBy({
            email,
        });

        const userPasswordEdited = await repository.save({
            ...user,
            password: bcrypt.hashSync(password),
        });

        return res.status(200).send({
            ...userPasswordEdited,
            password: undefined,
        });
    }
}

export default new AuthController();
