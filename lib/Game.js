const inquirer = require('inquirer');
const Enemy = require('../lib/Enemy');
const Player = require('../lib/Player');

function Game() {
  this.roundNumber = 0;
  this.isPlayerTurn = false;
  this.enemies = [];
  this.currentEnemy;
  this.player;
}

Game.prototype.initializeGame = function() {
  this.enemies.push(new Enemy('goblin', 'sword'));
  this.enemies.push(new Enemy('orc', 'baseball bat'));
  this.enemies.push(new Enemy('skeleton', 'axe'));

  this.currentEnemy = this.enemies[0];

inquirer
  .prompt({
    type: 'text',
    name: 'name',
    message: 'What is your name?'
  })
  // destructure name from the prompt object
  .then(({ name }) => {
    this.player = new Player(name);

    this.startNewBattle();
  });

}

Game.prototype.startNewBattle = function () {
  if(this.player.agility > this.currentEnemy.agility) {
    this.isPlayerTurn = true;
  }else{
    this.isPlayerTurn = false;
  }

  console.log('Your stats are as follows:');
  console.table(this.player.getStats());

  console.log(this.currentEnemy.getDescription());

  this.battle();
};


//this.battle() runs the battle turns indefinitely
Game.prototype.battle = function() {
  //if player turn
  if(this.isPlayerTurn){
    //prompt user to attack or use a potion
    inquirer
    .prompt({
      type: 'list',
      message: 'What would you like to do?',
      name: 'action',
      choices: ['Attack', 'Use potion']
    })
      .then(({ action }) => {
    //if using potion:
    if (action === 'Use potion') {
          //check if invenotry is empty before showing potion list
          if(!this.player.getInventory()){
            console.log("You don't have any potions!");
            return;
          }
          //display a list of potion objects to user
          inquirer
          .prompt({
            type: 'list',
            message: 'Which potion would you like to use?',
            name: 'action',
            //add +1 to index to start from 1 instead of 0 (easier for user)
            choices: this.player.getInventory().map((item, index) => `${index + 1}: ${item.name}`)
          })
          //split : from index:item index
          .then(({ action }) => {
            const potionDetails = action.split(': ');
            //subtract 1 to go back to original index order (start from 0)
            this.player.usePotion(potionDetails[0] - 1);
            //console log which potion you used from array['2','strength'] ([1] refers to item name)
            console.log(`You used a ${potionDetails[1]} potion.`)
          })
      
        //apply selected potion effect to player

        //if attacking
        }else{
          //subtract health from enemy based on player attack value
          const damage = this.player.getAttackValue();
          this.currentEnemy.reduceHealth(damage);

          console.log(`You attacked the ${this.currentEnemy.name}`);
          console.log(this.currentEnemy.getHealth());
        }
      });
  //if enemy turn:
  }else {
    //subtract health from player based on enemy attack value
    const damage = this.currentEnemy.getAttackValue();
    this.player.reduceHealth(damage);

    console.log(`You were attacked by the ${this.currentEnemy.name}`);
    console.log(this.player.getHealth());
  }
};
module.exports=Game;