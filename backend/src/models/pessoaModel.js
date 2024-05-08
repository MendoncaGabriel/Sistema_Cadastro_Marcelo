const db = require('../../database');

module.exports = {
    novaPessoa: async (pessoaData) => {
        const {nome, telefone, email, zona, secao, cpf, rg, data, rua, bairro, cep, numero, complemento, cidade, estado, pais, usuarios_registradores_id} = pessoaData;
        
        const enderecoSql = `
            INSERT INTO endereco (rua, bairro, cep, numero, complemento, cidade, estado, pais)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?);
        `;
        
        const pessoasSql = `
            INSERT INTO pessoas (nome, telefone, email, zona, secao, cpf, rg, data, usuarios_registradores_id, endereco_id)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, LAST_INSERT_ID());
        `;
    
        try {
            // Inserir dados na tabela de endereços
            const enderecoResult = await new Promise((resolve, reject) => {
                db.query(enderecoSql, [rua, bairro, cep, numero, complemento, cidade, estado, pais], (error, data) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(data);
                    }
                });
            });
    
            // Inserir dados na tabela de pessoas
            const pessoasResult = await new Promise((resolve, reject) => {
                db.query(pessoasSql, [nome, telefone, email, zona, secao, cpf, rg, data, usuarios_registradores_id], (error, data) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(data);
                    }
                });
            });
    
            return {enderecoResult, pessoasResult}; // Retornar resultados das inserções
        } catch (error) {
            throw error; // Lançar o erro para ser tratado no código de chamada
        }
    }
    
}