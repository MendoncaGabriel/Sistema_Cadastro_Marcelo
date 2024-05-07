const express = require('express');
const router = express.Router();


// Controllers
const adminController = require('../../controllers/admin/admin');
const registradorController = require('../../controllers/registrador/registrador');



//ROTAS REGISTRADORES
router.post('/login', registradorController.login); 

//ROTAS ADMIN
router.post('/admin/login', adminController.login); 




module.exports = router;
