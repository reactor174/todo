import { Router } from 'express';
import type { Request, Response } from 'express';
import routeHandler from '../utils/routeHandler';
import { createTodo, getTodos, getTodosCount } from '../../models/todo';
import { Todo, GetTodosRequestParams } from '../../types';
import { getTodosParamsSchema, addTodoParamsSchema } from '../../schemas/rest';

const router = Router();

router.get('/count', async (req: Request<{}, {}, {}, {}>, res: Response<number>) => {
    await routeHandler(res, null, async () => {
        const todosCount = await getTodosCount();
        res.json(todosCount);
    });
});

router.get('/get', async (req: Request<{}, {}, {}, GetTodosRequestParams>, res: Response<Todo[]>) => {
    await routeHandler(res, [ req.query, getTodosParamsSchema ], async () => {
        const todos = await getTodos(req.query);
        res.json(todos);
    });
});

router.put('/add', async (req: Request<{}, {}, Pick<Todo, 'userName' | 'eMail' | 'text'>, {}>, res: Response<number>) => {
    await routeHandler(res, [ req.body, addTodoParamsSchema ], async () => {
        const { userName, eMail, text } = req.body;
        const newTodo = await createTodo(userName, eMail, text);
        res.json(newTodo);
    });
});

export default router;