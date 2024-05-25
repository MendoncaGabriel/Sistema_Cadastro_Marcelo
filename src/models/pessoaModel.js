const db = require('../../database');

module.exports = {
    create: async (pessoaData, usuarios_id) => {
       
        return new Promise((resolve, reject)=>{
            const sql = `
            INSERT INTO pessoas 
                (data_registro, nome, telefone, email, zona, secao, cpf, data_nascimento, rg, rua, bairro, cep, numero, complemento, cidade, estado, pais, usuarios_id)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;
    
            const {nome, telefone, email, zona, secao, cpf, data_nascimento, rg, rua, bairro, cep, numero, complemento, cidade, estado, pais} = pessoaData;
            const data_registro = new Date();
            const values = [
                data_registro || null,
                nome || null,
                telefone || null,
                email || null,
                zona || null,
                secao || null,
                cpf || null,
                data_nascimento || null,
                rg || null,
                rua || null,
                bairro || null,
                cep || null,
                numero || null,
                complemento || null,
                cidade || null,
                estado || null,
                pais || null,
                usuarios_id || null,
            ];

            db.query(sql, values, (error, result) => {
                if(error){
                    reject(error);
                }else{
                    resolve(result);
                }
            });
        });
    },
    getById: async (id) => {
        return new Promise((resolve, reject) => {
            const sql = "SELECT * FROM pessoas WHERE id = ?";
            const values = [id];
            db.query(sql, values, (error, result) => {
                if(error){
                    reject(error);
                }else{
                    resolve(result);
                }
            });
        });
    },
    getByDate: async (data) => {
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
                    reject(error);
                }else{
                    resolve(result);
                }
            });
        });
    },
    getByOffsetAndIdRegistrador: async (offset, limit, registradorId) => {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM pessoas WHERE usuarios_id = ? LIMIT ? OFFSET ?';
            const values = [registradorId, limit, offset];
            db.query(sql, values, (error, result) => {
                if(error){
                    reject(error);
                }else{
                    resolve(result);
                }
            });
        });
    },
    lestPessoas: async (offset, limit, id) => {
        return new Promise((resolve, reject) => {
            const sql = "SELECT * FROM pessoas WHERE usuarios_id = ? ORDER BY data_registro DESC LIMIT ? OFFSET ?";
            const values = [id, limit, offset];
            db.query(sql, values, (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            });
        });
    },
    getByRegistradorId: async (id) => {
        return new Promise((resolve, reject) => {
            const sql = "SELECT * FROM pessoas WHERE usuarios_id = ?";
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
    getBySecao: async (secao) => {
        return new Promise((resolve, reject) => {
            const sql = "SELECT * FROM pessoas WHERE secao = ?";
            const values = [secao];
            db.query(sql, values, (error, result) => {
                if(error){
                    reject(error);
                }else{
                    resolve(result);
                };
            });
        });
    },
    getByZona: async (zona) => {
        return new Promise((resolve, reject) => {
            const sql = "SELECT * FROM pessoas WHERE zona = ?";
            const values = [zona];
            db.query(sql, values, (error, result) => {
                if(error){
                    reject(error);
                }else{
                    resolve(result);
                };
            });
        });
    },
    getByName: async (nome) => {
        return new Promise((resolve, reject) => {
            const sql = "SELECT * FROM pessoas WHERE LOWER(nome) LIKE ?";
            const values = [`%${nome.toLowerCase()}%`]; 
            db.query(sql, values, (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            });
        });
    },
    update: async (pessoa_id, usuario_id, newData) => {
        return new Promise((resolve, reject) => {
            const data_registro = new Date();
            const {nome, telefone, email, zona, secao, cpf, rg, rua, bairro, cep, data_nascimento, numero, complemento, cidade, estado, pais} = newData;
            
            
            const values = [data_registro, nome, telefone, email, zona, secao, cpf, rg, rua, bairro, cep, data_nascimento, numero, complemento, cidade, estado, pais, usuario_id, pessoa_id];
            const sql = `
            UPDATE pessoas SET 
                data_registro = ?, 
                nome = ?, 
                telefone = ?, 
                email = ?, 
                zona = ?, 
                secao = ?, 
                cpf = ?, 
                rg = ?, 
                rua = ?, 
                bairro = ?, 
                cep = ?, 
                data_nascimento = ?, 
                numero = ?, 
                complemento = ?, 
                cidade = ?, 
                estado = ?, 
                pais = ?, 
                usuarios_id = ? 
            WHERE id = ?`;
            
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
                    reject(error);
                }else{
                    resolve(result);
                }
            });
        });
    },
    lestCreate: async () => {
        return new Promise((resolve, reject) => {
            const sql = `
            SELECT * FROM pessoas
                ORDER BY data_registro DESC
            LIMIT 1;`;

            const values = [];

            db.query(sql, values, (error, result) => {
                if(error){
                    reject(error);
                }else{
                    resolve(result);
                }
            });
        });
    }
}    