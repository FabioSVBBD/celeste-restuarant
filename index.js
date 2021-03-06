import express from "express";
import bodyParser from 'body-parser';
import fs from 'fs';
import cors from 'cors';

import tastingRouter from './routes/tasting-menu/menu.js';
import aLaCarteRouter from './routes/a-la-carte-menu/menu.js';
import authRouter from './routes/auth/auth_refactored.js';
import payRouter from './routes/pay/pay.js';

const app = express();
const PORT = process.env.PORT || 5000; // TAKE NOT OF PORT NUMBER

const endpoints = JSON.parse(fs.readFileSync('endpoints.json'));

app.use(cors());
app.use(bodyParser.json());
app.use('/tasting-menu', tastingRouter);
app.use('/a-la-carte-menu', aLaCarteRouter);
app.use('/auth', authRouter);
app.use('/pay', payRouter);

app.get('/', (req, res) => res.send(endpoints));

app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`, (new Date()).toTimeString()));