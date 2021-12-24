const axios = require('axios');
const exp = require('constants');
const fs = require('fs');

const menu_calls = require('./menu_calls');

jest.setTimeout(1000 * 60 * 5); // 90 seconds

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

// Root tests
test(`API: root call`, async () => {
    expect.assertions(1);
    const endpoints = JSON.parse(fs.readFileSync('endpoints.json'));
    const { data } = await menu_calls.root();

    expect(data).toEqual(endpoints);
});

// Tasting Menu Tests
test(`API: tasting-menu call`, async () => {
    expect.assertions(1);
    const menu = JSON.parse(fs.readFileSync('routes/tasting-menu/menu-updated.json'));
    const { data } = await menu_calls.tasting();

    expect(data).toEqual(menu);
});

test(`API: tasting-menu call with [index]`, async () => {
    const { menu } = JSON.parse(fs.readFileSync('routes/tasting-menu/menu-updated.json'));
    const size = menu.length;
    expect.assertions(size);

    for (let i = 0; i < size; i++) {
        const { data } = await menu_calls.tasting(i);
        expect(data).toEqual(menu[i]);
    }
});

test(`API: tasting-menu call [index, prop]`, async () => {
    const { menu } = JSON.parse(fs.readFileSync('routes/tasting-menu/menu-updated.json'));
    const props = ["id", "name", "main", "secondary", "price"]; //, "price"]; Breaks it for some reason
    expect.assertions(menu.length * props.length);

    for (let i = 0; i < menu.length; i++) {
        for (let j = 0; j < props.length; j++) {
            const { data } = await menu_calls.tasting(i, props[j]);
            expect(data).toEqual(menu[i][props[j]]);
        }
    }
});

// A La Carte Menu Tests
test('API: A La Carte Menu call', async () => {
    expect.assertions(1);
    const menu = JSON.parse(fs.readFileSync('routes/a-la-carte-menu/menu-updated.json'));
    const { data } = await menu_calls.a_la_carte();

    expect(data).toEqual(menu);
});

test('API: A La Carte Menu call with [type]', async () => {
    const { menu } = JSON.parse(fs.readFileSync('routes/a-la-carte-menu/menu-updated.json'));
    const types = [ "starters", "mains", "desserts" ];
    const size = types.length;
    expect.assertions(size);

    for (let i = 0; i < size; i++) {
        const { data } = await menu_calls.a_la_carte(types[i]);
        expect(data).toEqual(menu[types[i]]);
    }
});

test('API: A La Carte Menu with [type, index]', async () => {
    const { menu } = JSON.parse(fs.readFileSync('routes/a-la-carte-menu/menu-updated.json'));
    const types = [ "starters", "mains", "desserts" ];
    let size = 0;
    for (let i = 0; i < types.length; i++) { size += menu[types[i]].length; }
    expect.assertions(size);

    for (let i = 0; i < types.length; i++) {
        for (let j = 0; j < menu[types[i]].length; j++) {
            const { data } = await menu_calls.a_la_carte(types[i], j);
            expect(data).toEqual(menu[types[i]][j]);
        }
    }
});

test('API: A La Carte Menu with [type, index, prop]', async () => {
    const { menu } = JSON.parse(fs.readFileSync('routes/a-la-carte-menu/menu-updated.json'));
    const types = [ "starters", "mains", "desserts" ];
    const props = ["id", "title", "description", "price"];
    let size = 0;
    for (let i = 0; i < types.length; i++) { 
        size += menu[types[i]].length;
    }
    size *= props.length;
    expect.assertions(size);

    let counter = 0;

    for (let i = 0; i < types.length; i++) {
        for (let j = 0; j < menu[types[i]].length; j++) {
            for (let k = 0; k < props.length; k++) {
                counter++;
                const { data } = await menu_calls.a_la_carte(types[i], j, props[k]);
                expect(data).toEqual(menu[types[i]][j][props[k]]);
            }
        }
    }
})