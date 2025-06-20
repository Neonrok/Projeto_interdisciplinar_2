const express = require('express');
const atividadeController = require('../controller/atividade.controller.js');
const authController = require("../controller/auth.controller.js");

const router = express.Router();

router.get('/', atividadeController.All_Acts_get );
router.post('/', authController.verifyToken, atividadeController.Add_Act_post);

router.get('/:id', atividadeController.Act_Infus_get );
router.put('/:id', authController.verifyToken, atividadeController.ModifyActivity );
router.delete('/:id', authController.verifyToken, atividadeController.deleteAct );

router.get('/ins/:id', authController.verifyToken, atividadeController.getInsc);
router.post('/ins', authController.verifyToken, atividadeController.AddInsc);

module.exports = router;