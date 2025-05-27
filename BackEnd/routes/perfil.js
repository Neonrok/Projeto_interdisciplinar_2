//Requesitos do express
const express = require('express');
const router = express.Router();


//Perguntar sobre isto para a professora

//pelo que eu entendi a rota estaria agora no /user e por
//isso agora faz é para escolher que tipo de rota está a escolner.

//Função de controlo
const usersController = require('../controller/users.controller.js');

// routes for /users requests
router.get('/:id', usersController.getInfosFromUser); // get all infus about users

module.exports = router;