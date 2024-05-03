require('dotenv').config();
const jwt = require('jsonwebtoken');    

class Token {
    static #secret = process.env.SECRET_JWT;


    static newToken(payload, expiresIn){
        let days = '1d';
        if(expiresIn && expiresIn.includes('d')){
            days = expiresIn;
        };

        return jwt.sign(payload, this.#secret, { expiresIn: days }); 
    };

    static validateToken(token){
        try {
            const decoded = jwt.verify(token, this.#secret);
            return { valid: true, decoded };
        } catch (error) {
            return { valid: false, erro: error.message };
        }
    };
}
module.exports  = Token;