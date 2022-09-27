import { Router } from 'express';
import CustomerController from '../../app/controllers/CustomerController';

const router: Router = Router();

router.get('/', CustomerController.index);

export default router;
