// const fs = require('fs');

// const readableStream = fs.createReadStream("file.txt", "utf-8");

// readableStream.on('data', chunk=>{
//     console.log("chunk")
// })

// fs.createWriteStream

//task1 me streams
const fs = require('fs');

const readableStream = fs.createReadStream("file.txt", "utf-8");

const writableStream = fs.createWriteStream("output.txt");

readableStream.on('data', (chunk) => {
    console.log("detyra");
   
    writableStream.write(chunk);
});

