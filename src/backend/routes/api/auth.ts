import { Router } from 'express';
import type { Request, Response } from 'express';
import routeHandler from '../utils/routeHandler';
import { authorizeUzer, getCurrentUser, unauthorizeUser } from '../../models/user';
import type { AuthRequest, AuthStatus } from '../../types';
import { autorizeUserParamsSchema } from '../../schemas/rest';

const router = Router();

router.get('/user', async (req: Request<{}, {}, {}, {}>, res: Response<string | null>) => {
    await routeHandler(res, null, async () => {
        const user = getCurrentUser(req);
        res.json(user);
    });
});

router.post('/login', async (req: Request<{}, {}, AuthRequest, {}>, res: Response<AuthStatus>) => {
    await routeHandler(res, [req.body, autorizeUserParamsSchema], async () => {
        const { userName, password } = req.body;
        const authResult = authorizeUzer(req, userName, password);
        res.json(authResult);
    });
});

router.post('/logout', async (req: Request<{}, {}, {}, {}>, res: Response) => {
    await routeHandler(res, null, async () => {
        unauthorizeUser(req);
        res.json(true);
    });
});

export default router;