const jwt = require('jsonwebtoken');
require('dotenv').config();



async function checkAuth(req, res, next){
    try {
        const {token} = req.cookies;
        const secret_jwt =  process.env.SECRET_JWT;
        if(!secret_jwt) throw new Error("SECRET_JWT não definido em .env");
        if(!token) throw new Error('Sem token de acesso');

        //verificar se possue token
        if(!token || token == 'undefined') throw new Error('Acesso negado!, sem token');

        //verificar se token e valido
        const checkToken = await jwt.verify(token, secret_jwt);
        if(checkToken.valid == false) throw new Error('Acesso negado!, token invalido');


        //SALVANDO NA REQUISIÇÃO INFORMAÇÕES DO USUARIO
        req.locals = {
            id: checkToken.id || checkToken?.typeUser == 'admin' ? 1 : null,
            typeUser: checkToken?.typeUser
        };

        next();
        
    } catch (error) {
        console.log("===> Error: ", error.message)
        res.redirect('/login')  
    }
};


module.exports = checkAuth;