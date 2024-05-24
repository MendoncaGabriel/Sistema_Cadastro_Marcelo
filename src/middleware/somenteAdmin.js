const somenteAdmin = (req, res, next)=>{
    const admin = req.locals.admin;
    if(admin !== 1) return res.status(401).json({msg: "Não Autorizado, somente admin"});
    next();
}

module.exports = somenteAdmin;