const express = require('express');
const router = express.Router();
const authController = require('../../controllers/authController');

//MIDDLEWARES
const checkLogin = (req, res, next) =>{
    try {
        const {login, password} = req.body;
        if (!login || !password) throw new Error('Login ou senha inválidos');
        next()
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}

//ROTAS REGISTRADORES
router.post('/login', checkLogin, authController.login); 
router.get('/logout', authController.logout); 

module.exports = router;