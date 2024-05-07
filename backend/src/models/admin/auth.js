require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports = {
    login: async (login, password) => {
        if (!login || !password) throw new Error('Login ou senha inválidos');

        const Login = process.env.USER_ADMIN;
        const Pass = process.env.PASS_ADMIN;
    
        if (Login !== login) throw new Error('Login inválido');
        if (Pass !== password) throw new Error('Senha inválida');
    
        const payload = {login, password, data: new Date()};
        const expiresIn = '30d'
        const token = jwt.sign(payload, process.env.SECRET_JWT, { expiresIn });
        
        return {token};
    }
    
};