import { useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/esm/Container';
import Modal from 'react-bootstrap/Modal'; // Importando o Modal
import style from '../css/Permissao.module.css';

const Permissao = () => {
  const [formData, setFormData] = useState({
    nome: '',
    cpf: '',
    nomeUsuario: '',
    senha: '',
    tipo: 'administrador',
  });

  const [showModal, setShowModal] = useState(false); // Controle do Modal
  const [modalMessage, setModalMessage] = useState(''); // Mensagem do Modal
  const [modalTitle, setModalTitle] = useState(''); // Título do Modal

  // Função para lidar com as mudanças nos campos
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Função para validar os campos obrigatórios
  const validateForm = () => {
    const { nome, cpf, nomeUsuario, senha } = formData;

    if (!nome) return 'Nome Completo é obrigatório!';
    if (!cpf) return 'CPF é obrigatório!';
    if (!nomeUsuario) return 'Nome de Usuário é obrigatório!';
    if (!senha) return 'Senha é obrigatória!';
    return '';
  };

  // Função para lidar com a submissão do formulário
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validando os campos
    const validationMessage = validateForm();
    if (validationMessage) {
      setModalTitle('Erro');
      setModalMessage(validationMessage);
      setShowModal(true); // Exibe o Modal com o erro
      return;
    }

    // Se a validação passar, tenta cadastrar o usuário
    try {
      const response = await axios.post('http://localhost:5000/usuarios/cadastrar', formData);
      setModalTitle('Sucesso');
      setModalMessage(response.data.message || 'Cadastro realizado com sucesso!');
      setShowModal(true);

      // Limpar os campos após o cadastro bem-sucedido
      setFormData({
        nome: '',
        cpf: '',
        nomeUsuario: '',
        senha: '',
        tipo: 'administrador',
      });
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);
      setModalTitle('Erro');
      setModalMessage('Erro ao cadastrar usuário');
      setShowModal(true);
    }
  };

  // Função para fechar o modal
  const handleCloseModal = () => setShowModal(false);

  return (
    <Container className={style.container}>
      <Form onSubmit={handleSubmit} className={style.form}>
        <h1>Cadastro de Usuário</h1>

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
          <Form.Label className={style.label}>Nome de Usuário*</Form.Label>
          <Form.Control
            className={style.input}
            type="text"
            name="nomeUsuario"
            value={formData.nomeUsuario}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className={style.label}>Senha*</Form.Label>
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

      {/* Modal de Sucesso ou Erro */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Permissao;