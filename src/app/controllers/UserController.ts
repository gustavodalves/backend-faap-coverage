import { Request, Response } from 'express';
import { validate, ValidationError } from 'class-validator';

import { AppDataSource } from '../../database/data_source';
import error from '../../utils/error';
import httpStatus from '../../utils/httpStatus';
import { generateToken, decodeToken, expiresToken } from '../../utils/token';
import User from '../models/User';
import bcrypt from 'bcryptjs';
import ForgotPasswordJwtPayload from '../../interfaces/ForgotPasswordJwtPayload';
import errorsMessage from '../../utils/validateErrors';

const repository = AppDataSource.getRepository(User);
class UserController {
    async store(req: Request, res: Response) {
        const { email, password } = req.body;

        const userExists = await repository.findOneBy({
            email
        });

        if(userExists) {
            return res.sendStatus(httpStatus.conflict);
        }

        if(!email || !password) {
            return res.status(httpStatus.internalServerError);
        }
        const user = repository.create({ email, password });
        const errors: ValidationError[] = await validate(user);

        if(errors.length > 0) {
            return error(res, httpStatus.badRequest, errorsMessage(errors));
        }

        const userCreated = await repository.save(user);
        const token = await generateToken({
            id: user.id,
        }, userCreated,  'authenticate');

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

        const user = await repository.createQueryBuilder('user')
            .addSelect('user.password')
            .where('user.id = :id', { id })
            .getOne();

        const errors = await validate(user!);

        if(errors.length > 0) {
            return error(res, httpStatus.badRequest, errorsMessage(errors));
        } else if(!user) {
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

        try {
            const user = await repository.findOne({
                where: {
                    email
                }
            });
            const token = await generateToken({
                email,
            }, user!, 'reset_password', '1h');

            return res.status(httpStatus.ok).send({
                token
            });
        } catch {
            return error(res, httpStatus.notFound, 'User not found');
        }

    }

    async resetPassword(req: Request, res: Response) {
        const { token } = req.params;
        const { password } = req.body;

        const tokenDecoded = await decodeToken<ForgotPasswordJwtPayload>(token);

        if(!tokenDecoded || !tokenDecoded.email) {
            return error(res, httpStatus.internalServerError, 'invalid token');
        }

        const { email } = tokenDecoded;

        if(!password)
            return error(res, httpStatus.badRequest, 'password not provided');

        const user = await repository.findOneBy({
            email,
        });

        if(!user) {
            return error(res, httpStatus.notFound, 'User not found');
        }

        const errors = await validate({
            ...user,
            password,
        });

        if(errors.length > 0) {
            return error(res, httpStatus.badRequest, errorsMessage(errors));
        }

        const userPasswordEdited = await repository.save({
            ...user,
            password: bcrypt.hashSync(password),
        });

        if(!await expiresToken(token)) {
            console.error(`Token: ${token} is not expired`);
        }

        return res.status(httpStatus.ok).send({
            ...userPasswordEdited,
            password: undefined,
        });
    }
}

export default new UserController();
