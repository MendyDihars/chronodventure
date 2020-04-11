import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import bodyParser from 'body-parser';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';

import configWebpack from './webpack.config'
import Router from './routes'


const compiler = webpack(configWebpack);
const app = express();

app.use(webpackMiddleware(compiler));
app.use(bodyParser.json());

new Router(app);

const { PORT } = process.env
app.listen(PORT, () => {
    console.log('Server is listening on port', PORT);
})