import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/esm/Container';
import style from './MyLogin.module.css'
import { Link } from 'react-router-dom';

const MyLogin = () => {
  return (
    <div className={style.Tudo}>
      
      <img src="./LogoSodan.png" alt="" width={300} height={240}/>

      <Container className={style.container}>
       <Form>
      <Form.Group className="mb-3" controlId="formBasicLogin">
        <Form.Label className={style.myEmail}>Login</Form.Label>
        <Form.Control className={style.txtLogin} type="text" placeholder="Digite seu Login" />
        <Form.Text className="text-muted">
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label className={style.mySenha}>Senha</Form.Label>
        <Form.Control className={style.txtSenha} type="password" placeholder="Digite sua Senha" />
      </Form.Group>
      <Button className={style.btn} variant="primary" type="submit">
        Entrar
      </Button>
      <br />
      <Link to='/EsqueciSenha'>Esqueci a Senha</Link>
    </Form>
    </Container>
    <div>
      
    </div>
    </div>
    
  )
}

export default MyLogin
