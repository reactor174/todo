import { Router } from 'express';
import authRoute from './auth';
import todoRoute from './todo';
import adminRoutes from './admin';

const router = Router();

router.use('/auth', authRoute);
router.use('/todo', todoRoute);
router.use('/admin', adminRoutes);

export default router;