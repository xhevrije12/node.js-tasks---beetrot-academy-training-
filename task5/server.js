const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  
    const filePath = path.join(__dirname, 'big.html');

    
    const stream = fs.createReadStream(filePath);

  
    stream.on('error', (error) => {
        console.error('Gabim gjate leximit:', error.message);
        res.statusCode = 404;
        res.end("Error 404: Skedari nuk u gjet!");
    });

    stream.pipe(res);
});

server.listen(3000, () => {
    console.log('Serveri po degjon ne http://localhost:3000');
    console.log('Testoje me: curl --limit-rate 1k http://localhost:3000');
});