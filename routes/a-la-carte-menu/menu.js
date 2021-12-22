import express from 'express';
import fs from 'fs';

const data = JSON.parse(fs.readFileSync('routes/a-la-carte-menu/menu-updated.json'));
const { menu } = data;

const router = express.Router();

router.get('/', (req, res) => res.send(menu));
router.get('/all', (req, res) => res.send(data));

router.get('/:type', (req, res) => {
    const { type } = req.params;

    const typeData = menu[type];
    if (typeData === undefined) {
        res.send(`${type} is not a property of the A La Carte Menu`);
        return;
    }

    res.send(typeData);
});

router.get('/:type/:index', (req, res) => {
    const { type, index } = req.params;

    const typeData = menu[type];
    if (typeData === undefined) {
        res.send(`${type} is not a property of the A La Carte Menu`);
        return;
    }
    
    const indexData = typeData[index];
    if (indexData === undefined) {
        res.send(`Index ${index} Out of bounds in menu[${type}]: valid range [0; ${typeData.length - 1}]`);
        return;
    }

    res.send(indexData);
});

router.get('/:type/:index/:arg', (req, res) => {
    const { type, index, arg } = req.params;

    const typeData = menu[type];
    if (typeData === undefined) {
        res.send(`${type} is not a property of the A La Carte Menu`);
        return;
    }

    const indexData = typeData[index];
    if (indexData === undefined) {
        res.send(`Index ${index} Out of bounds in menu[${type}]: valid range [0; ${typeData.length - 1}]`);
        return;
    }

    const argData = indexData[arg];
    if (argData === undefined) {
        res.send(`${arg} is not a property of menu[${type}][${index}]`);
        return;
    }

    res.send(JSON.stringify(argData));
})

export default router;