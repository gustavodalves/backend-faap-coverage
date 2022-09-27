import { Router } from 'express';
import CustomerController from '../../app/controllers/CustomerController';

const router: Router = Router();

router.post('/store', CustomerController.store);

export default router;
