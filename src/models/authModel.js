require('dotenv').config();
const bycript = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../../database');

module.exports = {
    login: async (login, password) => { 
        return new Promise(async (resolve, reject) => {
            try {
                //VERIFICAR TIPO DE USUSARIO
                const typeUser = login == process.env.USER_ADMIN && password == process.env.PASS_ADMIN ? "admin" : "registrador";
                
                if(typeUser == "admin"){      
                    //CRIANDO TOKEN DE ACESSO         
                    const payload = {login, password, typeUser, data: new Date()};
                    const expiresIn = '30d'
                    const token = jwt.sign(payload, process.env.SECRET_JWT, { expiresIn });
                    resolve(token);
                }else{
                    const sql = 'SELECT * FROM  registradores WHERE login = ?';
                    const values = [login];
        
                    //VERIFICANDO SE USUARIO EXISTE
                    const result = await new Promise ((resolve, reject) => {
                        db.query(sql, values, (error, data) => {
                            if(error){
                                reject(error)
                            }else{
                                resolve(data)
                            }
                        })
                    });
                    if(result.length == 0 ) throw new Error('Usuario não encontrado');
        
                    //VERIFICANDO SENHA
                    const passwordHash = result[0].password;
                    const checkPassword = await bycript.compare(password, passwordHash);
                    if(checkPassword == false) throw new Error('Senha invalida!');
        
                    //CRIANDO TOKEN DE ACESSO
                    const payload = {login, password, typeUser: "registrador", id: result[0].id, date: new Date()};
                    const validade = '30d'
                    const secret = process.env.SECRET_JWT
                    const token = jwt.sign(payload, secret, { expiresIn: validade });
                    resolve(token);
                };
            } catch (error) {
                reject(error)
            }
        })
    }
  
};