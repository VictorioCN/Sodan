// Importando o Express e o banco de dados
const express = require('express');
const router = express.Router();
const db = require('./db');  // Conexão com o banco de dados

// Rota para cadastrar um novo usuário
router.post('/usuarios/cadastrar', async (req, res) => {
  const { nome, cpf, nomeUsuario, senha, tipo } = req.body;

  // Verificar se todos os campos obrigatórios foram fornecidos
  if (!nome || !cpf || !nomeUsuario || !senha || !tipo) {
    return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
  }

  try {
    // Verificar se o usuário já existe (pelo nome de usuário ou CPF)
    const [existingUser] = await db.query(
      'SELECT usu_nome_usuario FROM usuario WHERE usu_nome_usuario = ? OR usu_cpf = ?',
      [nomeUsuario, cpf]
    );

    if (existingUser.length > 0) {
      return res.status(400).json({ message: 'Usuário ou CPF já cadastrado.' });
    }

    // Inserir o usuário no banco de dados
    await db.query(
      'INSERT INTO usuario (usu_nome, usu_cpf, usu_nome_usuario, usu_senha, usu_tipo) VALUES (?, ?, ?, ?, ?)',
      [nome, cpf, nomeUsuario, senha, tipo]
    );

    res.status(201).json({ message: 'Usuário cadastrado com sucesso!' });
  } catch (error) {
    console.error('Erro ao cadastrar usuário:', error);
    res.status(500).json({ message: 'Erro ao cadastrar usuário', error: error.message });
  }
});

// Rota para fazer login
router.post('/usuarios/login', async (req, res) => {
  const { nomeUsuario, senha } = req.body;

  // Verificar se nome de usuário e senha foram fornecidos
  if (!nomeUsuario || !senha) {
    return res.status(400).json({ message: 'Usuário e senha são obrigatórios' });
  }

  try {
    // Verificar se o usuário existe
    const [user] = await db.query(
      'SELECT * FROM usuario WHERE usu_nome_usuario = ? AND usu_senha = ?',
      [nomeUsuario, senha]
    );

    if (user.length === 0) {
      return res.status(401).json({ message: 'Usuário ou senha inválidos' });
    }

    res.status(200).json({
      message: 'Login bem-sucedido!',
      usuario: {
        id: user[0].usu_id,
        nome: user[0].usu_nome,
        tipo: user[0].usu_tipo,
      },
    });
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    res.status(500).json({ message: 'Erro ao fazer login', error: error.message });
  }
});

// Rota para listar todos os usuários (opcional)
router.get('/usuarios', async (req, res) => {
  try {
    // Buscar todos os usuários
    const [usuarios] = await db.query('SELECT * FROM usuario');
    res.status(200).json(usuarios);
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    res.status(500).json({ message: 'Erro ao buscar usuários', error: error.message });
  }
});

// Rota para buscar um usuário específico pelo ID
router.get('/usuarios/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // Buscar o usuário pelo ID
    const [usuario] = await db.query('SELECT * FROM usuario WHERE usu_id = ?', [id]);

    if (usuario.length === 0) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    res.status(200).json(usuario[0]);
  } catch (error) {
    console.error('Erro ao buscar usuário:', error);
    res.status(500).json({ message: 'Erro ao buscar usuário', error: error.message });
  }
});

module.exports = router;