const authModel = require('../../models/registrador/auth');


module.exports = {

    login:  async (req, res) => { 
        try {
            const {login, password} = req.body;
            if(!login || !password) return res.status(400).json({msg: 'Login e password são obrigatorios!'});
            const result = await authModel.login(login, password);
    

            res.status(200).json({msg: 'Usuario logado com sucesso!', token: result.token})
        } catch (error) {
            console.log(error)
            res.status(404).json({msg: error.message})
        }
    }
    
}



