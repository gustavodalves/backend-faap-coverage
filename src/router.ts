import { Router } from 'express';

import authRoute from './routes/authRoute';
import userRoute from './routes/userRoute';

const router: Router = Router();

router.use('/', authRoute);
router.use('/user', userRoute);

export default router;
