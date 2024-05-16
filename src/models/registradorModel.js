const db = require('../../database');
const bycript = require('bcryptjs');


module.exports = {
    create: async (login, password, name, email) => {
        try {
            //criptografar senha
            const salt = await bycript.genSalt(10);
            const passwordhash = await bycript.hash(password, salt)
          
            //gravar usuario no banco
            const sql = "insert into  registradores (login, password, name, email, date) values (?, ?, ?, ?, ?)"
            const date = new Date();
            const values = [login, passwordhash, name, email, date];

            const result = await new Promise((resolve, reject) => {
                db.query(sql, values, (error, data) => {
                    if(error){
                        reject(error)
                    }else{
                        resolve(data)
                    }
                })
            })
            return {msg: 'Registrador cadastrado com sucesso', insertId: result.insertId}
        } catch (error) {
            throw new Error(error)
        }
    },
    getById: async (id) => {
        return new Promise((resolve, reject) => {
            const sql = "SELECT email, id, login, name FROM registradores  WHERE id = ?";
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
        console.log(login, password, name, email, id)
        
        return new Promise(async (resolve, reject)=>{
            const salt = await bycript.genSalt(10);
            const passwordhash = await bycript.hash(password, salt)
            const date = new Date();
            const sql = "UPDATE registradores SET login = ?, password = ?, name = ?, email = ?, date = ? WHERE id = ?;";
            const values = [login, passwordhash, name, email, date, id];

            db.query(sql, values, (error, data) => {
                if(error){
                    reject(error)
                }else{
                    resolve(data)
                }
            })
        })
    },
    delete: async (id) => {
        try {
            const sql = 'delete from registradores where id = ?'
            const values = [id]
            const result = await new Promise((resolve, reject) => {
                db.query(sql, values, (error, data) => {
                    if(error){
                        reject(error)
                    }else{
                        resolve(data)
                    }
                })
            })
            if(result.affectedRows == 0) throw new Error('Virifique id de registradores')
           
            return result
        } catch (error) {
            throw new Error(error)
        }
    },
    getByOffset: (offset, limit) => {
        return new Promise((resolve, reject) => {
            const sql = "SELECT id, name, login, email, date FROM registradores  LIMIT ? OFFSET ?";
            const values = [limit, offset];

            db.query(sql, values, (error, data) => {
                if(error){
                    reject(error);
                }else{
                    resolve(data);
                };
            });

        });
    },
    existing: async (login, nome, email) => {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM registradores WHERE login = ? OR name = ? OR email = ?'
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