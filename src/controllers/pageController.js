const registradorModel = require('../models/registradorModel');
const pessoaModel = require('../models/pessoaModel');
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const metadataSystem = require('../models/metadataSystem');

async function getZonas() {
    const caminhoArquivo = path.resolve('src', 'public', 'arquivos', 'zonasEleitoraisAm.csv');

    return new Promise((resolve, reject) => {
        const zonas = [];

        try {            
            fs.createReadStream(caminhoArquivo)
            .pipe(csv())
            .on('data', (row) => {
                // Processar cada linha do CSV
                zonas.push(row);
            })
            .on('end', () => {
                // Resolução da Promise após a leitura completa do CSV
                resolve(zonas);
            })
            .on('error', (error) => {
                // Rejeitar a Promise em caso de erro
                console.error('Erro ao ler o arquivo CSV:', error);
                reject(error);
            });
        } catch (error) {
            reject(error);
        }
    });
};
async function getDataHome(req){
    try {
        const data = {
            admin: req.locals.admin,
            zonas: await getZonas(),
            public_id: req.locals.public_id,
            id_usuario: req.locals.id,
            name: req.locals.name,
            lengthPessoas: await metadataSystem.lengthPessoas(),
            lengthRegistradores: await metadataSystem.lengthRegistradores(),
            registradores: await registradorModel.getByOffset(0, 100),
            lestPessoas: await pessoaModel.lestPessoas(0, 10, parseInt(req.locals.id))
        }
        return data;
    } catch (error) {
        throw new Error(error)
    }
};

module.exports = {
    termosUso: (req, res) => {
        res.render('termosDeUso')
    },
    politicaPrivacidade: (req, res) => {
        res.render('politicaDePrivacidade')
    },
    obrigado: (req, res) => {
        res.render('obrigado')
    },
    login: (req, res) => {
        res.render('login')
    },
    home: async (req, res) => {
        try {
            const data = await getDataHome(req);
            res.render('home', data);
        } catch (error) {
            res.status('error', error)
        }
    },
    cadastroRegistrador: async (req, res) => {
        const offset = req.query.offset || 0;
        const limit = req.query.limit || 100;
        const registradoresByOffset = await  registradorModel.getByOffset(offset, limit);
        const status = req.query.status || null;
        const msg = req.query.msg || null;
    
        const data = {
            registradores: registradoresByOffset || [],
            status: status,
            msg: msg,
            admin: req.locals.admin,
            public_id: req.locals.public_id,
            id_usuario: req.locals.id,
            name: req.locals.name
        };

        res.render('cadastroRegistrador', data);
    },
    cadastroPessoa: async (req, res) => {
        // pagina publica onde pessoas iram se cadastrar sem estar logadas
        const zonasEleirorais = await getZonas();
        const public_id = req.query.ref;
        const data = {
            zonasEleirorais: zonasEleirorais,
            typeUser: req.locals.typeUser,
            public_id: public_id,
            name: req.locals.name,
        };
  
        res.render('cadastroPessoa', data);
    },
    pessoasCadastradas: async (req, res) => {
        const limit = req.query.limit || 100;
        const offset = req.query.offset || 0;
   
        let pessoas = [];
        if(req.locals.admin == 1){
            pessoas = await pessoaModel.getByOffsetAll(offset, limit);
        }else{
            const registradorId = req.locals.id;
            pessoas = await pessoaModel.getByOffsetAndIdRegistrador(offset, limit, registradorId);
        }

        const data = {
            pessoas: pessoas,
            admin: req.locals.admin,
            public_id: req.locals.public_id,
            id_usuario: req.locals.id,
            name: req.locals.name
        };

        res.render('listaPessoa', data);
    },
    updatePessoa: async (req, res) => {
        const id = req.query.ref;
 
        const pessoa = await  pessoaModel.getById(id);

        const data = {
            pessoa: pessoa[0],
            admin: req.locals.admin,
            public_id: req.locals.public_id,
            id_usuario: req.locals.id,
            name: req.locals.name
        };
        
        res.render('updatePessoa', data);
    }
}