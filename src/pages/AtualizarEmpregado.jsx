import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { FaSearch } from 'react-icons/fa';
import axios from 'axios';
import style from '../css/Empregado.module.css';
import Container from 'react-bootstrap/esm/Container';
import Modal from 'react-bootstrap/Modal';

const AtualizarEmpregado = () => {
  const [matriculaBusca, setMatriculaBusca] = useState('');
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
    treinamentos: [] // Estado para armazenar os treinamentos
  });

  const [empregadoEncontrado, setEmpregadoEncontrado] = useState(false);

  // Estado para controlar os modais
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Função para buscar empregado
  const buscarEmpregado = async () => {
    if (!matriculaBusca) {
      alert('Por favor, insira o número da matrícula');
      return;
    }

    try {
      const response = await axios.get(`http://localhost:5000/api/empregado/${matriculaBusca}`);
      const empregado = response.data;

      // Formatar as datas para o formato 'YYYY-MM-DD'
      const dataNascimentoFormatada = new Date(empregado.DT_NASCIMENTO).toISOString().split('T')[0];
      const dataAdmissaoFormatada = new Date(empregado.DT_ADMISSAO).toISOString().split('T')[0];

      // Preencher os campos do formulário com os dados do empregado
      setFormData({
        matricula: empregado.MAT_EMPREGADO,
        nome: empregado.NOME_EMPREGADO,
        cpf: empregado.CPF_EMPREGADO,
        cidade: empregado.CIDADE,
        bairro: empregado.BAIRRO,
        rua: empregado.RUA,
        numeroRua: empregado.NUM_RUA,
        email: empregado.EMAIL_EMPREGADO,
        telefone: empregado.TEL_EMPREGADO,
        dataNascimento: dataNascimentoFormatada, // Data formatada
        dataAdmissao: dataAdmissaoFormatada, // Data formatada
        treinamentos: empregado.treinamentos ? empregado.treinamentos.map((treinamento) => ({
          ...treinamento,  // Preserva todas as informações
          STATUS_TREINAMENTO: treinamento.STATUS_TREINAMENTO || ''  // Corrige o nome do campo
        })) : [] // Garante que a lista de treinamentos não seja null ou undefined
      });

      setEmpregadoEncontrado(true);
    } catch (error) {
      console.error(error);
      alert('Erro ao buscar empregado. Verifique a matrícula ou tente novamente.');
    }
  };

  // Função para atualizar o empregado
  const atualizarEmpregado = async (e) => {
    e.preventDefault();

    // Valida se os treinamentos possuem um ID correto
    const treinamentosAtualizados = formData.treinamentos.map((treinamento) => {
      if (!treinamento.ID_TREINAMENTO) {
        // Se o ID do treinamento for inválido, lança um erro
        alert('ID do treinamento não pode ser nulo ou indefinido');
        throw new Error('ID do treinamento não pode ser nulo ou indefinido');
      }
      return treinamento; // Retorna o treinamento com ID correto
    });

    // Exibe o modal de confirmação
    setShowConfirmModal(true);
  };

  // Função para confirmar a atualização (chamada quando o modal de confirmação for aceito)
  const handleConfirmarAtualizacao = async () => {
    try {
      await axios.put(`http://localhost:5000/api/empregado/${formData.matricula}`, {
        ...formData,
        treinamentos: formData.treinamentos // Envia os treinamentos com os dados completos
      });

      setShowConfirmModal(false); // Fecha o modal de confirmação
      setShowSuccessModal(true); // Exibe o modal de sucesso

      // Limpar o formulário após a atualização
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
        treinamentos: [] // Limpa os treinamentos
      });
      setEmpregadoEncontrado(false); // Limpa o estado de empregado encontrado
    } catch (error) {
      console.error(error);
      alert('Erro ao atualizar empregado.');
    }
  };

  // Função para cancelar a atualização
  const handleCancelarAtualizacao = () => {
    setShowConfirmModal(false); // Fecha o modal de confirmação sem realizar a atualização
  };

  // Atualiza o valor dos campos no formulário
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Função para lidar com a mudança de status dos treinamentos
  const handleTreinamentoChange = (e, idTreinamento) => {
    const STATUS_TREINAMENTO = e.target.value;

    // Atualiza o status do treinamento no array de treinamentos
    setFormData((prevState) => {
      const treinamentosAtualizados = prevState.treinamentos.map((treinamento) => {
        if (treinamento.ID_TREINAMENTO === idTreinamento) {
          return { ...treinamento, STATUS_TREINAMENTO }; // Atualiza o status do treinamento específico
        }
        return treinamento;
      });
      return { ...prevState, treinamentos: treinamentosAtualizados };
    });
  };

  return (
    <div className={style.div}>
      <Container className={style.container}>
        {/* Campo de busca */}
        <div className="d-flex justify-content-center mb-4">
          <Form className="d-flex">
            <Form.Control
              type="text"
              placeholder="Buscar Empregado (Matrícula)"
              className={`me-2 ${style.input}`}
              value={matriculaBusca}
              onChange={(e) => setMatriculaBusca(e.target.value)}
              aria-label="Buscar Empregado"
            />
            <Button variant="outline-secondary" className={style.btn_buscar} onClick={buscarEmpregado}>
              <FaSearch />
            </Button>
          </Form>
        </div>

        <Container defaultActiveKey="atualizar" id="uncontrolled-tab-example" className="mb-3">
          <div eventKey="atualizar" title="Atualização do Empregado">
            {empregadoEncontrado && (
              <Form className={style.form} onSubmit={atualizarEmpregado}>
                <h1 className="text-center">Atualização do Empregado</h1>

                {/* Campos do formulário */}
                <Form.Group className="mb-3" controlId="formBasicMatricula">
                  <Form.Label className={style.label}>N° Matrícula*</Form.Label>
                  <Form.Control
                    className={style.inputInfo}
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
                    className={style.inputInfo}
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
                    className={style.inputInfo}
                    type="text"
                    name="cpf"
                    value={formData.cpf}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>

                {/* Campos de endereço */}
                <hr />
                <div className="d-flex justify-content-center mb-3">
                  <Form.Group className="me-2" controlId="formBasicRua">
                    <Form.Label className={style.label}>Rua*</Form.Label>
                    <Form.Control
                      className={style.input}
                      type="text"
                      name="rua"
                      value={formData.rua}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group controlId="formBasicNumeroRua">
                    <Form.Label className={style.label}>N° Rua*</Form.Label>
                    <Form.Control
                      className={style.input}
                      type="number"
                      name="numeroRua"
                      value={formData.numeroRua}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>
                </div>

                {/* Campo de Data de Nascimento */}
                <Form.Group className="mb-3" controlId="formBasicNascimento">
                  <Form.Label className={style.label}>Data de Nascimento*</Form.Label>
                  <Form.Control
                    className={style.inputInfo}
                    type="date"
                    name="dataNascimento"
                    value={formData.dataNascimento}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>

                {/* Campos de Treinamentos */}
                <h2 className="text-center mb-3">Treinamentos</h2>
                {formData.treinamentos.map((treinamento) => (
                  <div key={treinamento.ID_TREINAMENTO}>
                    <Form.Group className="mb-3" controlId={`treinamento${treinamento.ID_TREINAMENTO}`}>
                      <Form.Label className={style.label}>{treinamento.NOME_TREINAMENTO}</Form.Label>
                      <Form.Control
                        className={style.select}
                        as="select"
                        value={treinamento.STATUS_TREINAMENTO}
                        onChange={(e) => handleTreinamentoChange(e, treinamento.ID_TREINAMENTO)}
                      >
                        <option value="Pendente">Pendente</option>
                        <option value="Concluído">Concluído</option>
                        <option value="Em andamento">Em Andamento</option>
                      </Form.Control>
                    </Form.Group>
                  </div>
                ))}

                <div className="d-flex justify-content-center mt-3">
                  <Button type="submit" variant="warning" className={`me-2 ${style.btn_cadastrar}`}>
                    Atualizar
                  </Button>
                </div>
              </Form>
            )}
          </div>
        </Container>

        {/* Modal de Confirmação */}
        <Modal show={showConfirmModal} onHide={handleCancelarAtualizacao}>
          <Modal.Header closeButton>
            <Modal.Title>Confirmar Atualização</Modal.Title>
          </Modal.Header>
          <Modal.Body>Você tem certeza que deseja atualizar os dados do empregado?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCancelarAtualizacao}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={handleConfirmarAtualizacao}>
              Confirmar
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Modal de Sucesso */}
        <Modal show={showSuccessModal} onHide={() => setShowSuccessModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Sucesso!</Modal.Title>
          </Modal.Header>
          <Modal.Body>Empregado atualizado com sucesso!</Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={() => setShowSuccessModal(false)}>
              Fechar
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
};

export default AtualizarEmpregado;
