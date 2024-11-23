const mysql = require('mysql2');

// Cria a conexão com o banco de dados
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root', // Altere para seu usuário MySQL
  password: 'victor', // Altere para sua senha MySQL
  database: 'sodan',
});

const promisePool = pool.promise(); // Conexão prometida para trabalhar com async/await

module.exports = promisePool; // Exportando a conexão