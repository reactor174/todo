import express from 'express';
import config from './config';
import expressSession from 'express-session';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import router from './routes';
import path from 'path';
import { queryParser } from 'express-query-parser';

const app = express();

app.use(express.static(path.join(__dirname, '../../dist/frontend')));

app.use(bodyParser.json());
app.use(cookieParser());
app.use(queryParser({ parseNumber: true }));

declare module 'express-session' {
    interface SessionData {
        user: string;
    }
}
app.use(expressSession({
    name: 'todo',
    secret: '123',
    saveUninitialized: false,
    resave: false,
}));

app.use(router);
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../dist/frontend/index.html'));
});

const { port } = config;
app.listen(port, () => console.debug('Listen on port ' + port));
