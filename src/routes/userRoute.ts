import { Router } from 'express';
import UserController from '../app/controllers/UserController';
import { authMiddleware } from '../app/middlewares/authMiddleware';

const router: Router = Router();

router.post('/store', UserController.store);
router.use(authMiddleware);
router.get('/', UserController.index);
router.get('/:id', UserController.show);
router.put('/:id', UserController.update);

export default router;
