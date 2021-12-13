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
router.get('/deserts', (req, res) => {
    const { deserts } = menu;
    res.send(deserts);
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

export default router;