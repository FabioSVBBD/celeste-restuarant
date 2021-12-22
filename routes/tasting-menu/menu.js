import express from 'express';
import fs from 'fs';
import { isNumberObject } from 'util/types';

const data = JSON.parse(fs.readFileSync('routes/tasting-menu/menu-updated.json'));
const { menu } = data;

const router = express.Router();

router.get('/', (req, res) => res.send(menu));
router.get('/all', (req, res) => res.send(data));

router.get('/:index', (req, res) => {
    const { index } = req.params;

    const indexData = menu[index];
    if (indexData === undefined) {
        res.send(`Index ${index} Out of bounds: valid range [0; ${menu.length - 1}]`);
        return;
    }

    res.send(indexData);
});

router.get('/:index/:arg', (req, res) => {
    const { index, arg } = req.params;

    const indexData = menu[index];
    if (indexData === undefined) {
        res.send(`Index ${index} Out of bounds: valid range [0; ${menu.length - 1}]`);
        return;
    }

    const argData = indexData[arg];
    if (argData === undefined) {
        res.send(`${arg} is not a property of item ${index} in Tasting Menu`);
        return;
    }

    res.send(argData);
})

export default router;