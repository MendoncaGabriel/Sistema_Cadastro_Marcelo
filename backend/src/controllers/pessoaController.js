const pessoaModel = require('../models/pessoaModel');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const secret = process.env.SECRET_JWT;

module.exports = {
    cadastro: async (req, res) => {
        try {
            // pegar autorização
            const authorizationToken = req.headers.authorization.split(" ")[1];
            if(!authorizationToken || authorizationToken.length == 0) throw new Error('Não autorizado!')
            
            const data = req.body;
            const registrador = await jwt.verify(authorizationToken, secret);
            data.usuarios_registradores_id = registrador.id
        
            await pessoaModel.novaPessoa(data);
      
            res.status(200).json({msg: "Pessoa cadastrada com sucesso!"})
        } catch (error) {
            
        }
    }
}