import { Router } from 'express';
import AuthController from '../../app/controllers/AuthController';

const router = Router();

router.post('/', AuthController.isValidToken);

export default router;
