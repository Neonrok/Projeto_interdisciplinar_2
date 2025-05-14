//API Express requesitos
const express = require('express');
const connection = require('./connect');

//comfiguração basica da express
const app = express();
const hostname = '127.0.0.1';
const port = process.env.PORT || 3000;
//Este é o inicio de toda o ordem da API aqui que vai começar a api rest
app.get('/', (req, res) => {
    res.send('this is alive');
})


//fim do codigo
app.listen(port, hostname, (error) => {
    console.log(`Node server running on http://${hostname}:${port}/`);
});