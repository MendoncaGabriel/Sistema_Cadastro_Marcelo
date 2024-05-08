const express = require('express');
const router = express.Router();


// Controllers
const authController = require('../controllers/authController')


//ROTAS REGISTRADORES
router.post('/login', authController.loginRegistrador); 

//ROTAS ADMIN
router.post('/admin/login', authController.loginAdmin); 




module.exports = router;
