const express = require('express');
const router = express.Router();
const pageController = require('../../controllers/pageController');

// Middlewares
const checkAuth = require('../../middleware/checkAuth');
const somenteAdmin = require('../../middleware/somenteAdmin')

router.get('/login', pageController.login);

//Protegidos
router.get('/', checkAuth, pageController.home);
router.get('/cadastro-registrador', checkAuth, somenteAdmin,  pageController.cadastroRegistrador);
router.get('/cadastro-pessoa', checkAuth, pageController.cadastroPessoa);
router.get('/pessoas-cadastradas', checkAuth, pageController.getPessoaByOffset);
router.get('/editar-pessoa', checkAuth, pageController.updatePessoa);

module.exports = router;
