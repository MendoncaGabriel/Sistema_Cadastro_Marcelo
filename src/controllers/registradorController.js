const registradorModel = require('../models/registradorModel');

module.exports = {

    updateRegistrador: async (req, res) => { 
        try {
            const id = req.params.id
            if(!id) throw new Error('Id do registrador não foi informado')
            const {login, password, name, email} = req.body;
            if(!login || !password || !name ) throw new Error('Os campos (login, password, name) são obrigatorios!');
            
           
            await registradorModel.updateRegistrador(login, password, name, email, id);
         
            res.redirect('/cadastro-registrador?stattus="ok"&msg="success"')
        } catch (error) {
            console.error('===> ',error)
            res.redirect(`/cadastro-registrador?status=error&msg=${encodeURIComponent(error.message)}`);
        }
    },
    createRegistrador: async (req, res) => { 
        try {
            const {login, password, name, email} = req.body;
            if(!login || !password || !name ) throw new Error('Os campos (login, password, name) são obrigatorios!');
            
            const id_admin = req.locals.id;
            const {insertId} = await registradorModel.createRegistrador(login, password, name, email, id_admin);
    
            if(typeof insertId != 'number' || !insertId) throw new Error('Falha ao registar novo usuario registrador!');
            

            res.redirect('/cadastro-registrador?stattus="ok"&msg="success"')
        } catch (error) {
            console.log(error)
            res.redirect(`/cadastro-registrador?stattus="error"&msg="${error.message}"`)
        }
    },

    removerRegistrador: async (req, res) => {
        try {
            const id = req.params.id
            if(!id) throw new Error('Id não fornecido');
            await registradorModel.removerRegistrador(id);
            res.status(200).json({msg: "usuario registrador foi removido"});
            
        } catch (error) {
            console.log(error)
            res.status(500).json({msg: error.message})
        }
    },
    getById: async (req, res) => {
        try {            
            const id = req.params.id;
            if(!id) throw new Error('Id não foi passado');
            const result = await registradorModel.getById(id);
            res.status(200).json({msg: "Registrador pego com sucesso!", result});
        } catch (error) {
            console.log(error)
            res.status(500).json({msg: "Erro ao pegar registrador"})
        }
    },

}



