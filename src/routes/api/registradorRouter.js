const express = require('express');
const router = express.Router();
const registradorController = require('../../controllers/registradorController');

// Middlewares
const checkAuth = require('../../middleware/checkAuth');
const somenteAdmin = require('../../middleware/somenteAdmin');

router.use(checkAuth);
router.use(somenteAdmin);

//MIDDLEWARES
function checkRouterCreate(req, res, next){
    try { 
        // validar campos
        const {login, password, name} = req.body;
        const faltando = '';
        if(!login) faltando += ' login';
        if(!password) faltando += ' password';
        if(!name) faltando += ' name';
        if(!login || !password || !name ) throw new Error(`Esta faltando:${faltando}`);

        //validar id
        if(!req.locals.id) throw new Error('campo id não informdo em req.locals.id');

        next();
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}
function checkGetById(req, res, next){
    try {
        const id = req.params.id;
        if(!id) throw new Error('Parametro id não foi passado');
        next();
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}
function checkGetByOffset (req, res, next){
    try {
        if(!req.query.offset) throw new Error('Offset não informado');
        next();
    } catch (error) {
        res.status(400).json({msg: error.message}); 
    };
}
function checkUpdate(req, res, next){
    try {
        const id = req.params.id
        if(!id) throw new Error('Parametro id não foi passado');

        const {login, password, name, email} = req.body;
        const faltando = '';
        if(!login) faltando += ' login';
        if(!password) faltando += ' password';
        if(!name) faltando += ' name';
        if(!email) email += ' email';
        if(!login || !password || !name ) throw new Error(`Esta faltando:${faltando}`);

        next()
    } catch (error) {
        console.log(error)
        res.status(400).json({msg: error.message})
    }
}
function checkDelete(req, res, next){
    try {
        const id = req.params.id;
        if(!id) throw new Error('Id não fornecido');
        next()
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}

//RORAS
router.post('/create', checkRouterCreate, registradorController.create); 
router.get('/getById/:id', checkGetById,registradorController.getById); 
router.get('/getByOffset/:id',checkGetByOffset, registradorController.getByOffset); 
router.patch("/update/:id", checkUpdate, registradorController.update);
router.delete("/delete/:id",checkDelete, registradorController.delete);

module.exports = router;