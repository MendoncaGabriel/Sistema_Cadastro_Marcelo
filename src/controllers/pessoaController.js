const pessoaModel = require('../models/pessoaModel');

module.exports = {
    createPessoa: async (req, res) => {
        try {
            console.log('cadastrando pessoa')
            const idUsuario = req.locals.id
            if(!idUsuario) throw new Error('Sem idUsuario');

            const data = req.body;
            data.registrador_id = idUsuario;
        
            await pessoaModel.createPessoa(data);
      
            res.status(200).json({msg: "Pessoa cadastrada com sucesso!"})
        } catch (error) {
            res.status(500).json({msg: error.message})
        }
    },
    getPessoaByRegistradorId: async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            if(!id) throw new Error('Sem id');
            const result = await  pessoaModel.getPessoaByRegistradorId(id);
            res.status(200).json({msg: "Consulta realizada com sucesso", result});
        } catch (error) {
            res.status(500).json({msg: error.message});
        };
    },
    getPessoasByData: async (req, res) => {
        try {
            const regexData = /^\d{4}-\d{2}-\d{2}$/;
            const data = req.params.data;

            if (!regexData.test(data)) {
                console.log('');
                throw new Error("A data não está no formato correto. YYYY-MM-DD")
            } 

            const result = await  pessoaModel.getPessoasByData(data);
            res.status(200).json({msg: "Consulta realizada com sucesso", result})

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
            res.status(200).json({msg: "Consulta realizada com sucesso", result});
        } catch (error) {
            res.status(500).json({msg: error.message})
        }
    },
    updatePessoa: async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            if(!id) throw new Error('Sem id');
            const data = req.body;
            await pessoaModel.updatePessoa(id, data);
            res.status(200).json({msg: "Pessoa atualizada com sucesso!"});
        } catch (error) {
            res.status(500).json({msg: error.message});
        };
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
