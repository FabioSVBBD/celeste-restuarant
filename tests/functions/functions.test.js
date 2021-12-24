const functions = require('./functions');

test('Adds 2 + 2 = 4', () => {
    expect(functions.add(2,2)).toBe(4);
});

test('Adds 2 + 2 != 5', () => {
    expect(functions.add(2,2)).not.toBe(5);
});

test('Should be Null', () => {
    expect(functions.isNull()).toBeNull();
})

test('Should be falsy', () => {
    expect(functions.checkValue(null)).toBeFalsy();
});

test('User Should be Atticus James object', () => {
    expect(functions.createUser()).toEqual({firstName: "Atticus", lastName: "James"});
}); 

test('Should be under 1600', () => {
    const load1 = 700;
    const load2 = 800;
    expect(load1 + load2).toBeLessThan(1600);
});

test('There is no I in team', () => {
    expect('team').not.toMatch(/I/);
});

test('Admin should be in usernames', () => {
    const userNames = ['john', 'karen', 'admin'];

    expect(userNames).toContain('admin');
})

test('User fetched name should be Leanne Graham', () => {
    expect.assertions(1);
    return functions.fetchUser()
        .then(data => {
            expect(data.name).toEqual('Leanne Graham');
        });
}); 

test('Asynchronously: User fetched name should be Leanne Graham', async () => {
    expect.assertions(1);
    const data = await functions.fetchUser();
    expect(data.name).toEqual('Leanne Graham');
});