import { Router } from 'express';
import UserController from '../../app/controllers/UserController';

const router = Router();

router.get('/', UserController.index);
router.get('/:id', UserController.show);
router.put('/:id', UserController.update);

export default router;
