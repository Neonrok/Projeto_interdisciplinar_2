const express = require('express');
const router = express.Router();

const atividadeController = require('../controller/atividade.controller.js');

router.get('/', atividadeController.All_Acts_get );
router.post('/', atividadeController.Add_Act_post);

router.get('/:id', atividadeController.Act_Infus_get );
router.put('/:id', atividadeController.ModifyActivity );
router.delete('/:id', atividadeController.deleteAct );

module.exports = router;