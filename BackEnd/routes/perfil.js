//Requesitos do express
const express = require('express');
const router = express.Router();


//Perguntar sobre isto para a professora

//pelo que eu entendi a rota estaria agora no /user e por
//isso agora faz é para escolher que tipo de rota está a escolner.

//Função de controlo
const usersController = require('../controllers/users.controller.js');

// routes for /users requests
router.get('/:id/posts', usersController.getPostsFromUser); // get all posts from a user

module.exports = router;