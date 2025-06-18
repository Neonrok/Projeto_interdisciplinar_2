const express = require('express');
const renController = require('../controller/Ren.controller.js');
const authController = require("../controller/auth.controller.js");

const router = express.Router();

router.get('/', authController.verifyToken, renController.allrens)
router.post('/', authController.verifyToken, renController.addRen)

router.get('/:id', authController.verifyToken, renController.getRen)
router.put('/:id', authController.verifyToken, renController.modRen)
router.delete('/:id', authController.verifyToken, renController.delRen)

module.exports = router;