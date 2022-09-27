import { Request, Response } from 'express';
import { validate, ValidationError } from 'class-validator';
import bcrypt from 'bcryptjs';

import TokenService from '../services/TokenService';
import { BadRequestError, NotFoundError } from '../../helpers/ApiError';

import httpStatus from '../../utils/httpStatus';
import IForgotPasswordJwtPayload from '../../interfaces/ForgotPasswordJwtPayload';
import errorsMessage from '../../utils/validateErrors';
import userRepository from '../../repositories/userRepository';

class UserController {
    public async store(req: Request, res: Response) {
        const { email, password, name } = req.body;

        if(!email || !password || !name) {
            throw new BadRequestError('Data not provided');
        }

        const userExists = await userRepository.findOneBy({
            email
        });

        if(userExists) {
            throw new BadRequestError('Email already exists');
        }

        const user = userRepository.create({ email, password, name });
        const errors: ValidationError[] = await validate(user);

        if(errors.length > 0) {
            throw new BadRequestError(errorsMessage(errors));
        }

        const userCreated = await userRepository.save(user);
        const token = await TokenService.generateToken({
            id: user.id,
        }, userCreated,  'authenticate');

        return res.status(httpStatus.created).send({
            ...user,
            password: undefined,
            token
        });
    }

    public async index(req: Request, res: Response) {
        const allUsers = await userRepository.find();
        return res.status(httpStatus.ok).send(allUsers);
    }

    public async show(req: Request, res: Response) {
        const { id } = req.params;

        const user = await userRepository.findOne({
            where: {
                id
            }
        });

        if(!user) {
            throw new NotFoundError('User not found');
        }

        return res.status(httpStatus.ok).send(user);
    }

    public async update(req: Request, res: Response) {
        const { id } = req.params;
        const { email, name } = req.body;

        const user = await userRepository.findByEmailAndSelectPassword(email);

        if(!user) {
            throw new NotFoundError('User not found');
        }

        const errors = await validate(user);

        if(errors.length > 0) {
            throw new BadRequestError(errorsMessage(errors));
        }

        const userEdited = await userRepository.save({
            ...user,
            name,
            email,
        });

        return res.status(httpStatus.ok).send(userEdited);
    }

    public async forgotPassword(req: Request, res: Response) {
        const { email } = req.body;

        const user = await userRepository.findOne({
            where: {
                email
            }
        });

        if(!user) {
            throw new NotFoundError('User not found');
        }

        const token = await TokenService.generateToken({
            email,
        }, user, 'reset_password', '1h');

        return res.status(httpStatus.ok).send({
            token
        });
    }

    public async resetPassword(req: Request, res: Response) {
        const { token } = req.params;
        const { password } = req.body;

        const tokenDecoded = await TokenService.decodeToken<IForgotPasswordJwtPayload>(token);

        if(!tokenDecoded || !tokenDecoded.email) {
            throw new NotFoundError('email not found');
        }

        const { email } = tokenDecoded;

        if(!password)
            throw new BadRequestError('Password not provided');

        const user = await userRepository.findOneBy({
            email,
        });

        if(!user) {
            throw new NotFoundError('User not found');
        }

        const errors = await validate({
            ...user,
            password,
        });

        if(errors.length > 0) {
            throw new BadRequestError(errorsMessage(errors));
        }

        const userPasswordEdited = await userRepository.save({
            ...user,
            password: bcrypt.hashSync(password),
        });

        if(!await TokenService.expiresToken(token)) {
            console.error(`Token: ${token} is not expired`);
        }

        return res.status(httpStatus.ok).send({
            ...userPasswordEdited,
            password: undefined,
        });
    }
}

export default new UserController();
