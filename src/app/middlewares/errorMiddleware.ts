import { NextFunction, Request, Response } from 'express';
import { ApiError } from '../../helpers/ApiError';

export const errorMiddleware = (
    error: Error & Partial<ApiError>,
    req: Request,
    res: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    next: NextFunction
) => {
    const statusCode = error.statusCode ?? 500;
    const message = error.statusCode ? error.message : 'Internal Server Error';
    return res.status(statusCode).json(message);
};
