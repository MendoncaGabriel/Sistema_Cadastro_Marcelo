const jwt = require('jsonwebtoken');
require('dotenv').config();
const secret_jwt =  process.env.SECRET_JWT;
if(!secret_jwt) console.log("SECRET_JWT não definido em .env");


async function checkAuth(req, res, next){
    try {
        const {token} = req.cookies;
        if(!token) throw new Error('Sem token de acesso');

        //verificar se possue token
        if(!token || token == 'undefined') throw new Error('Acesso negado!, sem token');

        //verificar se token e valido
        const checkToken = await jwt.verify(token, secret_jwt);
        if(checkToken.valid == false) throw new Error('Acesso negado!, token invalido');

        //SALVANDO NA REQUISIÇÃO INFORMAÇÕES DO USUARIO
        req.locals = {
            id: checkToken.id || null,
            userType: checkToken?.userType
        };
        next();
        
    } catch (error) {
        console.log("===> Error: ", error.message)
        res.redirect('/login')  
    }
};


module.exports = checkAuth;