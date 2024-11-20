import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Table } from 'react-bootstrap';
import style from '../css/Buscar.module.css';

const Buscar = () => {
  const [buscarTermo, setBuscarTermo] = useState('');
  const [treinamentoTermo, setTreinamentoTermo] = useState('');
  const [statusFiltro, setStatusFiltro] = useState('');
  const [resultados, setResultados] = useState([]);
  const [erro, setErro] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    setErro('');

    try {
      const response = await fetch(
        `http://localhost:5000/api/empregado/buscar?termo=${buscarTermo}&status=${statusFiltro}&treinamento=${treinamentoTermo}`
      );

      if (!response.ok) {
        throw new Error('Erro ao buscar dados. Verifique o servidor.');
      }

      const data = await response.json();
      setResultados(data);
    } catch (error) {
      console.error('Erro ao buscar:', error);
      setErro('Ocorreu um erro ao buscar os dados. Tente novamente.');
    }
  };

  const handleFiltroChange = (value) => {
    setStatusFiltro((prev) => (prev === value ? '' : value));
  };

  return (
    <Container className={style.container}>
      <Row className={style.row}>
        <Col md={10} className={style.formContainer}>
          <Form onSubmit={handleSearch}>
            {/* Campo de busca */}
            <div className={style.inputRow}>
              <Form.Group controlId="formSearch">
                <Form.Label className={style.label} >Buscar por Empregado</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Digite a matrícula ou o nome do empregado..."
                  value={buscarTermo}
                  onChange={(e) => setBuscarTermo(e.target.value)}
                  style={{ height: '50px', fontSize: '16px', width: '1000px', borderRadius: '80px', borderColor: 'blue'}}
                />
              </Form.Group>

              <Form.Group controlId="formTreinamento">
                <Form.Label className={style.label} >Buscar por Treinamento</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Digite o nome do treinamento..."
                  value={treinamentoTermo}
                  onChange={(e) => setTreinamentoTermo(e.target.value)}
                  style={{ height: '50px', fontSize: '16px', width: '1000px', borderRadius: '80px', borderColor: 'blue'}}
                />
              </Form.Group>
            </div>

            {/* Filtros */}
            <div className={style.filters}>
              <Form.Check
                inline
                label="Em Andamento"
                name="status"
                type="checkbox"
                value="em andamento"
                onChange={() => handleFiltroChange('em andamento')}
                checked={statusFiltro === 'em andamento'}
              />
              <Form.Check
                inline
                label="Pendente"
                name="status"
                type="checkbox"
                value="pendente"
                onChange={() => handleFiltroChange('pendente')}
                checked={statusFiltro === 'pendente'}
              />
              <Form.Check
                inline
                label="Concluído"
                name="status"
                type="checkbox"
                value="concluido"
                onChange={() => handleFiltroChange('concluido')}
                checked={statusFiltro === 'concluido'}
              />
            </div>

            {/* Botão de pesquisa */}
            <Button variant="primary" type="submit" className={style.btn}>
              Pesquisar
            </Button>
          </Form>

          {/* Exibição de erros */}
          {erro && <p className="text-danger mt-3">{erro}</p>}

          {/* Exibição de resultados */}
          <div className={style.table}>
            {resultados.length > 0 ? (
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Matrícula</th>
                    <th>Nome</th>
                    <th>Treinamento</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {resultados.map((item, index) => (
                    <tr key={index}>
                      <td>{item.MAT_EMPREGADO}</td>
                      <td>{item.NOME_EMPREGADO}</td>
                      <td>{item.NOME_TREINAMENTO || 'Sem treinamento'}</td>
                      <td>{item.STATUS_TREINAMENTO || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              !erro && <p className="mt-3">Nenhum resultado encontrado.</p>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Buscar;