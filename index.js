import express from "express";
import bodyParser from 'body-parser';

import tastingRouter from './routes/tasting-menu/menu.js';
import aLaCarteRouter from './routes/a-la-carte-menu/menu.js';
import authRouter from './routes/auth/auth.js';

const PORT = process.env.PORT || 5000;

const endpoints = {
    "information": "All Amounts related to price or cost are in Rands (ZAR)",
    "endpoints": [
        "/",
        "/auth",
        "/tasting-menu",
        "/tasting-menu/{index}",
        "/a-la-carte-menu",
        "/a-la-carte-menu/starters",
        "/a-la-carte-menu/starters/{index}",
        "/a-la-carte-menu/mains",
        "/a-la-carte-menu/mains/{index}",
        "/a-la-carte-menu/deserts",
        "/a-la-carte-menu/deserts/{index}",
    ]
}

const app = express();

app.use(bodyParser.json());
app.use('/tasting-menu', tastingRouter);
app.use('/a-la-carte-menu', aLaCarteRouter);
app.use('/auth', authRouter);

app.get('/', (req, res) => res.send(endpoints));

app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));