const express = require('express');
const app = express();

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('pages/index');
});

app.get('/login', (req, res) => {
    res.render('pages/login');
});

app.post('/login', (req, res) => {
    const { login, password } = req.body;


    if (login === 'bill' && password === '12345') {
        res.send("Hello " + login);
    } else {
        res.send("failed... try it again");
    }
});

app.listen(3000, () => {
    console.log("Server works at port 3000...");
});