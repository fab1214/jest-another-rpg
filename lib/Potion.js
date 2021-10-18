function Potion(name){
    this.types = ['strength', 'agility', 'health'];
    this.name = name || this.types[Math.floor(Math.random() * this.types.length)];
//if potion is a health potion, get a number between 30 & 40.
    if(this.name === 'health'){
        this.value = Math.floor(Math.random() * 10 + 30);
    }else {
        this.value - Math.floor(Math.random() * 5 + 7);
    }
}

module.exports = Potion;