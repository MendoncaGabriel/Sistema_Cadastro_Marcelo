const connection = require('../../database')

function executeSql(sql, values){
    return new Promise((resolve, reject) => {
        connection.query(sql, values, (error, data) => {
            if(error){

                console.log({
                    sqlState: error.sqlState,
                    sqlMessage: error.message
                });
                
                reject({
                    sqlState: error.sqlState,
                    sqlMessage: error.message
                });
            }else{
                resolve(data);
            };
        });
        
    });
};


module.exports = executeSql