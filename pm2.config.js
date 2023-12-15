module.exports = {
    apps: [{
        name: 'Todo',
        script: 'dist/backend/index.js',
        watch: false,
        max_memory_restart: '1G',
        env: {
            NODE_ENV: 'production'
        },
        env_development: {
            NODE_ENV: 'development'
        }
    }],
};
