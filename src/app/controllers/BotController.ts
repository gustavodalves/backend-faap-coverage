import { Request, Response } from 'express';
import { BadRequestError } from '../../helpers/ApiError';
import httpStatus from '../../utils/httpStatus';
import BotService from '../services/BotService';

class BotController {
    chat(req: Request, res: Response) {
        const { botMessage }: { botMessage: number[]} = req.body;

        if (!botMessage) {
            throw new BadRequestError('bot data not provided');
        }

        const message = BotService.validate(botMessage);


        res.status(httpStatus.ok).send({ message });
    }
}

export default new BotController();
