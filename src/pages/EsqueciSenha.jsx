import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/esm/Container';
import style from './EsqueciSenha.module.css'
import { Link } from 'react-router-dom';

const EsqueciSenha = () => {
  return (
    <div className={style.Tudo}>
      
      <img src="./LogoSodan.png" alt="" width={300} height={240}/>

      <Container className={style.container}>
       <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label className={style.myEmail}>Email</Form.Label>
        <Form.Control className={style.txtLogin} type="email" placeholder="" />
        <Form.Text className="text-muted">
        </Form.Text>
      </Form.Group>

      <Button className={style.btn} variant="primary" type="submit">
        Enviar
      </Button>
      <br />
      <Link to="/">Já tenho Login</Link>
    </Form>
    </Container>
    <div>
      
    </div>
    </div>
    
  )
}

export default EsqueciSenha;