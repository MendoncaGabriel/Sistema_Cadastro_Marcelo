const express = require('express');
const router = express.Router();
const pessoaController = require('../controllers/pessoaController');
const checkAuth = require('../middleware/checkAuth');

router.post('/cadastro', checkAuth, pessoaController.cadastro);


module.exports = router;