const pessoaModel = require('../models/pessoaModel');

module.exports = {
    cadastro: async (req, res) => {
        const idUsuario = req.locals.id
        console.log(idUsuario)
        try {
            const data = req.body;
            data.registradores_id = idUsuario;
        
            await pessoaModel.novaPessoa(data);
      
            res.status(200).json({msg: "Pessoa cadastrada com sucesso!"})
        } catch (error) {
            res.status(500).json({msg: error.message})
        }
    }
}