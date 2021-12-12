import express from "express";
import bodyParser from 'body-parser';
import tastingRouter from './routes/tasting-menu/menu.js';
import aLaCarteRouter from './routes/a-la-carte-menu/menu.js';

const PORT = process.env.PORT || 5000;

const endpoints = {
    "endpoints": [
        "/",
        "/tasting-menu",
        "/a-la-carte-menu",
    ]
}

const app = express();

app.use(bodyParser.json());
app.use('/tasting-menu', tastingRouter);
app.use('/a-la-carte-menu', aLaCarteRouter);

app.get('/', (req, res) => res.send(endpoints));

app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));

