const express = require('express');
const router = express.Router();
const pageController = require('../../controllers/pageController');

// Middlewares
const checkAuth = require('../../middleware/checkAuth');
const somenteAdmin = require('../../middleware/somenteAdmin');

// não protegida
router.get('/login', pageController.login);
router.get('/obrigado', pageController.obrigado);
router.get('/termos-de-uso', pageController.termosUso);
router.get('/politica-de-privacidade', pageController.politicaPrivacidade);

// Rotas protegidas
router.get('/', checkAuth, pageController.home);
router.get('/cadastro-pessoa', checkAuth, pageController.cadastroPessoa); // Lida com parâmetros de consulta
router.get('/cadastro-registrador', checkAuth, somenteAdmin, pageController.cadastroRegistrador);
router.get('/pessoas-cadastradas', checkAuth, pageController.pessoasCadastradas);
router.get('/editar-pessoa', checkAuth, pageController.updatePessoa);

module.exports = router;
