import { Router } from 'express';

import authRoute from './routes/authRoute';
import userRoute from './routes/userRoute';

const router: Router = Router();

router.use('/user', userRoute);
router.use('/', authRoute);

export default router;
