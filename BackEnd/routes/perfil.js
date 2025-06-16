//Requesitos do express
const express = require('express');
const usersController = require('../controller/users.controller.js');
const authController = require("../controller/auth.controller.js");

const router = express.Router();

router.post('/', usersController.create); //PUBLIC
router.get('/', usersController.geAllUsers, authController.verifyToken); //para ADMS

// routes for /users requests
router.get('/:id',authController.verifyToken, usersController.getUser ); // get all infus about users
router.put('/:id', usersController.modUser);

router.post('/login', authController.login); //PUBLIC

module.exports = router;