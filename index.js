//API Express requesitos
const express = require('express');
const connection = require('./connect');
const path = require('path')

//comfiguração basica da express
const app = express();
const hostname = '127.0.0.1';
const port = process.env.PORT || 3000;
//serve para o cliente poder ir buscar a outras pastas coisas que o html precisa
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/js', express.static(path.join(__dirname, 'js')));

//Este é o inicio de toda o ordem da API aqui que vai começar a api rest
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'html', 'login.html'));
})


//fim do codigo
app.listen(port, hostname, (error) => {
    console.log(`Node server running on http://${hostname}:${port}/`);
});