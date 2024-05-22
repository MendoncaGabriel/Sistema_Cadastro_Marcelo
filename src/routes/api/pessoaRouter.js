const express = require('express');
const router = express.Router();
const pessoaController = require('../../controllers/pessoaController');
const checkAuth = require('../../middleware/checkAuth');

// MIDDLEWARES
function checkCreate(req, res, next){
    try {
        const {nome, telefone, zona, secao} =  req.body;
        if (!nome) throw new Error("Sem nome");
        if (!telefone) throw new Error("Sem telefone");
        if (!zona) throw new Error("zona não informada");
        if (!secao) throw new Error("Sem secao");
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

        const {nome, telefone, zona, secao, registrador_id} = req.body;
        let faltando = '';
        if(!nome) faltando += ' nome';
        if(!telefone) faltando += ' telefone';
       
        if(!zona) faltando += ' zona';
        if(!secao) faltando += ' secao';
    

        if(faltando !== '') throw new Error('Esta faltando:' + faltando)
 
        next();
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}

// ROTAS
router.post('/create',  checkCreate, pessoaController.create); //pagina publica
router.get('/getById/:id', checkAuth, checkGetById, pessoaController.getById);
router.get('/getByDate/:data', checkAuth, checkGetByDate, pessoaController.getByDate);
router.get('/getByOffset', checkAuth, checkGetByOffset, pessoaController.getByOffset);
router.get('/getByRegistradorId/:id', checkAuth, checkGetByRegistradorId, pessoaController.getByRegistradorId);
router.get('/getByZona/:zona', checkAuth, pessoaController.getByZona);
router.get('/getBySecao/:secao', checkAuth, pessoaController.getBySecao);
router.get('/getByName/:name', checkAuth, pessoaController.getByName);
router.patch('/update/:id', checkAuth, checkUpdate, pessoaController.update);
router.delete('/delete/:id', checkAuth, checkDelete, pessoaController.delete);

module.exports = router;