const express = require('express');
const router = express.Router();
const pessoaController = require('../controllers/pessoaController');

router.post('/cadastro', pessoaController.cadastro);


module.exports = router