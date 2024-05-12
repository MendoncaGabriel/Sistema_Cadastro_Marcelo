const express = require('express');
const router = express.Router();

// Controllers
const registradorController = require('../controllers/registradorController');

// Middlewares
const checkAuth = require('../middleware/checkAuth');
const somenteAdmin = require('../middleware/somenteAdmin')

router.use(checkAuth) 
router.use(somenteAdmin)



// Rotas
router.get('/getById/:id', registradorController.getById); 
router.post('/create', registradorController.createRegistrador); 
router.delete("/remove/:id", registradorController.removerRegistrador);
router.post("/update/:id", registradorController.updateRegistrador);



module.exports = router;