const EventEmitter = require('events');
const eventEmitter = new EventEmitter();

eventEmitter.on('greet', () => {
    console.log("hello student, welcome to Node.js events");
});

console.log("Prova 1 para fshirjes:");
eventEmitter.emit('greet');

eventEmitter.removeAllListeners('greet');


console.log("Prova 2 pas fshirjes:");
eventEmitter.emit('greet');

console.log("u fshi me sukses");