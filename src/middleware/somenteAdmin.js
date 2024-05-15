const somenteAdmin = (req, res, next)=>{
    const typeUser = req?.locals?.typeUser 
    if(typeUser == "admin"){
        req.locals.typeUser = 'admin'
        next();
    }else{
        req.locals.typeUser = 'registrador'
        res.status(401).json({msg: "Não Autorizado, somente admin"});
    };
}
module.exports = somenteAdmin;