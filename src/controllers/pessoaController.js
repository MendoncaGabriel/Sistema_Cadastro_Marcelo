const pessoaModel = require('../models/pessoaModel');

module.exports = {
    create: async (req, res) => {
        try {
            const idUsuario = req.locals.id;
           
            const data = req.body;
            data.registrador_id = idUsuario;
        
            await pessoaModel.create(data);
      
            res.status(200).json({msg: "Pessoa cadastrada com sucesso!"});
        } catch (error) {
            res.status(500).json({msg: error.message});
        }
    },
    getById: async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            const result = await  pessoaModel.getById(id);
            res.status(200).json({msg: "Consulta realizada com sucesso", result})

        } catch (error) {
            res.status(500).json({msg: error.message})
        }
    },
    getByDate: async (req, res) => {
        try {
            const data = req.params.data;

            const result = await  pessoaModel.getByDate(data);
            res.status(200).json({msg: "Consulta realizada com sucesso", result})

        } catch (error) {
            res.status(500).json({msg: error.message})
        }
    },
    getByOffset: async (req, res) => {
        try {
            const offset = parseInt(req.query.offset || 1);
            const limit = parseInt(req.query.limit || 10);
            const result = await pessoaModel.getByOffset(offset, limit);
            res.status(200).json({msg: "Consulta offset realizada com sucesso", result});
        } catch (error) {
            res.status(500).json({msg: error.message})
        }
    },
    getByRegistradorId: async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            const result = await  pessoaModel.getByRegistradorId(id);
            res.status(200).json({msg: "Consulta realizada com sucesso", result});
        } catch (error) {
            res.status(500).json({msg: error.message});
        };
    },
    update: async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            const data = req.body;
            await pessoaModel.update(id, data);
            res.status(200).json({msg: "Pessoa atualizada com sucesso!"});
        } catch (error) {
            res.status(500).json({msg: error.message});
        };
    },
    delete: async (req, res) => {
        try {
            const id = req.params.id;
            await pessoaModel.delete(id);
            res.status(200).json({msg: "Pessoa removida com sucesso!"});
        } catch (error) {
            res.status(500).json({msg: error.message})
        }
    }
}