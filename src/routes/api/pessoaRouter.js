const express = require('express');
const router = express.Router();
const pessoaController = require('../../controllers/pessoaController');
const checkAuth = require('../../middleware/checkAuth');

// MIDDLEWARES
function checkCreate(req, res, next){
    try {
        const idUsuario = req.locals.id;
        if(!idUsuario) throw new Error('Id não foi passado em req.locals.id');
        next();
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}
function checkDelete(req, res, next){
    try {
        const id = parseInt(req.params.id);
        if(!id) throw new Error('Parametro id não foi passado');
 
        next();
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}
function checkGetById(req, res, next){
    try {
        const id = parseInt(req.params.id);
        if(!id) throw new Error('Parametro id não foi passado');
        next();
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}
function checkGetByDate(req, res, next){
    try {
        const data = req.params.data;
        if(!date) throw new Error('Parametro date não foi passado');

        const regexData = /^\d{4}-\d{2}-\d{2}$/;
        if (!regexData.test(data)) {
            throw new Error("A data não está no formato correto. YYYY-MM-DD")
        } 

        next();
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}
function checkGetByOffset(req, res, next){
    try {
        const offset = req.query.offset
        if(!offset) throw new Error('Query offset não foi passado!')
 
        next();
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}
function checkGetByRegistradorId(req, res, next){
    try {
        const id = parseInt(req.params.id);
        if(!id) throw new Error('Parametro id não foi passado');
 
        next();
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}
function checkUpdate(req, res, next){
    try {
        const id = parseInt(req.params.id);
        if(!id) throw new Error('Parametro id não foi passado');

        const {nome, telefone, email, zona, secao, cpf, rg, rua, bairro, cep, data_nascimento, numero, complemento, cidade, estado, pais, registrador_id} = req.body;
        let faltando = '';
        if(!nome) faltando += ' nome';
        if(!telefone) faltando += ' telefone';
        if(!email) faltando += ' email';
        if(!zona) faltando += ' zona';
        if(!secao) faltando += ' secao';
        if(!cpf) faltando += ' cpf';
        if(!rg) faltando += ' rg';
        if(!rua) faltando += ' rua';
        if(!bairro) faltando += ' bairro';
        if(!cep) faltando += ' cep';
        if(!data_nascimento) faltando += ' data_nascimento';
        if(!numero) faltando += ' numero';
        if(!complemento) faltando += ' complemento';
        if(!cidade) faltando += ' cidade';
        if(!pais) faltando += ' pais';
        if(!estado) faltando += ' estado';
        if(!registrador_id) faltando += ' registrador_id';

        if(faltando !== '') throw new Error('Esta faltando:' + faltando)
 
        next();
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}

// ROTAS
router.post('/create', checkAuth, checkCreate, pessoaController.create);
router.get('/getById/:id', checkAuth, checkGetById, pessoaController.getById);
router.get('/getByDate/:data', checkAuth, checkGetByDate, pessoaController.getByDate);
router.get('/getByOffset', checkAuth, checkGetByOffset, pessoaController.getByOffset);
router.get('/getByRegistradorId/:id', checkAuth, checkGetByRegistradorId, pessoaController.getByRegistradorId);
router.patch('/update/:id', checkAuth, checkUpdate, pessoaController.update);
router.delete('/delete/:id', checkAuth, checkDelete, pessoaController.delete);

module.exports = router;