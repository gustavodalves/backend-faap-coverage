import { Router } from 'express';
import AuthController from '../app/controllers/AuthController';

const router: Router = Router();

router.post('/authenticate', AuthController.authenticate);
router.post('/forgot_password', AuthController.forgotPassword);
router.post('/reset_password/:token', AuthController.resetPassword);

export default router;
