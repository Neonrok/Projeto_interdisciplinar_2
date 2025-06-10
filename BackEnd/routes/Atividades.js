const express = require('express');
const router = express.Router();

const atividadeController = require('../controller/atividade.controller.js');

router.get('/', atividadeController.All_Acts_get );
router.get('/:id', atividadeController.Act_Infus_get );

module.exports = router;