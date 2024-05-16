const db = require('../../database');

module.exports = {
    create: async (pessoaData, registrador_id) => {
        return new Promise((resolve, reject)=>{
            const sql = `
            INSERT INTO pessoas 
                (data_registro, nome, telefone, email, zona, secao, cpf, data_nascimento, rg, rua, bairro, cep, numero, complemento, cidade, estado, pais, registrador_id)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;
    
            const {nome, telefone, email, zona, secao, cpf, data_nascimento, rg, rua, bairro, cep, numero, complemento, cidade, estado, pais} = pessoaData;
            const currentDate = new Date();
            const values = [currentDate, nome, telefone, email, zona, secao, cpf, data_nascimento, rg, rua, bairro, cep, numero, complemento, cidade, estado, pais, registrador_id];
            db.query(sql, values, (error, result) => {
                if(error){
                    reject(error)
                }else{
                    resolve(result)
                }
            })
        })
    },
    
    getById: async (id) => {
        return new Promise((resolve, reject) => {
            const sql = "SELECT * FROM pessoas WHERE id = ?";
            const values = [id];
            db.query(sql, values, (error, result) => {
                if(error){
                    reject(error)
                }else{
                    resolve(result)
                }
            })
        })
    },
    getByDate: async (result) => {
        return new Promise((resolve, reject) => {
            const sql = "SELECT * FROM pessoas WHERE DATE(data_registro) = ?";
            const values = [data];
            db.query(sql, values, (error, result) => {
                if(error){
                    reject(error);
                }else{
                    resolve(result);
                };
            });
        });
    },
    getByOffsetAll: async (offset, limit) => {
        return new Promise((resolve, reject) => {
            const sql = "SELECT * FROM pessoas LIMIT ? OFFSET ?";
            const values = [limit, offset];
            db.query(sql, values, (error, result) => {
                if(error){
                    reject(error)
                }else{
                    resolve(result)
                }
            })
        })
    },
    getByOffsetAndIdRegistrador: async (offset, limit, registradorId) => {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM pessoas WHERE registrador_id = ? LIMIT ? OFFSET ?';
            const values = [registradorId, limit, offset];
            db.query(sql, values, (error, result) => {
                if(error){
                    reject(error)
                }else{
                    resolve(result)
                }
            })
        })
    },
    
    
    getByRegistradorId: async (id) => {
        return new Promise((resolve, reject) => {
            const sql = "SELECT * FROM pessoas WHERE registrador_id = ?";
            const values = [id];
            db.query(sql, values, (error, result) => {
                if(error){
                    reject(error);
                }else{
                    resolve(result);
                };
            });
        });
    },
    update: async (id, newData) => {
        return new Promise((resolve, reject) => {
            const data_registro = new Date();
            const {nome, telefone, email, zona, secao, cpf, rg, rua, bairro, cep, data_nascimento, numero, complemento, cidade, estado, pais, registrador_id} = newData;
            const values = [data_registro, nome, telefone, email, zona, secao, cpf, rg, rua, bairro, cep, data_nascimento, numero, complemento, cidade, estado, pais, registrador_id, id];
            const sql = "UPDATE pessoas SET data_registro = ?, nome = ?, telefone = ?, email = ?, zona = ?, secao = ?, cpf = ?, rg = ?, rua = ?, bairro = ?, cep = ?, data_nascimento = ?, numero = ?, complemento = ?, cidade = ?, estado = ?, pais = ?, registrador_id = ? WHERE id = ?";
            db.query(sql, values, (error, result) => {
                if(error){
                    reject(error);
                }else{
                    resolve(result);
                };
            });
        });
    },
    delete: async (id) => {
        return new Promise((resolve, reject)=> {
            const sql = "DELETE FROM pessoas WHERE id = ?";
            const values = [id];
            db.query(sql, values, (error, result) => {
                if(error){
                    reject(error)
                }else{
                    resolve(result)
                }
            })
        })
    }
}    