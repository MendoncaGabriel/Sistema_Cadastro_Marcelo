require('dotenv').config();
const bycript = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../../database');

module.exports = {
    login: async (login, password) => { 
        //VERIFICANDO SE USUARIO EXISTE
        const sql = 'SELECT * FROM  usuarios WHERE login = ?';
        const values = [login];
        const usuario = await new Promise ((resolve, reject) => {
            db.query(sql, values, (error, data) => {
                if(error){
                    reject(error)
                }else{
                    resolve(data)
                }
            })
        });

        return new Promise(async (resolve, reject) => {
            try {
                if(usuario.length == 0 ) throw new Error('Usuario não encontrado');
                
                //VERIFICANDO SENHA
                const passwordHash = usuario[0].password;
                const checkPassword = await bycript.compare(password, passwordHash);
                if(checkPassword == false && usuario[0].password !== password) throw new Error('Senha invalida!');
    
                //CRIANDO TOKEN DE ACESSO
                const payload = {
                    login, 
                    id: usuario[0].id, 
                    admin: usuario[0].admin,
                    cadastrar_pessoas: usuario[0].cadastrar_pessoas,
                    cadastrar_usuarios: usuario[0].cadastrar_usuarios,
                    date: new Date()
                };
                const validade = '30d'
                const secret = process.env.SECRET_JWT
                const token = jwt.sign(payload, secret, { expiresIn: validade });
                resolve(token);
                
            } catch (error) {
                reject(error)
            }
        })
    }
  
};