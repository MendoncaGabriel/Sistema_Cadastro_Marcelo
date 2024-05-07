const express = require('express');
const router = express.Router();

// Controllers
const adminController = require('../../controllers/admin/admin');

// Middlewares
const checkAuthAdmin = require('../../middleware/checkAuth');

// Rotas
router.post('/novo-registrador', checkAuthAdmin, adminController.novoRegistrador); 
router.delete("/remover-registrador/:id", checkAuthAdmin, adminController.removerRegistrador)



module.exports = router;