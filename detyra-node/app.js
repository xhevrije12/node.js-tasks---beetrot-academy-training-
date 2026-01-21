// //detyra2
// const fs = require('fs');

// fs.writeFileSync('.env', 'MESSAGE="beetroot academy"');

// require('dotenv').config({ override: true });
// const mesazhiIm = process.env.MESSAGE;

// console.log('Mesazhi u mor prej .env');

// if (!fs.existsSync('data')) {
//     fs.mkdirSync('data');
// }

// fs.writeFileSync('data/message.txt', mesazhiIm);

// const permbajtja = fs.readFileSync('data/message.txt', 'utf8');
// console.log('permbajtja:', permbajtja);


// fs.unlinkSync('data/message.txt');
// fs.rmdirSync('data');

// console.log('u fshi me sukses');

//ushtrime ne klase
// const axios = require("axios");

// async function fetchData() {
//     try {
//         const response = await axios.get("https://jsonplaceholder.typicode.com/users");
//         const data = response.data;

//         //lista e perdoruesve
//         console.log(response.data);

//         console.log(response.data[0].email);

//         console.log(data[0]);

//         console.log(`Emri i personit eshte: "${data[0].name}", jeton ne addresen: "${data[0].address.city}", numri kontaktit: "${data[0].phone}", punon ne: "${data[0].company.name}"`);

//     } catch(err) {
//         throw new Error("Error fetching data: " + err.message);
//     }
// }

// fetchData();


