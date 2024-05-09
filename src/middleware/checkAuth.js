const jwt = require('jsonwebtoken');
require('dotenv').config();
const secret_jwt =  process.env.SECRET_JWT;
if(!secret_jwt) console.log("SECRET_JWT não definido em .env");

async function checkAuth(req, res, next){
    const authorizationHeaders = req.headers.authorization;
    const token = authorizationHeaders?.split(' ')[1];
    if(!authorizationHeaders || !token) return res.status(401).json({msg: 'Acesso negado!, sem token'});

    //verificar se possue token
    if(!token || token == 'undefined') return res.status(401).json({msg: 'Acesso negado!, sem token'});

    //verificar se token e valido
    try {
        const checkToken = await jwt.verify(token, secret_jwt);
        console.log(checkToken)
        if(checkToken.valid == false) return res.status(401).json({msg: 'Acesso negado!, token invalido'});
        console.log({msg: 'Acesso Autorizado'});

        //SALVANDO NA REQUISIÇÃO INFORMAÇÕES DO USUARIO
        req.locals = {
            id: checkToken.id || null,
            userType: checkToken?.userType
        };
        next();
        
    } catch (error) {
        console.log("===> Error: ", error.message)
        res.status(401).json({msg: "Não Autorizado"})
    }
};

module.exports = checkAuth;