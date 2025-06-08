//API Express requesitos
const express = require('express');
require('dotenv').config();

//comfiguração basica da express
const app = express();
const host = process.env.HOST;
const port = process.env.PORT || 3000;

app.use(express.json());


//Este é o inicio de toda o ordem da API aqui que vai começar a api rest
app.use((req, res, next) => {
    const start = Date.now();
    res.on("finish", () => {
        const diffSeconds = (Date.now() - start) / 1000;
        console.log(`Request: ${req.method} ${req.originalUrl} completed in ${diffSeconds} seconds`);
    });
    next()
})

//para fazer os verbos do post
app.use('/Users', require('./routes/perfil.js'));







//Base da API REST que redireciona para outro arquivo com base nas rotas
//Rota dos parametros do /users
app.use('/users', require('./routes/perfil.js'));

//Caso não seja encontrado manda o erro404    
app.use((req, res, next) => {
    res.status(404).json({ message: `The requested resource was not found: ${req.method} ${req.originalUrl}` });
});

//Outros erros que podem aparecer
app.use((err, req, res, next) => {
    // !Uncomment this line to log the error details to the server console!
    console.error(err);

    // error thrown by express.json() middleware when the request body is not valid JSON
    if (err.type === 'entity.parse.failed')
        return res.status(400).json({ error: 'Invalid JSON payload! Check if your body data is a valid JSON.' });

    // Sequelize validation errors (ALL models)
    if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
        return res.status(400).json({
            error: 'Validation error',
            details: err.errors.map(e => ({
                field: e.path,
                message: e.message
            }))
        });
    }

    // SequelizeDatabaseError related to an invalid ENUM value (USERS table -> role field)
    if (err.name === 'SequelizeDatabaseError') {
        if (err.original.code === 'ER_CHECK_CONSTRAINT_VIOLATED') {
            return res.status(400).json({
                error: 'Invalid value for enumerated field',
                message: err.message
            });
        }
        if (err.original.code === 'ER_BAD_NULL_ERROR') {
            return res.status(400).json({
                error: 'Missing mandatory field',
                message: err.message
            });
        }
        if (err.original.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({
                error: 'Duplicate entry',
                message: err.message
            });
        }
    }
    // other errors
    res.status(err.statusCode || 500).json({ error: err.message || 'Internal Server Error' });
});

//fim do codigo
app.listen(port, host, (error) => {
    console.log(`Node server running on http://${host}:${port}/`);
});