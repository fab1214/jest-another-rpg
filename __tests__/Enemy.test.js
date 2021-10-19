const { test, expect } = require('@jest/globals');
const Enemy = require('../lib/Enemy.js');
const Potion = require('../lib/Potion.js');

jest.mock('../lib/Potion');

test('creates enemy object', () => {
    const enemy = new Enemy('shay', 'sword');

    expect(enemy.name).toBe('shay');
    expect(enemy.weapon).toBe('sword');
    expect(enemy.health).toEqual(expect.any(Number));
    expect(enemy.strength).toEqual(expect.any(Number));
    expect(enemy.agility).toEqual(expect.any(Number));
    expect(enemy.potion).toEqual(expect.any(Object));
});

test('gets enemys health value', () => {
    const enemy = new Enemy('shay', 'sword');

    expect(enemy.getHealth()).toEqual(expect.stringContaining(enemy.health.toString()));
});

//test if Enemy is alive
test('checks if enemy is alive or not', () => {
    const enemy = new Enemy('shay', 'sword');

    expect(enemy.isAlive()).toBeTruthy();
    //if Enemy health is 0...
    enemy.health=0;
    //statement is false
    expect(enemy.isAlive()).toBeFalsy();
});

//test for Enemy getAttack value
test('gets enemy attack value', () => {
    const enemy = new Enemy('shay', 'sword');
    enemy.strength = 10;

    expect(enemy.getAttackValue()).toBeGreaterThanOrEqual(5);
    expect(enemy.getAttackValue()).toBeLessThanOrEqual(15);
});


//check if reduceHealth reduces correct amount of health being subtracted
test('subtracts from enemys health', () => {
    const enemy = new Enemy('shay', 'sword');
    const oldHealth = enemy.health;

    //reduce health by 5
    enemy.reduceHealth(5);
    //enemy.health = oldHealth - 5
    expect(enemy.health).toBe(oldHealth - 5);

    enemy.reduceHealth(9999);

    expect(enemy.health).toBe(0);
});
