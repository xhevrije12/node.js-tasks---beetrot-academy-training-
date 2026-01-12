//task with http requests
const http = require('http');
const fs = require('fs');
const qs = require('querystring');


const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;

 
    if (url === '/login.html' && method === 'GET') {
        fs.readFile('./login.html', (err, data) => {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end("Error: login.html not found!");
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data);
            }
        });
    } 
   
    else if (url === '/login.html' && method === 'POST') {
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
        });

        
        req.on('end', () => {

            const params = qs.parse(body);
            const login = params.login;
            const password = params.password;

            if (login === 'user' && password === 'secret') {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(`<h1>Success</h1><p>Login: ${login}</p><p>Password: ${password}</p>`);
            } else {
                res.writeHead(401, { 'Content-Type': 'text/html' });
                res.end("<h1>Failed</h1><p>Invalid credentials!</p>");
            }
        });
    } 
    
    
    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end("Page not found. Go to http://localhost:3005/login.html");
    }
});

const PORT = 3005;
server.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}/login.html`);
});