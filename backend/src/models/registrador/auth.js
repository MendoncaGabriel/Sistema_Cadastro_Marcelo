const executeSql = require('../../utilities/executeSql');
const bycript = require('bcryptjs');
require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports = {
    login: async (login, password) => { 
        const sql = 'SELECT * FROM  registradores WHERE login = ?';
        const values = [login];
        const result =  await executeSql(sql, values);

        if(result.length == 0 ) throw new Error('Usuario não encontrado');
        const passwordHash = result[0].password
        const testePassword = await bycript.compare(password, passwordHash);

        if(testePassword == false) throw new Error('Senha invalida!');
        console.log('===> TesteSenha: ', testePassword)

        const payload = {login, password, date: new Date()}
        const validade = '30d'
        const secret = process.env.SECRET_JWT
        const token = await jwt.sign(payload, secret, { expiresIn: validade });
        return {token};
    }
};