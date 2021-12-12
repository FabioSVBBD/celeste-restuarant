import express from 'express';
import fs from 'fs';

const menu = JSON.parse(fs.readFileSync('routes/tasting-menu/menu.json'));

const router = express.Router();

router.get('/', (req, res) => res.send(menu));

export default router;