const registradorModel = require('../models/registradorModel');
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
        res.render('home')
    },
    cadastroRegistrador: async (req, res) => {
        const offset = req.query.offset || 0;
        const limit = req.query.limit || 10;
        const registradoresByOffset = await  registradorModel.getRegistradoresByOffset(offset, limit);
        const status = req.query.status || null;
        const msg = req.query.msg || null;
    
        const data = {
            registradores: registradoresByOffset || [],
            status: status,
            msg: msg,
            
        };
        res.render('cadastroRegistrador', data)
    },
    cadastroPessoa: async (req, res) => {
        const zonasEleirorais = await getZonas();
        const data = {
            zonasEleirorais: zonasEleirorais
        }
  
        res.render('cadastroPessoa', data)
    }
}