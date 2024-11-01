import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaPhone, FaInstagram } from 'react-icons/fa';
import style from '../css/MyFooter.module.css';

function Footer() {
  return (
    <footer className={style.footer}>
      <Container fluid> {/* Mudar para fluid */}
        <Row>
          <Col md={4}>
            <h5>Sobre nós</h5>
            <p>Bem-vindo ao SODAN, sua plataforma confiável para monitorar e gerenciar o status de treinamentos!</p>
          </Col>
          <Col md={4}>
            <h5>Entre em contato</h5>
            <p>Estamos aqui para ajudar! Se você tiver alguma dúvida ou precisar de assistência, não hesite em entrar em contato conosco. Agradecemos por escolher o SODAN e estamos ansiosos para ajudar você a alcançar seus objetivos de treinamento.</p>
          </Col>
          <Col md={4}>
            <h5>Contatos</h5>
            <p><FaPhone /> (XX) XXXXX-XXXX</p>
            <p><FaInstagram /> @instagram</p>
          </Col>
        </Row>
        <Row>
          <Col className="text-center">
            <p>© 2024 Sodan. Todos os direitos reservados.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;

