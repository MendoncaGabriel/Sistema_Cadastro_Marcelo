const db = require('../../utilities/executeSql');
const bycript = require('../../utilities/bycript');
const jwt = require('../../utilities/jwt')

module.exports = {
    //REGISTRADOR---------------------------------------
    registradorLogin: async (login, password) => { 
        const sql = 'SELECT * FROM  usuarios_registradores WHERE login = ?';
        const values = [login];
        const result =  await db(sql, values);

        if(result.length == 0 ) throw new Error('Usuario não encontrado');
        const passwordHash = result[0].password
        const testePassword = await bycript.comparePasswords(password, passwordHash)

        if(testePassword == false) throw new Error('Senha invalida!');
        console.log('===> TesteSenha: ', testePassword)

        const token = await jwt.newToken(result[0], '30d');
        return {token};
    },
    registradorSignup: async (login, password, name, email, id_admin) => { 
        const sql = 'INSERT INTO usuarios_registradores(login, password, name, email, date, id_admin)  values (?, ?, ?, ?, ?, ?)';
        const passwordEncripted = await  bycript.encryptPassword(password);

        console.log('===> Senha criptografada: ', passwordEncripted);
        console.log('===> Comparando senha e hash: ', await  bycript.comparePasswords(password, passwordEncripted));

        const date = new Date();
        const values = [login, passwordEncripted, name, email, date, id_admin];

        try {
            const result = await db(sql, values);
            return result;
        } catch (error) {
            if(error.sqlMessage.includes('usuarios_registradores.name_UNIQUE')) throw new Error('Erro ao usuario registrador!, nome ja cadastrado');
            if(error.sqlMessage.includes('usuarios_registradores.login_UNIQUE')) throw new Error('Erro ao usuario registrador!, login ja cadastrado');
            if(error.sqlMessage.includes('usuarios_registradores.email_UNIQUE')) throw new Error('Erro ao usuario registrador!, email ja cadastrado');
            
            console.log(error)
            throw new Error('Erro ao registrar usuario!');
        };

    },

    //ADMIN---------------------------------------------
    loginAdmin: async (login, password) => {
        const sql = 'SELECT * FROM  usuarios_admin WHERE login = ?';
        const values = [login];
        const result =  await db(sql, values);

        if(result.length == 0 ) throw new Error('Usuario admin não encontrado');
        const passwordHash = result[0].password;
        const testePassword = await bycript.comparePasswords(password, passwordHash)

        if(testePassword == false) throw new Error('Senha do admin e invalida!');
        console.log('===> TesteSenhaAdmin: ', testePassword)
        result[0].typeUser = 'ADMIN';
        const token = await jwt.newToken(result[0], '30d');
        return {token};
    },
    
    signupAdmin: async (login, password, name, email) => {
        const sql = 'INSERT INTO usuarios_admin(login, password, name, email)  values (?, ?, ?, ?)';
        const passwordEncripted = await  bycript.encryptPassword(password);

        console.log('===> Senha criptografada: ', passwordEncripted);
        console.log('===> Comparando senha e hash: ', await  bycript.comparePasswords(password, passwordEncripted));

        const values = [login, passwordEncripted, name, email];

        try {
            const result = await db(sql, values);
            return result;
        } catch (error) {
            if(error.sqlMessage.includes('usuarios_admin.name_UNIQUE')) throw new Error('Erro ao registrar usuario admin!, nome ja cadastrado');
            if(error.sqlMessage.includes('usuarios_admin.login_UNIQUE')) throw new Error('Erro ao registrar usuario admin!, login ja cadastrado');
            if(error.sqlMessage.includes('usuarios_admin.email_UNIQUE')) throw new Error('Erro ao registrar usuario admin!, email ja cadastrado');
            
            console.log(error)
            throw new Error('Erro ao registrar usuario admin!');
        };

    },


    
};