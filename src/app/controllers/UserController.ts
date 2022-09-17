import { Request, Response } from 'express';
import { AppDataSource } from '../../database/data_source';
import User from '../models/User';

class UserController {
    async store(req: Request, res: Response) {
        const repository = AppDataSource.getRepository(User);
        const { email, password } = req.body;

        const userExists = await repository.findOne({
            where: {
                email
            }
        });

        console.log(email, password);

        if(!email || !password) {
            return res.status(5000);
        }

        if(userExists) {
            return res.sendStatus(409);
        }

        const user = repository.create({ email, password });
        await repository.save(user);

        return res.send(user).status(200);
    }
}

export default new UserController();
