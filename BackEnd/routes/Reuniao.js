const express = require('express');
const renController = require('../controller/Ren.controller.js');
//const authController = require("../controller/auth.controller.js");

const router = express.Router();

router.get('/', renController.allrens)
router.post('/', renController.addRen)

//router.get('/:id', renController)

module.exports = router;