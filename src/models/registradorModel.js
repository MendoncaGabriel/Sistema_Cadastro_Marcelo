const db = require('../../database');
const bycript = require('bcryptjs');


async function verificarUsuarioExiste(login, name, email){
    const usuarioExist = [];
  
    //verificar se login ja esta cadastrado
    const verificarLogin = new Promise(async (res, rej) =>{
        try {
            const sql = "SELECT * FROM registradores WHERE login = ?"
            const values = [login]
            const result = await new Promise((resolve, reject) => {
                db.query(sql, values, (error, data) => {
                    if(error){
                        reject(error)
                    }else{
                        resolve(data)
                    }
                })
            })
            res(result.length > 0)
        } catch (error) {
            rej(error)
        }
    })
   
    //verificar se nome ja esta cadastrado
    const verificarName = new Promise(async (res, rej) => {
        try {
            const sql = "select * from registradores where name = ?"
            const values = [name];
            const resolve = await new Promise((resolve, reject) =>{
                db.query(sql, values, (error, data) => {
                    if(error){
                        reject(error)
                    }else{
                        resolve(data)
                    }
                })
            })
            res(resolve.length > 0)
        } catch (error) {
            rej(error)
        }
    })
  
    //verificar se email ja esta cadastrado
    const verificarEmail = new Promise(async (res, rej) => {
        try {
            const sql = "select * from registradores where email = ?"
            const values = [email]
            const result = await new Promise((resolve, reject) => {
                db.query(sql, values, (error, data) => {
                    if(error){
                        reject(error)
                    }else{
                        resolve(data)
                    }
                })
            })
            res(result > 0)
        } catch (error) {
            rej(error)
        }
    })

    usuarioExist.push(verificarName)
    usuarioExist.push(verificarLogin)
    usuarioExist.push(verificarEmail)

    const results = await Promise.all(usuarioExist);

    return results.some(result => result === true);
}

module.exports = {
    getRegistradoresByOffset: (offset, limit) => {
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
    getById: (id) => {
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
    createRegistrador: async (login, password, name, email) => {
        try {
            //Verificar se usuario existe
            const usuarioExist = await verificarUsuarioExiste(login, name, email);
            if(usuarioExist) throw new Error('Usuario já existe, verifiaque login, nome e email');
    
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
    updateRegistrador: async (login, password, name, email, id) => {
        try {
  
            //criptografar senha
            const salt = await bycript.genSalt(10);
            const passwordhash = await bycript.hash(password, salt)
          
            //gravar usuario no banco
            const sql = "UPDATE registradores SET login = ?, password = ?, name = ?, email = ?, date = ? WHERE id = ?;";
            const date = new Date();
            const values = [login, passwordhash, name, email, date, id];

            const result = await new Promise((resolve, reject) => {
                db.query(sql, values, (error, data) => {
                    if(error){
                        reject(error)
                    }else{
                        resolve(data)
                    }
                })
            })
            return {msg: 'Registrador atualizado com sucesso', insertId: result.insertId}
        } catch (error) {
            throw new Error(error)
        }
    },
    removerRegistrador: async (id) => {
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
    }
}