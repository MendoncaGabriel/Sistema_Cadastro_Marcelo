const express = require('express');
const router = express.Router();


// Controllers
const authController = require('../controllers/authController')


//ROTAS REGISTRADORES
router.post('/login', authController.login); 
router.get('/logout', authController.logout); 






module.exports = router;
