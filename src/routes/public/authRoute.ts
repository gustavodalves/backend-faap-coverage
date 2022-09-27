import { Router } from 'express';
import AuthController from '../../app/controllers/AuthController';

const router: Router = Router();

router.post('/authenticate', AuthController.authenticate);
router.post('/logout', AuthController.logout);

export default router;
