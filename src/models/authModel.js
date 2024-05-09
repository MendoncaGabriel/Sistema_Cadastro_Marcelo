const bycript = require('bcryptjs');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const db = require('../../database')

module.exports = {
    loginRegistrador: async (login, password) => { 
        const sql = 'SELECT * FROM  registradores WHERE login = ?';
        const values = [login];
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
        const passwordHash = result[0].password
        const testePassword = await bycript.compare(password, passwordHash);

        if(testePassword == false) throw new Error('Senha invalida!');
        console.log('===> TesteSenha: ', testePassword)



        const payload = {login, password, userType: "registrador", id: result[0].id, date: new Date()}
        const validade = '30d'
        const secret = process.env.SECRET_JWT
        const token = await jwt.sign(payload, secret, { expiresIn: validade });
        return {token};
    },
    loginAdmin: async (login, password) => {
        if (!login || !password) throw new Error('Login ou senha inválidos');

        const Login = process.env.USER_ADMIN;
        const Pass = process.env.PASS_ADMIN;
    
        if (Login !== login) throw new Error('Login inválido');
        if (Pass !== password) throw new Error('Senha inválida');

        const userType = login == process.env.USER_ADMIN && password == process.env.PASS_ADMIN ? "admin" : "registrador";

        
        const payload = {login, password, userType, data: new Date()};
    
        const expiresIn = '30d'
        const token = jwt.sign(payload, process.env.SECRET_JWT, { expiresIn });
        
        return {token};
    }
};