const registradorModel = require('../models/registradorModel');
const pessoaModel = require('../models/pessoaModel');
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

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
            console.error(error);
            reject(error);
        }
    });
}

module.exports = {
    login: (req, res) => {
        res.render('login')
    },
    home: (req, res) => {
        const data = {
            typeUser: req.locals.typeUser
        }
        res.render('home', data)
    },
    cadastroRegistrador: async (req, res) => {
        const offset = req.query.offset || 0;
        const limit = req.query.limit || 10;
        const registradoresByOffset = await  registradorModel.getByOffset(offset, limit);
        const status = req.query.status || null;
        const msg = req.query.msg || null;
    
        const data = {
            registradores: registradoresByOffset || [],
            status: status,
            msg: msg,
            typeUser: req.locals.typeUser
        };

        res.render('cadastroRegistrador', data);
    },
    cadastroPessoa: async (req, res) => {
        const zonasEleirorais = await getZonas();
        const data = {
            zonasEleirorais: zonasEleirorais,
            typeUser: req.locals.typeUser
        }
  
        res.render('cadastroPessoa', data);
    },
    pessoasCadastradas: async (req, res) => {
        const limit = req.query.limit || 10;
        const offset = req.query.offset || 0;
        const pessoas = await pessoaModel.getByOffset(offset, limit);
        const data = {
            pessoas: pessoas,
            typeUser: req.locals.typeUser
        };
        res.render('listaPessoa', data);
    },
    updatePessoa: async (req, res) => {
        const id = req.query.ref;
        const pessoa = await  pessoaModel.getById(id);

        const data = {
            pessoa: pessoa[0],
            typeUser: req.locals.typeUser
        };
        res.render('updatePessoa', data);
    }
}