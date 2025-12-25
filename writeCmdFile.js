const fs = require('fs'); // Importojmë modulin e File System
const path = require('path'); // Importojmë modulin Path

// Marrim argumentet nga terminali
const args = process.argv;

// Gjejmë pozicionin e emrit të skedarit dhe përmbajtjes
const fileName = args[3]; 
const content = args[5];

if (!fileName || !content) {
    console.log("Ju lutem jepni emrin e skedarit dhe permbajtjen!");
    process.exit(); // Ndalon programin nese mungojne te dhenat
}

// Rruga e plote e skedarit (duke perdorur path.join)
const filePath = path.join(__dirname, fileName);

// Perdorim fs.stat() per te kontrolluar nese skedari ekziston
fs.stat(filePath, (err, stats) => {
    if (err) {
        // Nese ka gabim (err), do te thote qe skedari nuk ekziston
        console.log("Skedari nuk ekziston. Po krijohet i ri...");
    } else {
        // Nese nuk ka gabim, skedari ekziston
        console.log("Skedari ekziston. Teksti do te shtohet ne fund.");
    }

    // fs.appendFile shton tekstin ne fund (nese nuk ekziston, e krijon vete)
    fs.appendFile(filePath, content + "\n", (error) => {
        if (error) {
            console.log("Ndodhi nje gabim gjate shkrimit!");
        } else {
            console.log("Sukses! Te dhenat u rregjistruan ne: " + fileName);
        }
    });
});