import { Router } from 'express';
import AuthController from '../app/controllers/AuthController';
import authMiddleware from '../app/middlewares/authMiddleware';

const router: Router = Router();

router.post('/authenticate', AuthController.authenticate);
router.post('/logout', AuthController.logout);
router.use(authMiddleware);
router.post('/', AuthController.isValidToken);

export default router;
