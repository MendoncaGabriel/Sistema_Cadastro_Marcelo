const db = require('../../database')

module.exports = {
    lengthPessoas: () => {
        const sql = "SELECT COUNT(*) AS total FROM pessoas;";
        const values = [];
        return new Promise((resolve, reject)=> {
            db.query(sql, values, (error, result) => {
                if(error){
                    reject(error);
                }else{
                    resolve(result);
                }
            });
        });
    },
    lengthRegistradores: () => {
        const sql = "select count(*) as total from usuarios;";
        return new Promise((resolve, reject)=> {
            db.query(sql, (error, result) => {
                if(error){
                    reject(error);
                }else{
                    resolve(result);
                }
            });
        });
    }
}