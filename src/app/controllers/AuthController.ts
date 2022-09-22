import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';

import TokenService from '../services/TokenService';
import httpStatus from '../../utils/httpStatus';
import { BadRequestError, NotFoundError, UnauthorizedError } from '../../helpers/ApiError';
import userRepository from '../../repositories/userRepository';

class AuthController {
    public async authenticate(req: Request, res: Response) {
        const { email, password } = req.body;

        const user = await userRepository.findByEmailAndSelectPassword(email);

        if(!user) {
            throw new NotFoundError('User not found');
        }

        const isValidPassword = await bcrypt.compare(password, user.password);

        if(!isValidPassword) {
            throw new UnauthorizedError('Invalid Password');
        }

        const token = await TokenService.generateToken({
            id: user.id
        }, user, 'authenticate');

        return res.status(httpStatus.ok).send({
            ...user,
            password: undefined,
            token
        });
    }

    public async logout(req: Request, res: Response) {
        const { authorization } = req.headers;

        if(!authorization) {
            throw new BadRequestError('Token is not provided');
        }

        const [ scheme, token ] = authorization.split(' ');

        if(scheme.toLowerCase() != 'bearer') {
            throw new BadRequestError('Token mal formmated');
        }

        if(!await TokenService.expiresToken(token)) {
            throw new BadRequestError('Invalid token');
        }

        return res.status(httpStatus.ok).send({
            message: 'Token is expired'
        });
    }

    public isValidToken(req: Request, res: Response) {
        return res.status(httpStatus.ok).send({
            message: 'Token is valid'
        });
    }
}

export default new AuthController();
