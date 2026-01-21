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