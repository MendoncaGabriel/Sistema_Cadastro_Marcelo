const express = require('express');
const router = express.Router();
const pessoaController = require('../controllers/pessoaController');
const checkAuth = require('../middleware/checkAuth');

router.post('/create', checkAuth, pessoaController.createPessoa);
router.get('/offset/:offset', checkAuth, pessoaController.getPessoaByOffset);
router.get('/:id', checkAuth, pessoaController.getPessoaById);
router.patch('/:id', checkAuth, pessoaController.updatePessoa);
router.delete('/:id', checkAuth, pessoaController.deletePessoa);
router.get('/registrador/:id', checkAuth, pessoaController.getPessoaByRegistradorId);
router.get('/data/:data', checkAuth, pessoaController.getPessoasByData);



module.exports = router;