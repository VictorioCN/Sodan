import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import style from './Permissao.module.css'
import Container from 'react-bootstrap/esm/Container';
import MyNavBar from '../components/MyNavBar.jsx';

const Permissao = () => {
  return (
    <div className={style.div}>
      <MyNavBar/>
      <Container className={style.container}>
  <Form className={style.form}>
    <h1>Permissões do Gerente</h1>
      <Form.Group className={style.input} controlId="formBasicID">
        <Form.Label className={style.Label}>N° Matricula*</Form.Label>
        <Form.Control type="text"/>
      </Form.Group>

      <Form.Group className={style.input} controlId="formBasicNome">
        <Form.Label className={style.Label}>Nome completo*</Form.Label>
        <Form.Control type="text"/>
      </Form.Group>

      <Form.Group className={style.input} controlId="formBasicCPF">
        <Form.Label className={style.Label}>CPF*</Form.Label>
        <Form.Control type="text"/>
      </Form.Group>

      <Form.Group className={style.input} controlId="formBasicUsuario">
        <Form.Label className={style.Label}>Nome de Usuário</Form.Label>
        <Form.Control type="text"/>
      </Form.Group>

      <Form.Group className={style.input} controlId="formBasicSenha">
        <Form.Label className={style.Label}>Senha</Form.Label>
        <Form.Control type="password"/>
      </Form.Group>
      <br />
      <label className={style.Label_permissao}>Permissão</label>
      <Form.Select className={style.input} aria-label="Default select example">
        <option>Administrador</option>
        <option>Técnico</option>
    </Form.Select>
      <Button variant="primary" type="submit" className={style.btn_adicionar}>
        Adicionar
      </Button>
    </Form>
    </Container>
    </div>
  )
}

export default Permissao