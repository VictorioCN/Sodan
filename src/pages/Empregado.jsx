import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Card } from 'react-bootstrap';
import style from '../css/Empregado.module.css';

function ButtonPage() {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <Container className="d-flex justify-content-center mt-5 mb-5">
      <Card style={{ width: '24rem' }} className={style.cardi}>
        <Card.Body className="text-center">
          <Card.Title>Gestão de Empregados</Card.Title>
          <Button
            variant="primary"
            size="lg"
            className="mb-3 w-100"
            onClick={() => handleNavigate('/empregado/cadastrar/')}
          >
            Cadastrar Empregado
          </Button>
          <Button
            variant="warning"
            size="lg"
            className="mb-3 w-100"
            onClick={() => handleNavigate('/empregado/atualizar/')}
          >
            Atualizar Empregado
          </Button>
          <Button
            variant="danger"
            size="lg"
            className="w-100"
            onClick={() => handleNavigate('/empregado/excluir/')}
          >
            Excluir Empregado
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default ButtonPage;