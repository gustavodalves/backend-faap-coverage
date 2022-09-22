import { NextFunction, Request, Response } from 'express';
import { ApiError } from '../../helpers/ApiError';

async function errorMiddleware (
    error: Error & Partial<ApiError>,
    req: Request,
    res: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    next: NextFunction
) {
    const { statusCode: status, message } = error;
    return res.status(status ?? 500).json({ status, message });
}

export default errorMiddleware;
