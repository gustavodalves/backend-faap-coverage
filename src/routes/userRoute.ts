import { Router } from 'express';
import UserController from '../app/controllers/UserController';

const router: Router = Router();

router.post('/store', UserController.store);

export default router;
