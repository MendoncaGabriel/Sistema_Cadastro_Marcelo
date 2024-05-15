const db = require('../../database');

module.exports = {
    create: async (pessoaData) => {
        const {nome, telefone, email, zona, secao, cpf, data_nascimento, rg, rua, bairro, cep, numero, complemento, cidade, estado, pais, registrador_id} = pessoaData;
        if (!nome) throw new Error("Sem nome");
        if (!telefone) throw new Error("Sem telefone");
        if (!email) throw new Error("Sem email");
        if (!cpf) throw new Error("Sem CPF");
        if (!rg) throw new Error("Sem RG");
        if (!data_nascimento) throw new Error("Sem data_nascimento");
        if (!rua) throw new Error("Sem nome da rua");
        if (!bairro) throw new Error("Sem nome do bairro");
        if (!cep) throw new Error("Sem CEP");
        if (!numero) throw new Error("Sem número");
        if (!cidade) throw new Error("Sem nome da cidade");
        if (!estado) throw new Error("Sem nome do estado");
        if (!pais) throw new Error("Sem nome do país");
        if (!registrador_id) throw new Error("Sem ID do registrador");
        
        const sql = `
        INSERT INTO pessoas 
            (data_registro, nome, telefone, email, zona, secao, cpf, rg, rua, bairro, cep, data_nascimento, numero, complemento, cidade, estado, pais, registrador_id)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
        `;

        try {
            const result = await new Promise((resolve, reject) => {

                const data_registro = new Date();
                db.query(sql, [data_registro, nome, telefone, email, zona, secao, cpf, rg, rua, bairro, cep, data_nascimento, numero, complemento, cidade, estado, pais, registrador_id], (error, data) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(data);
                    };
                });
            });

            return {result};
        } catch (error) {
            throw error;
        };
    },
    getById: async (id) => {
        const sql = "SELECT * FROM pessoas WHERE id = ?";
        const values = [id];

        return new Promise((resolve, reject) => {
            db.query(sql, values, (error, data) => {
                if(error){
                    reject(error)
                }else{
                    resolve(data)
                }
            })
        })
    },
    getByDate: async (data) => {
        const sql = "SELECT * FROM pessoas WHERE DATE(data_registro) = ?";
        const values = [data];

        return new Promise((resolve, reject) => {
            db.query(sql, values, (error, data) => {
                if(error){
                    reject(error);
                }else{
                    resolve(data);
                };
            });
        });
    },
    getByOffset: async (offset, limit) => {
        const sql = "SELECT * FROM pessoas LIMIT ? OFFSET ?";
        const values = [limit, offset];

        return new Promise((resolve, reject) => {
            db.query(sql, values, (error, data) => {
                if(error){
                    reject(error)
                }else{
                    resolve(data)
                }
            })
        })
    },
    getByRegistradorId: async (id) => {
        const sql = "SELECT * FROM pessoas WHERE registrador_id = ?";
        const values = [id];

        return new Promise((resolve, reject) => {
            db.query(sql, values, (error, data) => {
                if(error){
                    reject(error);
                }else{
                    resolve(data);
                };
            });
        });
    },
    update: async (id, newData) => {
        const data_registro = new Date();
        const {nome, telefone, email, zona, secao, cpf, rg, rua, bairro, cep, data_nascimento, numero, complemento, cidade, estado, pais, registrador_id} = newData;
        const values = [data_registro, nome, telefone, email, zona, secao, cpf, rg, rua, bairro, cep, data_nascimento, numero, complemento, cidade, estado, pais, registrador_id, id];
        const sql = "UPDATE pessoas SET data_registro = ?, nome = ?, telefone = ?, email = ?, zona = ?, secao = ?, cpf = ?, rg = ?, rua = ?, bairro = ?, cep = ?, data_nascimento = ?, numero = ?, complemento = ?, cidade = ?, estado = ?, pais = ?, registrador_id = ? WHERE id = ?";

        return new Promise((resolve, reject) => {
            db.query(sql, values, (error, data) => {
                if(error){
                    reject(error);
                }else{
                    resolve(data);
                };
            });
        });
    },
    delete: async (id) => {
        const sql = "DELETE FROM pessoas WHERE id = ?";
        const values = [id];

        return new Promise((resolve, reject)=> {
            db.query(sql, values, (error, data) => {
                if(error){
                    reject(error)
                }else{
                    resolve(data)
                }
            })
        })
    }
}    