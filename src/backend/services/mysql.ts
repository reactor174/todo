import mysql, { FieldPacket, ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import config from '../config';
import type { Pool, PoolOptions, PoolConnection } from 'mysql2/promise';

const mysqlConf: PoolOptions = config.mysql;

export let pool: Pool;
async function initPool(): Promise<void> {
    pool = await mysql.createPool({
        ...mysqlConf,
        database: undefined,
    });
    pool.on('connection', function (con) {
        con.on('error', function (err: Error) {
            console.error(err.stack);
        });
    });
}

export async function getCon(dbName: string | null | undefined = undefined): Promise<PoolConnection> {
    const database = dbName !== null
        ? (dbName || mysqlConf.database)
        : null;

    if (!pool) {
        await initPool();
    }

    const con = await pool.getConnection();
    if (database) {
        try {
            await con.query(`USE \`${database}\`;`);
        } catch (e) {
            con.release();
            throw e;
        }
    }
    return con;
}

export const query = async <T extends RowDataPacket[][] | RowDataPacket[] | ResultSetHeader = RowDataPacket[]>(...args: [sql: string, values?: any]): Promise<[T, FieldPacket[]]> => {
    let con: PoolConnection | undefined = undefined;
    try {
        con = await getCon();
        return await con.query(...args);
    }
    finally {
        con && con.release();
    }
};

export const select = async <T>(...args: [sql: string, values?: any]): Promise<T[]> => {
    const [result] = await query<(T & RowDataPacket)[]>(...args);
    return result;
};

export const insert = async (...args: [sql: string, values?: any]): Promise<number> => {
    const [result] = await query<ResultSetHeader>(...args);
    return result.insertId;
};