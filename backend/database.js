const mysql = require('mysql2');
require('dotenv').config()

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

connection.connect((error) => {
    if (error) {
        console.error('===> TESTE ERROR: Erro ao conectar ao banco de dados:', error);
    } else {
        console.log(`===> TESTE: Conectado ao banco de dados: ${process.env.DB_NAME}`);
    }

    // Feche a conexão após o teste, seja bem-sucedido ou não
    connection.end();
    console.log('===> FINISH: de Conecção finalizado')
});

module.exports = connection; 