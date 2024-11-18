const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');  // Importando o middleware CORS
const empregadoRoutes = require('./empregado');  // Importando as rotas de empregado

const app = express();
const PORT = 5000;

// Middleware para habilitar CORS e permitir requisições do frontend (localhost:3000)
app.use(cors());

// Middleware para parsear o corpo da requisição em formato JSON
app.use(bodyParser.json());

// Usando as rotas de empregado
app.use('/api/empregado', empregadoRoutes);

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`); 
});
