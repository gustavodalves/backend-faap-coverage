import { Request, Response } from 'express';

import { AppDataSource } from '../../database/data_source';
import error from '../../utils/error';
import httpStatus from '../../utils/httpStatus';
import { generateToken } from '../../utils/token';
import User from '../models/User';

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
            return res.status(500);
        }

        if(userExists) {
            return res.sendStatus(409);
        }

        const user = repository.create({ email, password });
        const token = generateToken({
            id: user.id,
        });

        await repository.save(user);

        return res.status(httpStatus.ok).send({
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
            return error(res, 404, 'User not found');
        }

        return res.status(200).send(user);
    }

    async update(req: Request, res: Response) {
        const { id } = req.params;
        const { email, password } = req.body;

        const user = await repository.findOneBy({
            id,
        });

        if(!user) {
            return error(res, httpStatus.notFound, 'User not found');
        }

        const userEdited = await repository.save({
            ...user,
            password,
            email,
        });

        return res.status(200).send(userEdited);
    }
}

export default new UserController();
