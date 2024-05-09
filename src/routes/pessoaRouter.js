const express = require('express');
const router = express.Router();
const pessoaController = require('../controllers/pessoaController');
const checkAuth = require('../middleware/checkAuth');

router.post('/', checkAuth, pessoaController.createPessoa);
router.get('/offset/:offset', checkAuth, pessoaController.getPessoaByOffset);
router.get('/:id', checkAuth, pessoaController.getPessoaById);
router.patch('/:id', checkAuth, pessoaController.updatePessoa);
router.delete('/:id', checkAuth, pessoaController.deletePessoa);



module.exports = router;