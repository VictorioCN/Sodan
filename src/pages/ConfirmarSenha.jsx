import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/esm/Container';
import style from '../css/ConfirmarSenha.module.css';
import { Link } from 'react-router-dom';

const ConfirmacaoSenha = () => {
  return (
    <div className={style.Tudo}>
      <img src="./LogoSodan.png" alt="" width={300} height={240} />

      <Container className={style.container}>
        <h2>Confirmação de Senha</h2>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label className={style.mySenha}>Nova Senha</Form.Label>
            <Form.Control className={style.txtSenha} type="password" placeholder="Digite sua nova senha" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
            <Form.Label className={style.mySenha}>Confirme a Senha</Form.Label>
            <Form.Control className={style.txtSenha} type="password" placeholder="Confirme sua nova senha" />
          </Form.Group>

          <Button className={style.btn} variant="primary" type="submit">
            Confirmar
          </Button>
          <br />
          <Link to="/">Já tenho Login</Link>
        </Form>
      </Container>
    </div>
  );
};

export default ConfirmacaoSenha;