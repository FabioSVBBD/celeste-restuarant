import express from "express";
import bodyParser from 'body-parser';

const PORT = process.env.PORT || 5000;

const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => res.send("API up and running"));

app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));

