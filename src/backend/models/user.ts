import type { Request } from 'express';
import type { AuthStatus } from '../types';

export function getCurrentUser(req: Request): string | null {
    return req.session.user || null;
}

export function authorizeUzer(req: Request, userName: string, password: string): AuthStatus {
    if (userName === 'admin' && password === '123') {
        req.session.user = userName;
        return { status: 'ok', user: userName, };
    }
    else {
        return { status: 'bad', error: 'Wrong username or password', };
    }
}

export function unauthorizeUser(req: Request): void {
    delete(req.session.user);
}