const registradorModel = require('../models/registradorModel');

module.exports = {
    create: async (req, res) => { 
        try {
            const {login, password, name, email} = req.body;
            const registradorExists = await registradorModel.existing(login, name, email);
            if(registradorExists) throw new Error('Registrador ja cadastrado verifique login, nome e email');
            const {insertId} = await registradorModel.create(login, password, name, email, req.locals.id);
            if(typeof insertId != 'number' || !insertId) throw new Error('Falha ao registar novo usuario registrador!');
            res.status(200).json({msg: 'Registrador salvo com sucesso!'});
        } catch (error) {
            res.status(500).json({msg: error.message});
        }
    },
    getByOffset: async (req, res) => {
        try {            
            req.query.offset || 0;
            req.query.limit || 100;
            const result = await registradorModel.getByOffset(offset, limit);
            res.status(200).json({msg: "Registradores pegos via lista offset", result});
        } catch (error) {
            res.status(500).json({msg: "Erro ao pegar registrador", error: error.message});
        }
    },
    getById: async (req, res) => {
        try {            
            const id = req.params.id;
            const result = await registradorModel.getById(id);
            res.status(200).json({msg: "Registrador pego com sucesso!", result});
        } catch (error) {
            res.status(500).json({msg: "Erro ao pegar registrador", error:error.message});
        }
    },
    update: async (req, res) => { 
        try {
            const id = req.params.id;
            const {login, password, name, email} = req.body;
            if(login == "admin") throw new Error("Não e possivel alterar este usuário!");

            console.log("passou!")

            return 
            await registradorModel.update(login, password, name, email, id);
            res.status(200).json({msg: 'Registrador atualizado com sucesso!'});
        } catch (error) {
            res.status(500).json({msg: error.message});
        }
    },
    delete: async (req, res) => {
        try {
            const id = req.params.id;
            await registradorModel.delete(id);
            res.status(200).json({msg: "usuario registrador foi removido"});
        } catch (error) {
            res.status(500).json({msg: error.message})
        }
    }
}
