const authRegistradoresModel = require('../../models/auth/auth');



module.exports = {
    //REGISTRADOR---------------------------------------
    registradorLogin: async (req, res) => { 
        try {
            const {login, password} = req.body;
            if(!login || !password) return res.status(400).json({msg: 'Login e password são obrigatorios!'});
            const result = await authRegistradoresModel.registradorLogin(login, password);
  

            res.status(200).json({msg: 'Usuario logado com sucesso!', token: result.token})
        } catch (error) {
            console.log(error)
            res.status(404).json({msg: error.message})
        }
    },
    registradorSignup: async (req, res) => { 
        try {
            const {login, password, name, email} = req.body;
            if(!login || !password || !name || !email) return res.status(400).json({msg: 'Os campos (login, password, name, email) são obrigatorios!'});
            const id_admin = req.locals.id;
            const result = await authRegistradoresModel.registradorSignup(login, password, name, email, id_admin);
            const insertId = result.insertId;

            if(typeof insertId != 'number' || !insertId) {
                return res.status(400).json({msg: 'Falha ao registar novo usuario registrador!'});
            };
    
            res.status(200).json({msg:'Novo usuario registrado com sucesso!', insertId: insertId});
        } catch (error) {
            console.log(error)
            res.status(404).json({msg: error.message})
        }
    },


    //ADMIN---------------------------------------------
    loginAdmin: async (req, res) => {
        const {login, password} = req.body;
        if(!login || !password) return res.status(400).json({msg: 'Login e password são obrigatorios!'});

        const result = await authRegistradoresModel.loginAdmin(login, password);
        res.status(200).json({msg: 'Usuario Admin logado com sucesso!', token: result.token})
    },
    signupAdmin: async (req, res) => {
        try {
            const {login, password, name, email} = req.body;
            if(!login || !password || !name || !email) return res.status(400).json({msg: 'Os campos (login, password, name, email) são obrigatorios!'});
            
            const result = await authRegistradoresModel.signupAdmin(login, password, name, email);
            const insertId = result.insertId;

            if(typeof insertId != 'number' || !insertId) {
                return res.status(400).json({msg: 'Falha ao registar novo usuario registrador!'});
            };
    
            res.status(200).json({msg:'Novo usuario Admin registrado com sucesso!', insertId: insertId});
        } catch (error) {
            console.log(error)
            res.status(404).json({msg: error.message})
        }
    },
}