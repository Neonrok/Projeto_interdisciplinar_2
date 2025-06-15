//Requesitos do express
const express = require('express');
const usersController = require('../controller/users.controller.js');
const authController = require("../controllers/auth.controller.js");

const router = express.Router();

router.post('/', usersController.create); //PUBLIC
router.get('/', authController.verifyToken, usersController.geAllUsers); //para ADMS

// routes for /users requests
router.get('/:id', usersController.getUser, authController.verifyToken); // get all infus about users

router.post('/login', authController.login); //PUBLIC

module.exports = router;