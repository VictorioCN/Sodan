import { useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/esm/Container';
import style from '../css/Permissao.module.css';

const Permissao = () => {
  const [formData, setFormData] = useState({
    nome: '',
    cpf: '',
    nomeUsuario: '',
    senha: '',
    tipo: 'administrador',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log(formData); // Verifique se os dados estão corretos
    try {
      const response = await axios.post('http://localhost:5000/usuarios/cadastrar', formData);
      alert(response.data.message);
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);
      alert('Erro ao cadastrar usuário');
    }
  };  
  

  return (
    <Container className={style.container}>
      <Form  onSubmit={handleSubmit} className={style.form}>
        <h1>Permissões de Usuário</h1>

        <Form.Group className="mb-3">
          <Form.Label className={style.label}>Nome Completo*</Form.Label>
          <Form.Control
          className={style.input}
            type="text"
            name="nome"
            value={formData.nome}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className={style.label}>CPF*</Form.Label>
          <Form.Control
          className={style.input}
            type="text"
            name="cpf"
            value={formData.cpf}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className={style.label}>Nome de Usuário</Form.Label>
          <Form.Control
          className={style.input}
            type="text"
            name="nomeUsuario"
            value={formData.nomeUsuario}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className={style.label}>Senha</Form.Label>
          <Form.Control
          className={style.input}
            type="password"
            name="senha"
            value={formData.senha}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Label className={style.label}>Tipo</Form.Label>
        <Form.Select
          name="tipo"
          value={formData.tipo}
          onChange={handleInputChange}
          className={style.input}
        >
          <option value="administrador">Administrador</option>
          <option value="técnico">Técnico</option>
        </Form.Select>

        <Button variant="primary" type="submit" className={style.btn_adicionar}>
          Adicionar
        </Button>
      </Form>
    </Container>
  );
};

export default Permissao;