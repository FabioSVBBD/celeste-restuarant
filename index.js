import express from "express";
import bodyParser from 'body-parser';

import tastingRouter from './routes/tasting-menu/menu.js';
import aLaCarteRouter from './routes/a-la-carte-menu/menu.js';
import authRouter from './routes/auth/auth.js';
import payRouter from './routes/pay/pay.js';

const PORT = process.env.PORT || 5000;

const endpoints = {
    "information": "All Amounts related to price or cost are in Rands (ZAR)",
    "endpoints": [
        { "/": "root - this endpoint" },
        { "/auth": "Mini App Authorization" },
        { "/pay": "Mini App Payments" },
        {
            "/tasting-menu": {
                "/": "Returns Tasting Menu Data",
                "/{index}": {
                    "/": "Returns the respective index of Tasting Menu",
                    "/{arg}": "Returns the property {arg} at the index",
                }
            }
        },
        {
            "/a-la-carte-menu": {
                "/": "Returns A La Carte Menu Data",
                "/starters": {
                    "/": "Returns the Starters subsection of the A La Carte Menu",
                    "/{index}": {
                        "/": "Returns the respective index of Starters",
                        "/{arg}": "Returns the property {arg} at the index"
                    }
                },
                "/mains": {
                    "/": "Returns the Mains subsection of the A La Carte Menu",
                    "/{index}": {
                        "/": "Returns the respective index of Mains",
                        "/{arg}": "Returns the property {arg} at the index"
                    }
                },
                "/desserts": {
                    "/": "Returns the Desserts subsection of the A La Carte Menu",
                    "/{index}": {
                        "/": "Returns the respective index of Desserts",
                        "/{arg}": "Returns the property {arg} at the index"
                    }
                },
            }
        },
        // "/",
        // "/auth",
        // "/pay",
        // "/tasting-menu",
        // "/tasting-menu/{index}",
        // "/a-la-carte-menu",
        // "/a-la-carte-menu/starters",
        // "/a-la-carte-menu/starters/{index}",
        // "/a-la-carte-menu/mains",
        // "/a-la-carte-menu/mains/{index}",
        // "/a-la-carte-menu/deserts",
        // "/a-la-carte-menu/deserts/{index}",
    ]
}

const app = express();

app.use(bodyParser.json());
app.use('/tasting-menu', tastingRouter);
app.use('/a-la-carte-menu', aLaCarteRouter);
app.use('/auth', authRouter);
app.use('/pay/', payRouter);

app.get('/', (req, res) => res.send(endpoints));

app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));