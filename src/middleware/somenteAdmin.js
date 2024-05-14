const somenteAdmin = (req, res, next)=>{ //varificar nivel de acesso de usuario
    const typeUser = req?.locals?.typeUser 
    if(typeUser == "admin"){
        req.locals.typeUser = 'admin'
        next();
        console.log("usuario admin autorizado");
    }else{
        req.locals.typeUser = 'registrador'
        console.log("usuario não tem nivel de acesso para acessar rota")
        res.status(401).json({msg: "Não Autorizado"});
    };
}
module.exports = somenteAdmin;