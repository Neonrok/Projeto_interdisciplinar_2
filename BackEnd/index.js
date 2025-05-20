//API Express requesitos
const express = require('express');
const connection = require('./models/connect');
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

app.get('/api/perfil/:id', (req, res) => {
    const userId = req.params.id;

    //tenho que trocar isto por sequalize
    const query = `
        SELECT Perfil.Username, Perfil.descicao, Tipo_Cargos.cargo
        FROM Perfil
        LEFT JOIN Tipo_Cargos ON Perfil.cargo_id = Tipo_Cargos.id_cargo
        WHERE Perfil.id_Users = ?
    `;

    connection.query(query, [userId], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Erro ao buscar os dados do perfil.');
        } else if (results.length === 0) {
            res.status(404).send('Utilizador não encontrado.');
        } else {
            res.json(results[0]); // Retorna o primeiro resultado
        }
    });
    
    res.sendFile(path.join(__dirname, 'html', 'perfil.html'));
});

//fim do codigo
app.listen(port, hostname, (error) => {
    console.log(`Node server running on http://${hostname}:${port}/`);
});