import type { Request, Response, NextFunction } from 'express';

export default function(req: Request, res: Response, next: NextFunction): void {
    if (req.session && typeof req.session.user === 'undefined') {
        res.sendStatus(401);
        return;
    }
    next();
}