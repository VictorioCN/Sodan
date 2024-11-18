const express = require('express');
const router = express.Router();
const db = require('./db');  // Conexão com o banco de dados

// Rota para obter os treinamentos
router.get('/treinamentos', async (req, res) => {
  try {
    // Buscar todos os treinamentos
    const [treinamentos] = await db.query('SELECT ID_TREINAMENTO, NOME_TREINAMENTO FROM TB_TREINAMENTO');
    res.status(200).json(treinamentos);  // Retorna os treinamentos encontrados
  } catch (error) {
    console.error('Erro ao buscar treinamentos:', error);
    res.status(500).json({ message: 'Erro ao buscar treinamentos', error: error.message });
  }
});

// Rota para buscar o empregado por matrícula
router.get('/:matricula', async (req, res) => {
  const matricula = req.params.matricula;

  try {
    // Buscar o empregado
    const [empregado] = await db.query('SELECT * FROM TB_EMPREGADO WHERE MAT_EMPREGADO = ?', [matricula]);

    if (!empregado || empregado.length === 0) {
      return res.status(404).json({ message: 'Empregado não encontrado' });
    }

    // Buscar os treinamentos do empregado
    const [treinamentos] = await db.query(`
      SELECT t.ID_TREINAMENTO, t.NOME_TREINAMENTO, eht.STATUS_TREINAMENTO
      FROM TB_TREINAMENTO t
      JOIN TB_EMPREGADO_has_TB_TREINAMENTO eht ON eht.TB_TREINAMENTO_ID_TREINAMENTO = t.ID_TREINAMENTO
      WHERE eht.TB_EMPREGADO_MAT_EMPREGADO = ?`, [matricula]);

    const empregadoComTreinamentos = { ...empregado[0], treinamentos };
    res.status(200).json(empregadoComTreinamentos); // Retorna o empregado com treinamentos
  } catch (error) {
    console.error('Erro ao buscar empregado:', error);
    res.status(500).json({ message: 'Erro ao buscar empregado', error: error.message });
  }
});

// Rota para atualizar os dados do empregado
router.put('/:matricula', async (req, res) => {
  const matricula = req.params.matricula;
  const {
    nome, cpf, cidade, bairro, rua, numeroRua, email, telefone, dataNascimento, dataAdmissao, treinamentos
  } = req.body;

  try {
    // Atualizar os dados do empregado
    const [result] = await db.query(`
      UPDATE TB_EMPREGADO
      SET NOME_EMPREGADO = ?, CPF_EMPREGADO = ?, CIDADE = ?, BAIRRO = ?, RUA = ?, NUM_RUA = ?, EMAIL_EMPREGADO = ?, TEL_EMPREGADO = ?, DT_NASCIMENTO = ?, DT_ADMISSAO = ?
      WHERE MAT_EMPREGADO = ?`, [
      nome, cpf, cidade, bairro, rua, numeroRua, email, telefone, dataNascimento, dataAdmissao, matricula
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Empregado não encontrado' });
    }

    // Atualizar os treinamentos associados ao empregado
    if (treinamentos && Array.isArray(treinamentos)) {
      for (const treinamento of treinamentos) {
        const { idTreinamento, status } = treinamento;

        // Verificar se o treinamento já está associado ao empregado
        const [treinamentoExistente] = await db.query(`
          SELECT * FROM TB_EMPREGADO_has_TB_TREINAMENTO
          WHERE TB_EMPREGADO_MAT_EMPREGADO = ? AND TB_TREINAMENTO_ID_TREINAMENTO = ?`, [matricula, idTreinamento]);

        // Se não existir, inserir um novo
        if (treinamentoExistente.length === 0) {
          await db.query(`
            INSERT INTO TB_EMPREGADO_has_TB_TREINAMENTO (TB_TREINAMENTO_ID_TREINAMENTO, TB_EMPREGADO_MAT_EMPREGADO, STATUS_TREINAMENTO)
            VALUES (?, ?, ?)`, [idTreinamento, matricula, status]);
        } else {
          // Caso contrário, atualizar o status
          await db.query(`
            UPDATE TB_EMPREGADO_has_TB_TREINAMENTO
            SET STATUS_TREINAMENTO = ?
            WHERE TB_EMPREGADO_MAT_EMPREGADO = ? AND TB_TREINAMENTO_ID_TREINAMENTO = ?`, [status, matricula, idTreinamento]);
        }
      }
    }

    res.status(200).json({ message: 'Empregado atualizado com sucesso!' });
  } catch (error) {
    console.error('Erro ao atualizar empregado:', error);
    res.status(500).json({ message: 'Erro ao atualizar empregado', error: error.message });
  }
});

// Rota para cadastrar o empregado
router.post('/cadastrar', async (req, res) => {
  const {
    matricula,
    nome,
    cpf,
    cidade,
    bairro,
    rua,
    numeroRua,
    email,
    telefone,
    dataNascimento,
    dataAdmissao,
    treinamentos
  } = req.body;

  // Validação básica
  if (!matricula || !nome || !cpf || !cidade || !bairro || !rua || !numeroRua || !email || !telefone || !dataNascimento || !dataAdmissao) {
    return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
  }

  try {
    // Verificar se a matrícula já existe
    const [existingMatricula] = await db.query(
      'SELECT MAT_EMPREGADO FROM TB_EMPREGADO WHERE MAT_EMPREGADO = ?',
      [matricula]
    );

    if (existingMatricula.length > 0) {
      return res.status(400).json({ message: 'A matrícula já está cadastrada.' });
    }

    // Inserir o empregado na tabela TB_EMPREGADO
    const [empregadoResult] = await db.query(
      'INSERT INTO TB_EMPREGADO (MAT_EMPREGADO, NOME_EMPREGADO, CPF_EMPREGADO, CIDADE, BAIRRO, RUA, NUM_RUA, EMAIL_EMPREGADO, TEL_EMPREGADO, DT_NASCIMENTO, DT_ADMISSAO) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [
        matricula, nome, cpf, cidade, bairro, rua, numeroRua, email, telefone, dataNascimento, dataAdmissao
      ]
    );

    if (!empregadoResult || empregadoResult.affectedRows === 0) {
      throw new Error('Falha ao inserir o empregado no banco de dados');
    }

    // Inserir os treinamentos na tabela TB_EMPREGADO_has_TB_TREINAMENTO
    if (treinamentos && Array.isArray(treinamentos)) {
      for (const treinamento of treinamentos) {
        const { idTreinamento, status } = treinamento;

        // Verificar se o ID do treinamento existe
        const [treinamentoExistente] = await db.query(
          'SELECT ID_TREINAMENTO FROM TB_TREINAMENTO WHERE ID_TREINAMENTO = ?',
          [idTreinamento]
        );

        if (treinamentoExistente.length === 0) {
          throw new Error(`Treinamento com ID ${idTreinamento} não encontrado`);
        }

        await db.query(
          'INSERT INTO TB_EMPREGADO_has_TB_TREINAMENTO (TB_TREINAMENTO_ID_TREINAMENTO, TB_EMPREGADO_MAT_EMPREGADO, STATUS_TREINAMENTO) VALUES (?, ?, ?)',
          [idTreinamento, matricula, status]
        );
      }
    }

    res.status(201).json({ message: 'Empregado cadastrado com sucesso!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Erro ao cadastrar empregado',
      error: error.message,
      code: error.code || 'UNKNOWN_ERROR',
      stack: error.stack,
    });
  }
});

module.exports = router;