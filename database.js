const mysql = require('mysql2');
require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10, // Número máximo de conexões no pool
    queueLimit: 0
});

pool.getConnection((error, connection) => {
    if (error) {
        if (error.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('===> ERROR: Conexão com o banco de dados foi perdida.');
        }
        if (error.code === 'ER_CON_COUNT_ERROR') {
            console.error('===> ERROR: Banco de dados tem muitas conexões.');
        }
        if (error.code === 'ECONNREFUSED') {
            console.error('===> ERROR: Conexão com o banco de dados foi recusada.');
        }
    }

    if (connection) connection.release(); // Libera a conexão de volta para o pool

    console.log(`===> CONECTADO AO BANCO DE DADOS: ${process.env.DB_NAME}`);
    return;
});

pool.on('release', (connection) => {
    console.log('===> Conexão %d liberada', connection.threadId);
});

module.exports = pool;
