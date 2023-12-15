import dayjs from 'dayjs';
import { NextFunction, Request, Response } from 'express';

function createQueryToken(): string {
    const token = ('000000' + Math.round((Math.random() * 1000000))).slice(-6);
    return token;
}

export default function (req: Request, res: Response, next: NextFunction): void {
    const queryToken = createQueryToken();
    const startTime = dayjs();
    
    console.debug(...[
        queryToken,
        startTime.format('DD.MM HH:mm:ss'),
        req.method,
        req.originalUrl,
        ...(req.method !== 'GET' ? [req.body] : []),
    ]);

    res.on('finish', () => {
        console.debug(
            queryToken,
            res.statusCode,
            dayjs().diff(startTime, 's', true),
            'Completed'
        );
    });

    res.on('error', (error: any) => {
        console.debug(
            queryToken,
            dayjs().diff(startTime, 's', true),
            'Error',
            error,
        );
    });
    next();
}