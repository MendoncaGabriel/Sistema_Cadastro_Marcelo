const express = require('express');
const router = express.Router();
const routerController = require('../../controllers/auth/auth');
const checkAuth = require('../../middleware/checkAuth');
const checkAuthAdmin = require('../../middleware/checkAuthAdmin');

//REGISTRADORES---------------------------------------------------
router.post('/login', routerController.registradorLogin); 


//ADMIN-----------------------------------------------------------
router.post('/admin/login', routerController.loginAdmin); 
router.post('/admin/signup', checkAuthAdmin, routerController.signupAdmin); 
router.post('/admin/novo-registrador', checkAuthAdmin, routerController.registradorSignup); 


//TESTES------------------------------------------------------------
router.get('/teste', checkAuth, (req, res) => {
    res.send('logado')
})

module.exports = router;
