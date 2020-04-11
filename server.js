import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';

import Router from './routes'

dotenv.config();

const app = express();

app.use(bodyParser.json());

new Router(app);

const { PORT } = process.env
app.listen(PORT, () => {
    console.log('Server is listening on port', PORT);
})