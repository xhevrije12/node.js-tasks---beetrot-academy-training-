const EventEmitter = require('events');

class Person extends EventEmitter {
    constructor(name) {
        super();
        this.name = name;
    }

    speaks(msg) {
        console.log(`[ES6] ${this.name} thote: ${msg}`);
    }
}

const bill = new Person('Bill');
const tom = new Person('Tom');

bill.on('says', (msg) => bill.speaks(msg));
tom.on('says', (msg) => tom.speaks(msg));

console.log("Test ES6");
bill.emit('says', 'Hi ES6!');
tom.emit('says', 'test ES6');