const pessoaModel = require('../models/pessoaModel');

module.exports = {
    createPessoa: async (req, res) => {
        try {
            const idUsuario = req.locals.id
            if(!idUsuario) throw new Error('Sem idUsuario');

            const data = req.body;
            data.registradores_id = idUsuario;
        
            await pessoaModel.createPessoa(data);
      
            res.status(200).json({msg: "Pessoa cadastrada com sucesso!"})
        } catch (error) {
            res.status(500).json({msg: error.message})
        }
    },
    getPessoaById: async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            if(!id) throw new Error('Sem id');
            const result = await  pessoaModel.getPessoaById(id);
            res.status(200).json({msg: "Consulta realizada com sucesso", result})

        } catch (error) {
            res.status(500).json({msg: error.message})
        }
    },
    getPessoaByOffset: async (req, res) => {
        try {
            const offset = parseInt(req.params.offset || 1);
            const limit = parseInt(req.query.limit || 10);
            const result = await pessoaModel.getPessoaByOffset(offset, limit);
            res.status(200).json({msg: "Consulta realizada com sucesso", result})
            
        } catch (error) {
            res.status(500).json({msg: error.message})
        }
    },
    updatePessoa: (req, res) => {
        try {
            const id = req.params.id;
            const newData = req.body;

        } catch (error) {
            res.status(500).json({msg: error.message})
        }
    },
    deletePessoa: async (req, res) => {
        try {
            const id = req.params.id;
            const result = await pessoaModel.deletePessoa(id);
            res.status(200).json({msg: "Pessoa removida com sucesso!"});

    

        } catch (error) {
            res.status(500).json({msg: error.message})
        }
    },
}

//createPessoa
//getPessoaById
//getAllPessoas
//updatePessoa
//deletePessoa
//getPessoasByOffset
