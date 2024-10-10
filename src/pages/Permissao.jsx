import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import style from './Permissao.module.css'
import Container from 'react-bootstrap/esm/Container';



const Permissao = () => {
  return (
    <div className={style.div}>
      <Container className={style.container}>
<Form className={style.form}>
  <h1>Permissões do gerente</h1>
      <Form.Group className={style.input} controlId="formBasicEmail">
        <Form.Label className={style.Label}>N° Matricula*</Form.Label>
        <Form.Control type="text"/>
      </Form.Group>

      <Form.Group className={style.input} controlId="formBasicPassword">
        <Form.Label className={style.Label}>Nome completo*</Form.Label>
        <Form.Control type="text"/>
      </Form.Group>

      <Form.Group className={style.input} controlId="formBasicPassword">
        <Form.Label className={style.Label}>CPF*</Form.Label>
        <Form.Control type="text"/>
      </Form.Group>

      <Form.Group className={style.input} controlId="formBasicPassword">
        <Form.Label className={style.Label}>Nome do usuário</Form.Label>
        <Form.Control type="text"/>
      </Form.Group>

      <Form.Group className={style.input} controlId="formBasicPassword">
        <Form.Label className={style.Label}>Senha</Form.Label>
        <Form.Control type="password"/>
      </Form.Group>
<br />
      <Form.Select className={style.input} aria-label="Default select example">
      <option>Administrador</option>
      <option>Técnico</option>
    </Form.Select>
      <Button variant="primary" type="submit">
        Adicionar
      </Button>
    </Form>
    </Container>
    </div>
  )
}

export default Permissao