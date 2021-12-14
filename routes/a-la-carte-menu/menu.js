import express from 'express';
import fs from 'fs';

const menu = JSON.parse(fs.readFileSync('routes/a-la-carte-menu/menu.json'));

const router = express.Router();

router.get('/', (req, res) => res.send(menu));

router.get('/starters', (req, res) => {
    const { starters } = menu;
    res.send(starters);
});
router.get('/mains', (req, res) => {
    const { mains } = menu;
    res.send(mains);
});
router.get('/desserts', (req, res) => {
    const { desserts } = menu;
    res.send(desserts);
});

router.get('/starters/:index', (req, res) => {
    const { starters } = menu;
    const { index } = req.params;

    if (index >= 0 && index < starters.length)
        res.send(starters[index]);
    else
        res.send(`Index ${index} out of bounds: valid range [0; ${starters.length - 1}]`);
});

router.get('/mains/:index', (req, res) => {
    const { mains } = menu;
    const { index } = req.params;

    if (index >= 0 && index < mains.length)
        res.send(mains[index]);
    else
        res.send(`Index ${index} out of bounds: valid range [0; ${mains.length - 1}]`);
});

router.get('/deserts/:index', (req, res) => {
    const { deserts } = menu;
    const { index } = req.params;

    if (index >= 0 && index < deserts.length)
        res.send(deserts[index]);
    else
        res.send(`Index ${index} out of bounds: valid range [0; ${deserts.length - 1}]`);
});

router.get('/starters/:index/:arg', (req, res) => {
    const { starters } = menu;
    const { index, arg } = req.params;

    if (index >= 0 && index < starters.length)
    {
        if (starters[index][arg] !== undefined)
            res.send(JSON.stringify(starters[index][arg]));
        else
            res.send(`${arg} is not a property of item ${index} in A La Carte Menu Starters`);
    }
    else
        res.send(`index ${index} Out of bounds: valid range [0; ${menu.length - 1}]`);
});

router.get('/mains/:index/:arg', (req, res) => {
    const { mains } = menu;
    const { index, arg } = req.params;

    if (index >= 0 && index < mains.length)
    {
        if (mains[index][arg] !== undefined)
            res.send(JSON.stringify(mains[index][arg]));
        else
            res.send(`${arg} is not a property of item ${index} in A La Carte Menu Mains`);
    }
    else
        res.send(`index ${index} Out of bounds: valid range [0; ${menu.length - 1}]`);
});

router.get('/desserts/:index/:arg', (req, res) => {
    const { desserts } = menu;
    const { index, arg } = req.params;

    if (index >= 0 && index < desserts.length)
    {
        if (desserts[index][arg] !== undefined)
            res.send(JSON.stringify(desserts[index][arg]));
        else
            res.send(`${arg} is not a property of item ${index} in A La Carte Menu Desserts`);
    }
    else
        res.send(`index ${index} Out of bounds: valid range [0; ${menu.length - 1}]`);
});

export default router;