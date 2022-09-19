import { Request, Response } from 'express';

import { AppDataSource } from '../../database/data_source';
import error from '../../utils/error';
import httpStatus from '../../utils/httpStatus';
import { generateToken, decodeToken, expiresToken } from '../../utils/token';
import User from '../models/User';
import bcrypt from 'bcryptjs';

const repository = AppDataSource.getRepository(User);
class UserController {
    async store(req: Request, res: Response) {
        const { email, password } = req.body;

        const userExists = await repository.findOne({
            where: {
                email
            }
        });

        if(!email || !password) {
            return res.status(httpStatus.internalServerError);
        }

        if(userExists) {
            return res.sendStatus(httpStatus.conflict);
        }

        const user = repository.create({ email, password });
        const token = generateToken({
            id: user.id,
        }, 'authenticate');

        await repository.save(user);

        return res.status(httpStatus.created).send({
            ...user,
            password: undefined,
            token
        });
    }

    async index(req: Request, res: Response) {
        const allUsers = await repository.find();
        return res.status(httpStatus.ok).send(allUsers);
    }

    async show(req: Request, res: Response) {
        const { id } = req.params;

        const user = await repository.findOne({
            where: {
                id
            }
        });

        if(!user) {
            return error(res, httpStatus.notFound, 'User not found');
        }

        return res.status(httpStatus.ok).send(user);
    }

    async update(req: Request, res: Response) {
        const { id } = req.params;
        const { email } = req.body;

        const user = await repository.findOneBy({
            id,
        });

        if(!user) {
            return error(res, httpStatus.notFound, 'User not found');
        }

        const userEdited = await repository.save({
            ...user,
            email,
        });

        return res.status(httpStatus.ok).send(userEdited);
    }

    async forgotPassword(req: Request, res: Response) {
        const { email } = req.body;

        const userExists = await repository.findOneBy({
            email
        });

        if(!userExists) {
            return error(res, httpStatus.notFound, 'User not found');
        }

        const token = await generateToken({
            email,
        }, 'reset_password', '1h');

        return res.status(httpStatus.ok).send({
            token
        });
    }

    async resetPassword(req: Request, res: Response) {
        const { token } = req.params;
        const { password } = req.body;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { email } = await decodeToken<any>(token);

        if(!email)
            return error(res, httpStatus.internalServerError, 'invalid token');

        if(!password)
            return error(res, httpStatus.badRequest, 'password not provided');

        const user = await repository.findOneBy({
            email,
        });

        const userPasswordEdited = await repository.save({
            ...user,
            password: bcrypt.hashSync(password),
        });

        const tokenIsExpired = await expiresToken(token);

        if(!tokenIsExpired) {
            console.error(`Token: ${token} is not expired`);
        }

        return res.status(httpStatus.ok).send({
            ...userPasswordEdited,
            password: undefined,
        });
    }
}

export default new UserController();
