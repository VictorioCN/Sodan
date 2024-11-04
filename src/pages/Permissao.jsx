import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import style from '../css/Permissao.module.css'
import Container from 'react-bootstrap/esm/Container';

const Permissao = () => {
  return (
    <div className={style.div}>
      <Container className={style.container}>
  <Form className={style.form}>
    <h1>Permissões do Técnico</h1>
    <Form.Group className="mb-3" controlId="formBasicMatricula">
        <Form.Label className={style.label}>N° Matrícula*</Form.Label>
        <Form.Control className={style.input} type="number"/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicNome">
        <Form.Label className={style.label}>Nome Completo*</Form.Label>
        <Form.Control className={style.input} type="text"/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicCPF">
        <Form.Label className={style.label}>CPF*</Form.Label>
        <Form.Control className={style.input} type="text"/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicNomeUsuario">
        <Form.Label className={style.label}>Nome de Usuário</Form.Label>
        <Form.Control className={style.input} type="text"/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicSenha">
        <Form.Label className={style.label}>Senha</Form.Label>
        <Form.Control className={style.input} type="password"/>
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