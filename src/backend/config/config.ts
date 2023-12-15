export default {
    port: 3000,
    mysql: {
        database: 'todo',
        host: 'localhost',
        user: 'root',
        password: '123',
        connectTimeout: 30000,
        connectionLimit: 10,
        multipleStatements: true,
    },
};