const express = require('express');
const router = express.Router();

// Controllers
const adminController = require('../controllers/adminController');

// Middlewares
const checkAuth = require('../middleware/checkAuth');
router.use(checkAuth) //verificar token de autorização 
router.use((req, res, next)=>{ //varificar nivel de acesso de usuario
    const userType = req?.locals?.userType 
    if(userType == "admin"){
        next();
        console.log("usuario admin autorizado");
    }else{
        console.log("usuario não tem nivel de acesso para acessar rota")
        res.status(401).json({msg: "Não Autorizado"});
    };
});


// Rotas
router.post('/novo-registrador', adminController.novoRegistrador); 
router.delete("/remover-registrador/:id", adminController.removerRegistrador)



module.exports = router;