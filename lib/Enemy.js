const Potion = require('../lib/Potion');

function Enemy(name, weapon){
    this.name = name;
    this.weapon = weapon;
    this.potion = new Potion();

    this.health = Math.floor(Math.random()* 10 + 85);
    this.strength = Math.floor(Math.random()* 5 + 5);
    this.agility = Math.floor(Math.random()* 5 + 5);
};

//create prototype for getHealth
Enemy.prototype.getHealth = function(){
    return `${this.name}'s health is now ${this.health}!`;
};

//create prototype for isAlive
Enemy.prototype.isAlive = function(){
    if(this.health===0){
        return false;
    }
    return true;
};

//create prototype for getDescription
Enemy.prototype.getDescription = function(){
    return `A ${this.name} holding a ${this.weapon} has appeared!`;
};

//create prototype for getAttackValue
Enemy.prototype.getAttackValue = function(){
    const min = this.strength - 5;
    const max = this.strength + 5;

    return Math.floor(Math.random() * (max-min) + min);
};


//create prototype for reduceHealth
Enemy.prototype.reduceHealth = function(health){
    this.health -= health;
    //if health is less than 0, health stays at 0
    if(this.health < 0){
        this.health = 0;
    }
};


module.exports = Enemy;
