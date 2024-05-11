

const adminModel = require('../models/adminModel');

module.exports = {

    novoRegistrador: async (req, res) => { 
        try {
            const {login, password, name, email} = req.body;
            if(!login || !password || !name || !email) return res.status(400).json({msg: 'Os campos (login, password, name, email) são obrigatorios!'});
            
            const id_admin = req.locals.id;
            const result = await adminModel.novoRegistrador(login, password, name, email, id_admin);
            const insertId = result?.insertId;

            if(typeof insertId != 'number' || !insertId) {
                return res.status(400).json({msg: 'Falha ao registar novo usuario registrador!'});
            };
    
            res.status(200).json({msg:'Novo usuario registrado com sucesso!', insertId: insertId});
        } catch (error) {
            console.log(error)
            res.status(500).json({msg: error.message})
        }
    },

    removerRegistrador: async (req, res) => {
        try {
            const id = req.params.id
            const result = await adminModel.removerRegistrador(id);
            console.log(result)
            res.status(200).json({msg: "usuario registrador foi removido"})
            
        } catch (error) {
            console.log(error)
            res.status(500).json({msg: error.message})
        }
    }
}


