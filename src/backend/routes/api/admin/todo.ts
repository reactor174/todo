import { Router } from 'express';
import type { Request, Response } from 'express';
import { ProcessStatus, Todo } from '../../../types';
import routeHandler from '../../utils/routeHandler';
import { updateTodoParamsSchema } from '../../../schemas/rest';
import { updateTodo } from '../../../models/todo';

const router = Router();

router.post('/update', async (req: Request<{}, {}, Todo, {}>, res: Response<ProcessStatus>) => {
    await routeHandler(res, [req.body, updateTodoParamsSchema], async () => {
        await updateTodo(req.body);
        res.json({ status: 'ok' });
    });
});


export default router;