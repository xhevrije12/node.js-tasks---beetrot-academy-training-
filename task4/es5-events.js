const EventEmitter = require('events');
const util = require('util');

function Person(name) {
    this.name = name;
}

util.inherits(Person, EventEmitter);

Person.prototype.speaks = function(msg) {
    console.log(`[ES5] ${this.name} thote: ${msg}`);
};

var bill = new Person('Bill');
var tom = new Person('Tom');

bill.on('says', function(msg) {
    this.speaks(msg);
});

tom.on('says', function(msg) {
    this.speaks(msg);
});

console.log("Test ES5");
bill.emit('says', 'Hello Bill - ES5');
tom.emit('says', 'Tom, ES5');










