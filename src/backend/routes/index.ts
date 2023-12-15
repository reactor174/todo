import { Router } from 'express';
import apiRoutes from './api';
import loggerMiddleware from './middlewares/logger';

const router = Router();

router.use(loggerMiddleware);
router.use('/api', apiRoutes);

export default router;