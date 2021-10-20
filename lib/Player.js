const Potion = require('../lib/Potion');

//Player constructor
function Player(name = '') {
    this.name = name;
  
    this.health = Math.floor(Math.random() * 10 + 95);
    this.strength = Math.floor(Math.random() * 5 + 7);
    this.agility = Math.floor(Math.random() * 5 + 7);
  
    this.inventory = [new Potion('health'), new Potion()];
  }

//create prototype for getHealth
Player.prototype.getHealth = function(){
    return `${this.name}'s health is now ${this.health}!`;
};

//create prototype for getStats
Player.prototype.getStats = function(){
    return {
        potions: this.inventory.length,
        health: this.health,
        strength: this.strength,
        agility: this.agility,
    };
};

//create prototype for getInventory
Player.prototype.getInventory = function(){
    if(this.inventory.length){
        return this.inventory;
    }
    return false;
};


//create prototype for isAlive
Player.prototype.isAlive = function(){
    if(this.health===0){
        return false;
    }
    return true;
};

//create addPotion to push new potion to inventory array
Player.prototype.addPotion = function(potion){
    this.inventory.push(potion);
};

//create usePotion to keep track of old inventory length
Player.prototype.usePotion = function(index) {
    //remove index 1 and set it in a new array starting at 0 and saved in a potion variable
    const potion = this.getInventory().splice(index,1)[0];
    //potion adds points to 3 stats
    switch(potion.name) {
        case 'agility':
            this.agility += potion.value;
            break;
        case 'health':
            this.health += potion.value;
            break;
        case 'strength':
            this.strength += potion.value;
            break;
    }
};


//create prototype for getAttackValue
Player.prototype.getAttackValue = function(){
    const min = this.strength - 5;
    const max = this.strength + 5;

    return Math.floor(Math.random() * (max-min) + min);
};


//create prototype for reduceHealth
Player.prototype.reduceHealth = function(health){
    this.health -= health;
    //if health is less than 0, health stays at 0
    if(this.health < 0){
        this.health = 0;
    }
};

module.exports = Player;