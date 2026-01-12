//task1
const Person = require('./person');

const user1 = new Person('Sara', '123 Rruga Adem Jashari, Prishtine, PR');
const user2 = new Person('Elma', 'Rruga Deshmoret e kombit, Tirane, TI');

console.log('Detyra 1: Informacioni i perdoruesve');
user1.getInfo();
user2.getInfo();