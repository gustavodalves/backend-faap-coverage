import { Router } from 'express';

import authRoute from './routes/public/authRoute';
import userRoute from './routes/public/userRoute';
import customerRoute from './routes/public/customerRoute';
import botRoute from './routes/public/botRoute';

import authRoutePrivated from './routes/private/authRoute';
import userRoutePrivated from './routes/private/userRoute';
import customerRoutePrivated from './routes/private/customerRoute';

import authMiddleware from './app/middlewares/authMiddleware';

const router: Router = Router();

router.use('/', authRoute);
router.use('/user', userRoute);
router.use('/customer', customerRoute);

router.use('/bot', botRoute);

router.use(authMiddleware);

router.use('/', authRoutePrivated);
router.use('/user', userRoutePrivated);
router.use('/customer', customerRoutePrivated);

export default router;
