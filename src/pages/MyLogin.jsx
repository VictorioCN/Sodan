import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/esm/Container';
import style from '../css/MyLogin.module.css';
import { Link } from 'react-router-dom';

const MyLogin = () => {
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  // Função para lidar com a submissão do formulário
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Faz uma requisição GET para obter a lista de usuários
      const response = await axios.get('http://localhost:5000/users');
      const users = response.data;

      // Verifica se existe um usuário com o login e a senha fornecidos
      const user = users.find((user) => user.login === login && user.senha === senha);

      if (user) {
        // Se o login for bem-sucedido, redireciona para a página Home
        navigate('/buscar');
      } else {
        alert('Login ou senha incorretos!');
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
    }
  };

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
    </div>
  );
};

export default MyLogin;
