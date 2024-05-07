const jwt = require('jsonwebtoken');
require('dotenv').config();
const secret_jwt =  process.env.SECRET_JWT;

async function checkAuth(req, res, next){
    const authorizationHeaders = req.headers.authorization;
    const token = authorizationHeaders?.split(' ')[1];
    if(!authorizationHeaders || !token) return res.status(401).json({msg: 'Acesso negado!, sem token'});


    //verificar se possue token
    if(!token || token == 'undefined') return res.status(401).json({msg: 'Acesso negado!, sem token'});

    //verificar se token e valido
    const checkToken = await jwt.verify(token, secret_jwt);
    if(checkToken.valid == false) return res.status(401).json({msg: 'Acesso negado!, token invalido'});

    console.log({msg: 'Acesso Autorizado, usuario admin'});

    const id = checkToken.decoded?.id || null;
    const name = checkToken.decoded?.name || null;

    //SALVANDO NA REQUISIÇÃO INFORMAÇÕES DO USUARIO
    req.locals = {
        id: id,
        name: name,
    };


    next();
};

module.exports = checkAuth;