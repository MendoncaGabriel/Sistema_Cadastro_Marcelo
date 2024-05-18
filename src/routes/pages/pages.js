const express = require('express');
const router = express.Router();
const pageController = require('../../controllers/pageController');

// Middlewares
const checkAuth = require('../../middleware/checkAuth');
const somenteAdmin = require('../../middleware/somenteAdmin');

// Rota para login, não protegida
router.get('/login', pageController.login);

// Rotas protegidas
router.get('/cadastro-pessoa', checkAuth, pageController.cadastroPessoa); // Lida com parâmetros de consulta
router.get('/', checkAuth, pageController.home);
router.get('/cadastro-registrador', checkAuth, somenteAdmin, pageController.cadastroRegistrador);
router.get('/pessoas-cadastradas', checkAuth, pageController.getByOffset);
router.get('/editar-pessoa', checkAuth, pageController.updatePessoa);

module.exports = router;
