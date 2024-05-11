const bycript = require('bcryptjs');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const db = require('../../database');

module.exports = {
    login: async (login, password) => { 
        if (!login || !password) throw new Error('Login ou senha inválidos');

        //VERIFICAR TIPO DE USUSARIO
        const userType = login == process.env.USER_ADMIN && password == process.env.PASS_ADMIN ? "admin" : "registrador";
       
        if(userType == "admin"){      
            //CRIANDO TOKEN DE ACESSO         
            const payload = {login, password, userType, data: new Date()};
            const expiresIn = '30d'
            const token = jwt.sign(payload, process.env.SECRET_JWT, { expiresIn });
            
            console.log("usuario admin logado com sucesso!")
            return {token};

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
            const payload = {login, password, userType: "registrador", id: result[0].id, date: new Date()};
            const validade = '30d'
            const secret = process.env.SECRET_JWT
            const token = jwt.sign(payload, secret, { expiresIn: validade });

            console.log("usuario registrador logado com sucesso!");
            return {token};
        };
    }
  
};