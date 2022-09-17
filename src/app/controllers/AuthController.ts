import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';

import { AppDataSource } from '../../database/data_source';
import User from '../models/User';
import { generateToken } from '../../utils/token';

class AuthController {
    async authenticate(req: Request, res: Response) {
        const repository = AppDataSource.getRepository(User);
        const { email, password } = req.body;

        const user = await repository.findOne({
            where: {
                email,
            }
        });

        if(!user) {
            return res.sendStatus(401);
        }

        const isValidPassword = await bcrypt.compare(password, user.password);

        if(!isValidPassword) {
            return res.sendStatus(401);
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
}

export default new AuthController();
