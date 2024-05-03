const jwt = require('../utilities/jwt');

async function checkAuth(req, res, next){
    const authorizationHeaders = req.headers.authorization;
    const token = authorizationHeaders.split(' ')[1];


    //verificar se possue token
    if(!token || token == 'undefined') return res.status(401).json({msg: 'Acesso negado!, sem token'});

    //verificar se token e valido
    const checkToken = await jwt.validateToken(token);
    if(checkToken.valid == false) return res.status(401).json({msg: 'Acesso negado!, token invalido'});
    console.log(checkToken.decoded.typeUser )

    //verificar se token e de admin
    if(checkToken.decoded.typeUser != 'ADMIN') return res.status(401).json({msg: 'Acesso negado!, token invalido'});

    console.log({msg: 'Acesso Autorizado, usuario admin'});

    const id = checkToken.decoded.id;
    const name = checkToken.decoded.name;

    //SALVANDO NA REQUISIÇÃO INFORMAÇÕES DO USUARIO
    req.locals = {
        id: id,
        name: name,
        type: 'ADMIN'
    };


    next();
};

module.exports = checkAuth;