import { Response } from 'express';

const error = (response: Response, status: number, message: string) => response.status(status).send({
    status,
    message
});

export default error;
