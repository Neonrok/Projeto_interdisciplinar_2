const express = require('express');
const authController = require("../controller/auth.controller.js");
const RellController = require('../controller/Rel.controller.js');

const router = express.Router();

router.get('/', authController.verifyToken, RellController.getAll);
router.put('/act/:id', authController.verifyToken);
router.put('/rel/:id', authController.verifyToken);

module.exports = router;