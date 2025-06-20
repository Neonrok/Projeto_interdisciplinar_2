//Requesitos do express
const express = require('express');
const usersController = require('../controller/users.controller.js');
const authController = require("../controller/auth.controller.js");

const router = express.Router();

router.post('/', usersController.create); //PUBLIC
router.get('/', authController.verifyToken, usersController.geAllUsers); //para ADMS

// routes for /users requests
router.get('/:id', authController.verifyToken, usersController.getUser ); // get all infus about users
router.put('/:id', authController.verifyToken, usersController.modUser);
router.delete('/:id', authController.verifyToken, usersController.deleteUser);

router.post('/login', authController.login); //PUBLIC
router.get('/login/verify', authController.verifyToken, usersController.getId );

module.exports = router;