import { Request, Response } from 'express';
import { BadRequestError } from '../../helpers/ApiError';
import httpStatus from '../../utils/httpStatus';

class BotController {
    chat(req: Request, res: Response) {
        const { botMessage } = req.body;

        if (!botMessage) {
            throw new BadRequestError('bot data not provided');
        }

        res.status(httpStatus.ok).send(botMessage);
    }
}

export default new BotController();
