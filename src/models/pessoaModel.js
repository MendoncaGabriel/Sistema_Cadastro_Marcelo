const db = require('../../database');

module.exports = {
    novaPessoa: async (pessoaData) => {
        const {nome, telefone, email, zona, secao, cpf, rg, data, rua, bairro, cep, numero, complemento, cidade, estado, pais, registradores_id} = pessoaData;
        if (!nome) throw new Error("Sem nome");
        if (!telefone) throw new Error("Sem telefone");
        if (!email) throw new Error("Sem email");
        if (!cpf) throw new Error("Sem CPF");
        if (!rg) throw new Error("Sem RG");
        if (!data) throw new Error("Sem data de nascimento");
        if (!rua) throw new Error("Sem nome da rua");
        if (!bairro) throw new Error("Sem nome do bairro");
        if (!cep) throw new Error("Sem CEP");
        if (!numero) throw new Error("Sem número");
        if (!cidade) throw new Error("Sem nome da cidade");
        if (!estado) throw new Error("Sem nome do estado");
        if (!pais) throw new Error("Sem nome do país");
        if (!registradores_id) throw new Error("Sem ID do registrador");
        
        const sql = `
        INSERT INTO pessoas (data, nome, telefone, email, zona, secao, cpf, rg, rua, bairro, cep, data_nascimento, numero, complemento, cidade, estado, pais, registradores_id)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
        `;
   
    
        try {
            const result = await new Promise((resolve, reject) => {
                const date = new Date()
                db.query(sql, [nome, date, telefone, email, zona, secao, cpf, rg, data, rua, bairro, cep, numero, complemento, cidade, estado, pais, registradores_id], (error, data) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(data);
                    }
                });
            });

            return {result}; // Retornar resultados das inserções
        } catch (error) {
            throw error; // Lançar o erro para ser tratado no código de chamada
        }
    }
}    