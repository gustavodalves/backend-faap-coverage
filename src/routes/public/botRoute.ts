import { Router } from 'express';
import BotController from '../../app/controllers/BotController';

const router = Router();

router.post('/', BotController.chat);

export default router;
