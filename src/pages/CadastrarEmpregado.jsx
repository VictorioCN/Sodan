import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import Container from 'react-bootstrap/esm/Container';
import Modal from 'react-bootstrap/Modal';
import style from '../css/Empregado.module.css';

const CadastrarEmpregado = () => {
  // Estado para armazenar os dados do formulário
  const [formData, setFormData] = useState({
    matricula: '',
    nome: '',
    cpf: '',
    cidade: '',
    bairro: '',
    rua: '',
    numeroRua: '',
    email: '',
    telefone: '',
    dataNascimento: '',
    dataAdmissao: '',
    treinamentos: []  // Array de objetos para armazenar status de cada treinamento
  });

  // Estado para armazenar os dados dos treinamentos
  const [treinamentos, setTreinamentos] = useState([]);

  // Estado para controlar o modal
  const [showModal, setShowModal] = useState(false);

  // Função para buscar os treinamentos do backend
  const fetchTreinamentos = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/empregado/treinamentos');
      const treinamentosComStatus = response.data.map(treinamento => ({
        ...treinamento, // Inclui as propriedades do treinamento
        status: '' // Adiciona um status inicial vazio
      }));
      setTreinamentos(treinamentosComStatus);
      // Inicializa os treinamentos no formData
      setFormData(prevFormData => ({
        ...prevFormData,
        treinamentos: treinamentosComStatus.map(treinamento => ({
          idTreinamento: treinamento.ID_TREINAMENTO,
          status: ''
        }))
      }));
    } catch (error) {
      console.error('Erro ao buscar treinamentos:', error);
    }
  };

  // Função para atualizar o estado do formulário
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Função para atualizar o status de cada treinamento selecionado
  const handleTreinamentoChange = (treinamentoIndex, status) => {
    const newTreinamentos = [...formData.treinamentos];
    newTreinamentos[treinamentoIndex] = {
      ...newTreinamentos[treinamentoIndex], 
      status: status  
    };

    setFormData({
      ...formData,
      treinamentos: newTreinamentos,
    });
  };

  // Função que será chamada ao tentar submeter o formulário
  const handleSubmit = (e) => {
    e.preventDefault();
    setShowModal(true);  // Exibe o modal de confirmação
  };

  // Função para confirmar o cadastro
  const confirmarCadastro = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/empregado/cadastrar', formData);
      setShowModal(false);  // Fecha o modal
      alert('Empregado cadastrado com sucesso!');
      // Limpa o formulário após o cadastro bem-sucedido
      setFormData({
        matricula: '',
        nome: '',
        cpf: '',
        cidade: '',
        bairro: '',
        rua: '',
        numeroRua: '',
        email: '',
        telefone: '',
        dataNascimento: '',
        dataAdmissao: '',
        treinamentos: []
      });
    } catch (error) {
      console.error(error);
      alert('Erro ao cadastrar empregado!');  // Exibe um erro genérico
    }
  };

  // Função para cancelar o cadastro
  const cancelarCadastro = () => {
    setShowModal(false);  // Fecha o modal sem realizar nenhuma ação
  };

  // Carrega os treinamentos quando o componente é montado
  useEffect(() => {
    fetchTreinamentos();
  }, []);

  return (
    <Container className={style.container}>
      <Form onSubmit={handleSubmit} className={style.form}>
        <h1 className="text-center">Cadastro do Empregado</h1>

        {/* Dados do empregado */}
        <Form.Group className="mb-3" controlId="formBasicMatricula">
          <Form.Label className={style.label}>N° Matrícula*</Form.Label>
          <Form.Control
            type="number"
            name="matricula"
            value={formData.matricula}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicNome">
          <Form.Label className={style.label}>Nome Completo*</Form.Label>
          <Form.Control
            type="text"
            name="nome"
            value={formData.nome}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicCPF">
          <Form.Label className={style.label}>CPF*</Form.Label>
          <Form.Control
            type="text"
            name="cpf"
            value={formData.cpf}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        {/* Endereço */}
        <hr/>
        <div className="d-flex justify-content-center mb-3">
          <Form.Group className="me-2" controlId="formBasicRua">
            <Form.Label className={style.label}>Rua*</Form.Label>
            <Form.Control
              type="text"
              name="rua"
              value={formData.rua}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formBasicNumero">
            <Form.Label className={style.label}>N°*</Form.Label>
            <Form.Control
              type="text"
              name="numeroRua"
              value={formData.numeroRua}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
        </div>

        <div className="d-flex justify-content-center mb-3">
          <Form.Group className="me-2" controlId="formBasicCidade">
            <Form.Label className={style.label}>Cidade*</Form.Label>
            <Form.Control
              type="text"
              name="cidade"
              value={formData.cidade}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formBasicBairro">
            <Form.Label className={style.label}>Bairro*</Form.Label>
            <Form.Control
              type="text"
              name="bairro"
              value={formData.bairro}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
        </div>

        {/* Dados de contato */}
        <hr/>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label className={style.label}>Email*</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicTelefone">
          <Form.Label className={style.label}>Telefone*</Form.Label>
          <Form.Control
            type="tel"
            name="telefone"
            value={formData.telefone}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        {/* Data de nascimento e admissão */}
        <div className="d-flex justify-content-center mb-3">
          <Form.Group className="me-2" controlId="formBasicDataNascimento">
            <Form.Label className={style.label}>Data de Nascimento*</Form.Label>
            <Form.Control
              type="date"
              name="dataNascimento"
              value={formData.dataNascimento}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formBasicDataAdmissao">
            <Form.Label className={style.label}>Data de Admissão*</Form.Label>
            <Form.Control
              type="date"
              name="dataAdmissao"
              value={formData.dataAdmissao}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
        </div>

        {/* Treinamentos */}
        <hr/>
        <h1>Treinamentos</h1>
        {treinamentos.length > 0 && formData.treinamentos.map((treinamento, index) => (
          <Form.Group key={index} className="mb-3">
            <Form.Label className={style.label}>{treinamentos[index].NOME_TREINAMENTO}</Form.Label>
            <Form.Control
              as="select"
              value={treinamento.status}
              onChange={(e) => handleTreinamentoChange(index, e.target.value)}
              required
            >
              <option value="">Selecione o Status</option>
              <option value="Concluído">Concluído</option>
              <option value="Em andamento">Em andamento</option>
              <option value="Pendente">Pendente</option>
            </Form.Control>
          </Form.Group>
        ))}

        {/* Botão de submit */}
        <Button variant="primary" type="submit">
          Cadastrar Empregado
        </Button>
      </Form>

      {/* Modal de confirmação */}
      <Modal show={showModal} onHide={cancelarCadastro}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Cadastro</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Você tem certeza que deseja cadastrar este empregado?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cancelarCadastro}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={confirmarCadastro}>
            Confirmar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default CadastrarEmpregado;