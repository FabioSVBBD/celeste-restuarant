import express from 'express';
import fs from 'fs';

const menu = JSON.parse(fs.readFileSync('routes/tasting-menu/menu.json'));

const router = express.Router();

router.get('/', (req, res) => res.send(menu));

router.get('/:index', (req, res) => {
    const { index } = req.params;

    if (index < 0 || index >= menu.length) {
        res.send(`index ${index} Out of bounds: valid range [0; ${menu.length - 1}]`);
        return;
    }

    res.send(menu[index]);
})

router.get('/:index/:arg', (req, res) => {
    const { index, arg } = req.params;

    if (index < 0 || index >= menu.length) {
        res.send(`index ${index} Out of bounds: valid range [0; ${menu.length - 1}]`);
        return;
    }

    if (menu[index][arg] === undefined) {
        res.send(`${arg} is not a property of item ${index} in Tasting Menu`);
        return;
    }

    res.send(menu[index][arg]);
})

export default router;