import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/esm/Container';
import style from './MyLogin.module.css'

const MyLogin = () => {
  return (
    <div className={style.Tudo}>
      
      <img src="./LogoSodan.png" alt="" width={300} height={240}/>

      <Container className={style.container}>
       <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label className={style.myEmail}>Login</Form.Label>
        <Form.Control className={style.txtLogin} type="email" placeholder="" />
        <Form.Text className="text-muted">
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label className={style.mySenha}>Senha</Form.Label>
        <Form.Control className={style.txtSenha} type="password" placeholder="" />
      </Form.Group>
      <Button className={style.btn} variant="primary" type="submit">
        Entrar
      </Button>
      <br />
      <a href="">Esqueci a senha</a>
    </Form>
    </Container>
    <div>
      
    </div>
    </div>
    
  )
}

export default MyLogin
