// server.js
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'seu_usuario',
  password: 'sua_senha',
  database: 'sodan'
});

db.connect((err) => {
  if (err) throw err;
  console.log('Conectado ao MySQL');
});

// Rota para buscar empregado por matrícula
app.get('/empregado/:matricula', (req, res) => {
  const { matricula } = req.params;
  const query = `
    SELECT e.*, t.ID-TREINAMENTO, et.STATUS_TREINAMENTO 
    FROM TB_EMPREGADO e
    LEFT JOIN TB_EMPREGADO_has_TB_TREINAMENTO et ON e.MAT-EMPREGADO = et.TB_EMPREGADO_MAT-EMPREGADO 
    LEFT JOIN TB_TREINAMENTO t ON t.ID-TREINAMENTO = et.TB_TREINAMENTO_ID-TREINAMENTO
    WHERE e.MAT-EMPREGADO = ?;
  `;
  
  db.query(query, [matricula], (erro, results) => {
    if (erro) {
      console.error('Erro ao buscar o empregado:', err);
      res.status(500).send({ error: 'Erro ao buscar o empregado' });
      return;
    }
    res.send(results);
  });
});

// Rota para cadastrar um novo empregado
app.post('/empregado', (req, res) => {
  const {
    nome,
    cpf,
    cidade,
    bairro,
    rua,
    numeroRua,
    email,
    telefone,
    dataNascimento,
    dataAdmissao
  } = req.body;

  const query = `
    INSERT INTO TB_EMPREGADO 
    (NOME-EMPREGADO, CPF-EMPREGADO, CIDADE, BAIRRO, RUA, N°-RUA, EMAIL-EMPREGADO, TEL-EMPREGADO, DT-NASCIMENTO, DT-ADMISSAO) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
  `;

  db.query(
    query,
    [nome, cpf, cidade, bairro, rua, numeroRua, email, telefone, dataNascimento, dataAdmissao],
    (err, results) => {
      if (erro) {
        console.error('Erro ao cadastrar o empregado:', err);
        res.status(500).send({ error: 'Erro ao cadastrar o empregado' });
        return;
      }
      res.send({ message: 'Empregado cadastrado com sucesso', empregadoId: results.insertId });
    }
  );
});

// Rota para atualizar os dados do empregado
app.put('/empregado/:matricula', (req, res) => {
  const { matricula } = req.params;
  const {
    nome,
    cpf,
    cidade,
    bairro,
    rua,
    numeroRua,
    email,
    telefone,
    dataNascimento,
    dataAdmissao
  } = req.body;

  const query = `
    UPDATE TB_EMPREGADO 
    SET NOME-EMPREGADO = ?, CPF-EMPREGADO = ?, CIDADE = ?, BAIRRO = ?, RUA = ?, N°-RUA = ?, 
    EMAIL-EMPREGADO = ?, TEL-EMPREGADO = ?, DT-NASCIMENTO = ?, DT-ADMISSAO = ? 
    WHERE MAT-EMPREGADO = ?;
  `;

  db.query(
    query,
    [nome, cpf, cidade, bairro, rua, numeroRua, email, telefone, dataNascimento, dataAdmissao, matricula],
    (err, results) => {
      if (err) {
        console.error('Erro ao atualizar o empregado:', err);
        res.status(500).send({ error: 'Erro ao atualizar o empregado' });
        return;
      }
      res.send({ message: 'Empregado atualizado com sucesso' });
    }
  );
});

// Rota para atualizar o status do treinamento
app.put('/empregado/treinamento', (req, res) => {
  const { matricula, treinamentoId, status } = req.body;
  const query = `
    UPDATE TB_EMPREGADO_has_TB_TREINAMENTO 
    SET STATUS_TREINAMENTO = ? 
    WHERE TB_EMPREGADO_MAT-EMPREGADO = ? AND TB_TREINAMENTO_ID-TREINAMENTO = ?;
  `;
  
  db.query(query, [status, matricula, treinamentoId], (err, results) => {
    if (err) {
      console.error('Erro ao atualizar o status do treinamento:', err);
      res.status(500).send({ error: 'Erro ao atualizar o status do treinamento' });
      return;
    }
    res.send({ message: 'Status do treinamento atualizado com sucesso' });
  });
});

// Rota para excluir um empregado por matrícula
app.delete('/empregado/:matricula', (req, res) => {
  const { matricula } = req.params;
  const query = `DELETE FROM TB_EMPREGADO WHERE MAT-EMPREGADO = ?;`;

  db.query(query, [matricula], (err, results) => {
    if (erro) {
      console.error('Erro ao excluir o empregado:', erro);
      res.status(500).send({ error: 'Erro ao excluir o empregado' });
      return;
    }
    res.send({ message: 'Empregado excluído com sucesso' });
  });
});

app.listen(5000, () => {
  console.log('Servidor rodando na porta 5000');
});