const db = require('../../database');
const bycript = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');


module.exports = {
    create: async (login, password, name, email) => {
        //criptografar senha
        const salt = await bycript.genSalt(10);
        const passwordhash = await bycript.hash(password, salt);
        
        //gravar usuario no banco
        const sql = "insert into  usuarios (public_id, login, password, name, email, date) values (?, ?, ?, ?, ?, ?)";
        const date = new Date();
        const public_id = uuidv4();
        const values = [public_id, login, passwordhash, name, email, date];
        const result = await new Promise((resolve, reject) => {
            db.query(sql, values, (error, data) => {
                if(error){
                    reject(error);
                }else{
                    resolve(data);
                }
            });
        })
        return {msg: 'Registrador cadastrado com sucesso', insertId: result.insertId}
     
    },
    getById: async (id) => {
        return new Promise((resolve, reject) => {
            const sql = "SELECT email, id, login, name FROM usuarios  WHERE id = ? AND ativo = 1";
            const values = [id];

            db.query(sql, values, (error, data) => {
                if(error){
                    reject(error);
                }else{
                    resolve(data);
                };
            });
        });
    },
    update: async (login, password, name, email, id) => {
        return new Promise(async (resolve, reject)=>{
            const salt = await bycript.genSalt(10);
            const passwordhash = await bycript.hash(password, salt);
            const date = new Date();
            const sql = "UPDATE usuarios SET login = ?, password = ?, name = ?, email = ?, date = ? WHERE id = ?;";
            const values = [login, passwordhash, name, email, date, id];

            db.query(sql, values, (error, data) => {
                if(error){
                    reject(error);
                }else{
                    resolve(data);
                }
            });
        });
    },
    delete: async (id) => {
        const sql = `
        UPDATE usuarios 
            SET ativo = 0, email = NULL, login = NULL
        WHERE id = ?;`;

        const values = [id];
        const result = await new Promise((resolve, reject) => {
            db.query(sql, values, (error, data) => {
                if(error){
                    reject(error);
                }else{
                    resolve(data);
                }
            });
        });
    },
    getByOffset: (offset, limit) => {
        return new Promise((resolve, reject) => {
            const sql = "SELECT id, name, login, email, date FROM usuarios WHERE ativo = 1  LIMIT ? OFFSET ?";
            const values = [limit, offset];

            db.query(sql, values, (error, result) => {
                if(error){
                    reject(error);
                }else{
                    resolve(result);
                };
            });
        });
    },
    existing: async (login, nome, email) => {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM usuarios WHERE (login = ? OR name = ? OR email = ?) AND ativo = 1'
            const values = [login, nome, email];
            db.query(sql, values, (error, result) => {
                if (error) {
                    reject(error); 
                } else {
                    resolve(result.length > 0); 
                }
            });
        });
    }
}