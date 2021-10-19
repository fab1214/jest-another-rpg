const Potion = require('../lib/Potion');
//mock data from __mocks__
jest.mock('../lib/Potion');

//import Player function from Player.js
const Player = require('../lib/Player');

//test player object function
test('creates a player object', () => {
    const player = new Player('Louie');

    expect(player.name).toBe('Louie');
    expect(player.health).toEqual(expect.any(Number));
    expect(player.strength).toEqual(expect.any(Number));
    expect(player.agility).toEqual(expect.any(Number));
    expect(player.inventory).toEqual(
        expect.arrayContaining([expect.any(Object)])
    );
});


//test player stats 
test("gets a player's stats as an object", () => {
    const player = new Player('Louie');

    expect(player.getStats()).toHaveProperty('potions');
    expect(player.getStats()).toHaveProperty('health');
    expect(player.getStats()).toHaveProperty('strength');
    expect(player.getStats()).toHaveProperty('agility');
});
//test player inventory
test("gets inventory from player or returns false", () => {
    const player = new Player('Louie');
    //if player has inventory, return array...
    expect(player.getInventory()).toEqual(expect.any(Array));
    //simulate empty array to return false...
    player.inventory = [];
    //return false
    expect(player.getInventory()).toEqual(false);
});

//test player health value
test("gets player's health value", () => {
    const player = new Player('Louie');
  
    expect(player.getHealth()).toEqual(expect.stringContaining(player.health.toString()));
  });

//test if player is alive
test('checks if player is alive or not', () => {
    const player = new Player('Louie');

    expect(player.isAlive()).toBeTruthy();
    //if player health is 0...
    player.health=0;
    //statement is false
    expect(player.isAlive()).toBeFalsy();
});

//check if reduceHealth reduces correct amount of health being subtracted
test('subtracts from players health', () => {
    const player = new Player('Louie');
    const oldHealth = player.health;

    //reduce health by 5
    player.reduceHealth(5);
    //playe.health = oldHealth - 5
    expect(player.health).toBe(oldHealth - 5);

    player.reduceHealth(9999);

    expect(player.health).toBe(0);
});

//test for player getAttack value
test('gets player attack value', () => {
    const player = new Player('Louie');
    player.strength = 10;

    expect(player.getAttackValue()).toBeGreaterThanOrEqual(5);
    expect(player.getAttackValue()).toBeLessThanOrEqual(15);
});

//test if potion was added correctly
test('adds a potion to the inventory', () =>{
    const player = new Player('Louie');
    const oldCount = player.inventory.length

    player.addPotion(new Potion());

    expect(player.inventory.length).toBeGreaterThan(oldCount);
});

//test that ensures usePotion removes the correct potion from inventory
test('uses a potion from inventory', () => {
    const player = new Player('Louie');
    player.inventory = [new Potion(), new Potion(), new Potion()];
    const oldCount = player.inventory.length;

    player.usePotion(1);
    expect(player.inventory.length).toBeLessThan(oldCount);
});