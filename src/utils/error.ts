import { Response } from 'express';
import IValidate from '../interfaces/Validate';

const error = (response: Response, status: number, message: string | IValidate[]) => response.status(status).send({
    status,
    message
});

export default error;
