import { Router } from 'express';
import authMiddleware from '../../middlewares/auth';
import adminTodoRoute from './todo';

const router = Router();

router.use(authMiddleware);

router.use('/todo', adminTodoRoute);

export default router;