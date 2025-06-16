const express = require('express');
const router = express.Router();
const authController = require("../controller/auth.controller.js");

const atividadeController = require('../controller/atividade.controller.js');

router.get('/', atividadeController.All_Acts_get );
router.post('/', authController.verifyToken, atividadeController.Add_Act_post);

router.get('/:id', atividadeController.Act_Infus_get );
router.put('/:id', authController.verifyToken, atividadeController.ModifyActivity );
router.delete('/:id', authController.verifyToken, atividadeController.deleteAct );

router.get('/ins/:id', authController.verifyToken, atividadeController.getInsc)
//router.post('/ins/:id', authController.verifyToken, atividadeController.)
//router.delete('/ins/:id', authController.verifyToken, atividadeController.)

module.exports = router;