const somenteAdmin = (req, res, next)=>{ //varificar nivel de acesso de usuario
    const userType = req?.locals?.userType 
    if(userType == "admin"){
        next();
        console.log("usuario admin autorizado");
    }else{
        console.log("usuario não tem nivel de acesso para acessar rota")
        res.status(401).json({msg: "Não Autorizado"});
    };
}
module.exports = somenteAdmin;