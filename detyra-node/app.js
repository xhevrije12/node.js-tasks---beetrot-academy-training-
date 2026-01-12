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
