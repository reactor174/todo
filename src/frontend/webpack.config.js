const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const ESLintWebpackPlugin = require('eslint-webpack-plugin');

const config = {
    name: 'mediadata',
    target: 'web',
    entry: path.join(__dirname, './index.tsx'),
    output: {
        path: path.join(__dirname, '../../dist/frontend'),
        filename: '[name].[contenthash].js',
        publicPath: '/',
    },
    plugins: [
        new ESLintWebpackPlugin({
            context: path.join(__dirname, '.'),
            extensions: [ 'ts', 'tsx' ],
            failOnError: false,
        }),
        new HTMLWebpackPlugin({
            template: path.join(__dirname, 'index.html'),
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ]
            },
            {
                test: /\.scss$/,
                use: [ 'style-loader', 'css-loader', 'sass-loader' ]
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                use: [ 'file-loader' ]
            },
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: [ 'ts-loader' ]
            },
        ],
    },
    resolve: {
        extensions: [ '.*', '.js', '.jsx', '.ts', '.tsx' ],
    },
    cache: true,
    devServer: {
        port: 3001,
        hot: true,
        historyApiFallback: true,
        client: {
            overlay: {
                errors: true,
                warnings: false,
            },
        },
        proxy: {
            '/api': { target: 'http://localhost:3000', },
        },
    },
    watchOptions: {
        ignored: [
            path.join(__dirname, './src/backend'),
        ],
    },
};

module.exports = (env, argv) => {
    if (argv.mode === 'development') {
        config.devtool = 'eval-source-map';
    }

    if (argv.mode === 'production') {
        config.optimization = {
            minimize: true,
            splitChunks: {
                chunks: 'all',
                minSize: 512 * 1024,
                maxSize: 1024 * 1024,
            },
        };
    }

    return config;
};