const db = require('../../database')

module.exports = {
    lengthPessoas: () => {
        const sql = "SELECT COUNT(*) AS total FROM pessoas;"
        const values = []
        return new Promise((resolve, reject)=> {
            db.query(sql, values, (error, result) => {
                if(error){
                    reject(error)
                }else{
                    resolve(result)
                    console.log(result)
                }
            })
        })
    }
}