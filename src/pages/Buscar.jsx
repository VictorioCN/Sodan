import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import style from './Buscar.module.css'

const Buscar = () => {
  const [buscarTermo, setBuscarTermo] = useState('');
  const [statusFiltro, setStatusFiltro] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Termo de busca:', buscarTermo);
    console.log('Filtro de status:', statusFiltro);
  };

  return (
    <Container className={style.container}>
      <Row className={style.row}>
        <Col md={8}>
          <Form onSubmit={handleSearch}>
            <Form.Group controlId="formSearch">
              <Form.Label className={style.Label}>BUSCAR</Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite sua busca..."
                value={buscarTermo}
                onChange={(e) => setBuscarTermo(e.target.value)}
                style={{ height: '50px', fontSize: '16px', width: '600px'}}
              />
            </Form.Group>

            <Form.Group controlId="formStatus" className="mt-3">
              <Form.Check
                inline
                label="Em Andamento"
                name="status"
                type="checkbox"
                value="em andamento"
                onChange={(e) => setStatusFiltro(e.target.checked ? e.target.value : '')}
                checked={statusFiltro === 'em andamento'}
                style={{ marginRight: '30px' }}
              />
              <Form.Check
                inline
                label="Pendente"
                name="status"
                type="checkbox"
                value="pendente"
                onChange={(e) => setStatusFiltro(e.target.checked ? e.target.value : '')}
                checked={statusFiltro === 'pendente'}
                style={{ marginRight: '20px' }}
              />
              <Form.Check
                inline
                label="Concluído"
                name="status"
                type="checkbox"
                value="concluido"
                onChange={(e) => setStatusFiltro(e.target.checked ? e.target.value : '')}
                checked={statusFiltro === 'concluido'}
                style={{ marginRight: '20px' }}
              />
            </Form.Group>

            <Button variant="primary" type="submit" className={style.btn}>
              Pesquisar
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Buscar;