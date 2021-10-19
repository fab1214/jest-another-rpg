//potion constructor
function Potion(name){
    //3 types of potions
    this.types = ['strength', 'agility', 'health'];

    //select named potion OR randomly select from array
    this.name = name || this.types[Math.floor(Math.random() * this.types.length)];

//if potion is a health potion, get a random value between 30-40
    if(this.name === 'health'){
        this.value = Math.floor(Math.random() * 10 + 30);
    }else {
        this.value = Math.floor(Math.random() * 5 + 7);
    }
};

module.exports = Potion;