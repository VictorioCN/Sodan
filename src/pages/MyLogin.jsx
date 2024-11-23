import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/esm/Container';
import Modal from 'react-bootstrap/Modal'; // Importando o Modal
import style from '../css/MyLogin.module.css';
import { Link } from 'react-router-dom';

const MyLogin = () => {
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');
  const [showModal, setShowModal] = useState(false); // Estado para controlar a exibição do Modal
  const [modalMessage, setModalMessage] = useState(''); // Mensagem do Modal
  const [modalTitle, setModalTitle] = useState(''); // Título do Modal
  const [isLoginSuccess, setIsLoginSuccess] = useState(false); // Controle para diferenciar sucesso de erro
  const navigate = useNavigate();

  // Função para lidar com a submissão do formulário
  const handleLogin = async (e) => {
    e.preventDefault();

    // Validação para verificar se os campos estão vazios
    if (!login || !senha) {
      setModalTitle('Erro');
      setModalMessage('Os campos de login e senha não podem estar vazios!');
      setIsLoginSuccess(false);
      setShowModal(true); // Exibe o Modal com a mensagem de erro
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/usuarios/login', {
        nomeUsuario: login,
        senha,
      });

      if (response.status === 200) {
        // Exibe o modal de sucesso
        setModalTitle('Sucesso');
        setModalMessage('Login bem-sucedido!');
        setIsLoginSuccess(true);
        setShowModal(true);

        // Redireciona após o modal fechar (usando um delay)
        setTimeout(() => {
          navigate('/buscar'); // Redireciona para a página Home
        }, 2000); // 2 segundos de delay para o usuário ver o sucesso
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      setModalTitle('Erro');
      setModalMessage('Usuário ou senha incorretos!');
      setIsLoginSuccess(false);
      setShowModal(true);
    }
  };

  // Função para fechar o modal
  const handleCloseModal = () => setShowModal(false);

  return (
    <div className={style.Tudo}>
      <img src="./LogoSodan.png" alt="Logo" width={550} height={440} />

      <Container className={style.container}>
        <Form onSubmit={handleLogin}>
          <Form.Group className="mb-3" controlId="formBasicLogin">
            <Form.Label className={style.myEmail}>Login</Form.Label>
            <Form.Control
              className={style.txtLogin}
              type="text"
              placeholder="Digite seu Login"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label className={style.mySenha}>Senha</Form.Label>
            <Form.Control
              className={style.txtSenha}
              type="password"
              placeholder="Digite sua Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
          </Form.Group>
          <Button className={style.btn} variant="primary" type="submit">
            Entrar
          </Button>
          <br />
          <Link to="/EsqueciSenha" className={style.esqueciS}>Esqueci a Senha</Link>
        </Form>
      </Container>

      {/* Modal de Erro ou Sucesso */}
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
    </div>
  );
};

export default MyLogin;
