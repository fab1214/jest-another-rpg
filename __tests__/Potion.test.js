const Player = require('../lib/Player');
const Potion = require('../lib/Potion');

//tests health potion
test('create a health potion object', () => {
    const potion = new Potion('health');

    expect(potion.name).toBe('health');
    expect(potion.value).toEqual(expect.any(Number));
});

//tests other random potion
test('creates a random potion object', () => {
    const potion = new Potion();
    
    expect(potion.name).toEqual(expect.any(String));
    expect(potion.name.length).toBeGreaterThan(0);
    expect(potion.value).toEqual(expect.any(Number));
});

//test player health
test("gets player's health value", () => {
    const player = new Player('Louie');

    expect(player.getHealth()).toEqual(expect.stringContaining(player.health.toString()));
});