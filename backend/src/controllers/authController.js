const authModel = require('../models/authModel');

module.exports = {
    loginAdmin: async (req, res) => {
        try {
            const {login, password} = req.body;
            if(!login || !password) return res.status(400).json({msg: 'Login e password são obrigatorios!'});
    
            const result = await authModel.loginAdmin(login, password);
            res.status(200).json({msg: 'Usuario Admin logado com sucesso!', token: result.token})
        } catch (error) {
            res.status(401).json({msg: error.message})
        }
    },

    loginRegistrador:  async (req, res) => { 
        try {
            const {login, password} = req.body;
            if(!login || !password) return res.status(400).json({msg: 'Login e password são obrigatorios!'});
            const result = await authModel.loginRegistrador(login, password);
    

            res.status(200).json({msg: 'Usuario logado com sucesso!', token: result.token})
        } catch (error) {
            console.log(error)
            res.status(404).json({msg: error.message})
        }
    }

}