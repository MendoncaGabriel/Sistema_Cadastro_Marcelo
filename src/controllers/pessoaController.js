const pessoaModel = require('../models/pessoaModel');

module.exports = {
    create: async (req, res) => {
        // referente a pagina publica
        try {
                // Obter a URL completa
                const fullUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`;

                // Para obter o parâmetro 'ref'
                const ref = req.query.ref;
                console.log(ref, fullUrl)//dando undefined

            const data = req.body;

            // pegar id do usuario
            const regex = /^(\d{1,3})-/;
            const match = ref.match(regex);
            const usuarios_id = match[1];

            await pessoaModel.create(data, usuarios_id);
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
            const pessoa_id = parseInt(req.params.id);
            const usuario_id = parseInt(req.locals.id);
            const data = req.body
            console.log(pessoa_id, usuario_id)
 
     
            const result = await pessoaModel.update(pessoa_id,usuario_id, data);
            console.log(result)
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