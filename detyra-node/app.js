// //detyra 1

// // app.js - The main application file

// // Import the Person constructor from the module
// const Person = require('./person');

// // Create first user object
// const user1 = new Person('Sara', '123 Rruga Adem Jashari,Prishtine, PR');

// // Create second user object
// const user2 = new Person('Elma', 'Rruga Deshmoret e kombit, Tirane, TI');

// // Test the getInfo() method for both users
// console.log('User 1 Information:');
// user1.getInfo();

// console.log('\nUser 2 Information:');
// user2.getInfo();
























// // SHTO ./ përpara emrit të folderit
// const Person = require('./person');


// console.log("test");

// const {Person} = require("person")

// const personi1 = new Person("Filan", "Prishtine");

// personi1=getInfo();

// const path = require("node.path");

// const filePath = "./file-test.txt";

// console.log(pathdir)


// const name ="Filan";

// path.join('/', "users", naem, "leternjoftimi.txt")
// path.resolve('leternjoftimi.txt');
// console.log(path.resolve('leternjoftimi.txt'));

//const { ifError } = require("node:assert/strict");
//const fs = require("node:fs");
// fs.readFile("./test.txt", 'utf-8',(err, data)=> {
//     if(err){
//         console.log(err)
//     }
//     console.log(data)
// })

// console.log("2")



detyra2
const fs = require('fs');

fs.writeFileSync('.env', 'MESSAGE="beetroot academy"');

require('dotenv').config({ override: true });
const mesazhiIm = process.env.MESSAGE;

console.log('Mesazhi u mor prej .env');

if (!fs.existsSync('data')) {
    fs.mkdirSync('data');
}

fs.writeFileSync('data/message.txt', mesazhiIm);

const permbajtja = fs.readFileSync('data/message.txt', 'utf8');
console.log('permbajtja:', permbajtja);


fs.unlinkSync('data/message.txt');
fs.rmdirSync('data');

console.log('u fshi me sukses');
