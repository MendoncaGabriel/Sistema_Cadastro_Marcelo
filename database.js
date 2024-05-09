const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

connection.connect((error) => {
    if (error) {
        console.error('===> ERROR: Erro ao conectar ao banco de dados:', error);
    } else {
        console.log(`===> CONECTADO AO BANCO DE DADOS: ${process.env.DB_NAME}`);
    };
});

module.exports = connection; 