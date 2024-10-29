
import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import style from './Home.module.css'
import MyNavBar from '../components/MyNavBar.jsx';

const Home = () => {
  return (
    <Container fluid className="p-5">
      <MyNavBar/>
      <h1 className="text-center mb-4">Bem-vindo ao Sistema de Consulta de Status de Treinamento</h1>

      <Row className="mb-5">
        <Col md={12}>
          <Card>
            <Card.Body>
              <Card.Title className={style.titulo}>Sobre o Nosso Sistema</Card.Title>
              <Card.Text className={style.texto}>
                Nosso sistema foi desenvolvido para facilitar a consulta do status de treinamentos
                de forma rápida e eficiente. Com uma interface intuitiva, os usuários podem
                acessar informações sobre o status atual dos treinamentos, incluindo progresso geral e quaisquer pendências.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mb-5">
        <Col md={12}>
          <Card>
            <Card.Body>
              <Card.Title className={style.titulo}>Nossa História</Card.Title>
              <Card.Text className={style.texto}>
                Fundada em 2024, nossa empresa nasceu com o objetivo de mostrar se as pessoas são aptas á realizarem suas funções
                . Ao longo desse ano, expandimos nossos
                serviços e, hoje, somos referência em consulta de status de treinamento. 
                Estamos comprometidos em oferecer as melhores experiências
                de aprendizado.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col md={12}>
          <Card>
            <Card.Body>
              <Card.Title className={style.titulo}>Nosso Objetivo</Card.Title>
              <Card.Text className={style.texto}>
              A funcionalidade de busca por treinamento ou empregado é uma das principais características do nosso sistema, 
              projetada para oferecer agilidade e precisão na consulta de informações relevantes. 
              Com uma interface intuitiva, os usuários podem facilmente inserir nomes de treinamentos 
              ou empregados para encontrar dados específicos.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
