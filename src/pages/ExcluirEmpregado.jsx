import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { FaSearch } from 'react-icons/fa';
import axios from 'axios';
import style from '../css/Empregado.module.css';
import Container from 'react-bootstrap/esm/Container';

const ExcluirEmpregado = () => {
  const [matriculaBusca, setMatriculaBusca] = useState('');
  const [empregado, setEmpregado] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const formatDate = (date) => {
    if (!date) return '';
    const d = new Date(date);
    return d.toISOString().split('T')[0]; // Formato "YYYY-MM-DD"
  };

  const buscarEmpregado = async () => {
    if (!matriculaBusca) {
      alert('Por favor, insira o número da matrícula');
      return;
    }

    setLoading(true);
    setErrorMessage('');

    try {
      const response = await axios.get(`http://localhost:5000/api/empregado/${matriculaBusca}`);
      const empregado = response.data;
      setEmpregado(empregado);
      alert('Empregado encontrado!');
    } catch (error) {
      console.error(error);
      setErrorMessage('Erro ao buscar empregado. Verifique a matrícula ou tente novamente.');
      alert('Erro ao buscar empregado. Verifique a matrícula ou tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const excluirEmpregado = async () => {
    setShowConfirmModal(false); // Fecha o modal de confirmação
    setLoading(true);
    setErrorMessage('');

    try {
      const response = await axios.delete(`http://localhost:5000/api/empregado/empregado/${empregado.MAT_EMPREGADO}`);
      if (response.status === 200) {
        setEmpregado(null);
        setMatriculaBusca('');
        setShowSuccessModal(true); // Abre o modal de sucesso
      }
    } catch (error) {
      console.error(error);
      setErrorMessage('Erro ao excluir empregado. Tente novamente mais tarde.');
      alert('Erro ao excluir empregado. Tente novamente mais tarde.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={style.div}>
      <Container className={style.container}>
        <div className="d-flex justify-content-center mb-4">
          <Form className="d-flex">
            <Form.Control
              type="text"
              placeholder="Buscar Empregado (Matrícula)"
              className={`me-2 ${style.input}`}
              value={matriculaBusca}
              onChange={(e) => setMatriculaBusca(e.target.value)}
              aria-label="Buscar Empregado"
              disabled={loading}
            />
            <Button 
              variant="outline-secondary" 
              className={style.btn_buscar} 
              onClick={buscarEmpregado}
              disabled={loading}
            >
              <FaSearch />
            </Button>
          </Form>
        </div>

        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

        {empregado && (
          <div>
            <h1 className="text-center">Exclusão do Empregado</h1>
            <Form className={style.form}>
              <Form.Group className="mb-3" controlId="formBasicMatricula">
                <Form.Label className={style.label}>N° Matrícula*</Form.Label>
                <Form.Control
                  className={style.inputInfo}
                  type="text"
                  value={empregado.MAT_EMPREGADO}
                  readOnly
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicNome">
                <Form.Label className={style.label}>Nome Completo*</Form.Label>
                <Form.Control
                  className={style.inputInfo}
                  type="text"
                  value={empregado.NOME_EMPREGADO}
                  readOnly
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicCpf">
                <Form.Label className={style.label}>CPF*</Form.Label>
                <Form.Control
                  className={style.inputInfo}
                  type="text"
                  value={empregado.CPF_EMPREGADO}
                  readOnly
                />
              </Form.Group>

              <hr />
              <div className="d-flex justify-content-between mb-3">
                <Form.Group className="me-2" controlId="formBasicCidade">
                  <Form.Label className={style.label}>Cidade*</Form.Label>
                  <Form.Control
                    className={style.inputInfo1}
                    type="text"
                    value={empregado.CIDADE}
                    readOnly
                  />
                </Form.Group>

                <Form.Group controlId="formBasicBairro">
                  <Form.Label className={style.label}>Bairro*</Form.Label>
                  <Form.Control
                    className={style.inputInfo1}
                    type="text"
                    value={empregado.BAIRRO}
                    readOnly
                  />
                </Form.Group>
              </div>

              <div className="d-flex justify-content-between mb-3">
                <Form.Group className="me-2" controlId="formBasicRua">
                  <Form.Label className={style.label}>Rua*</Form.Label>
                  <Form.Control
                    className={style.inputInfo1}
                    type="text"
                    value={empregado.RUA}
                    readOnly
                  />
                </Form.Group>

                <Form.Group controlId="formBasicNumeroRua">
                  <Form.Label className={style.label}>Número da Rua*</Form.Label>
                  <Form.Control
                    className={style.inputInfo1}
                    type="text"
                    value={empregado.NUM_RUA}
                    readOnly
                  />
                </Form.Group>
              </div>
              <hr/>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label className={style.label}>Email*</Form.Label>
                <Form.Control
                  className={style.inputInfo}
                  type="email"
                  value={empregado.EMAIL_EMPREGADO}
                  readOnly
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicTelefone">
                <Form.Label className={style.label}>Telefone*</Form.Label>
                <Form.Control
                  className={style.inputInfo}
                  type="text"
                  value={empregado.TEL_EMPREGADO}
                  readOnly
                />
              </Form.Group>

              <div className="d-flex justify-content-between mb-3">
                <Form.Group className="me-2" controlId="formBasicDataNascimento">
                  <Form.Label className={style.label}>Data de Nascimento*</Form.Label>
                  <Form.Control
                    className={style.inputInfo1}
                    type="date"
                    value={formatDate(empregado.DT_NASCIMENTO)}
                    readOnly
                  />
                </Form.Group>

                <Form.Group controlId="formBasicDataAdmissao">
                  <Form.Label className={style.label}>Data de Admissão*</Form.Label>
                  <Form.Control
                    className={style.inputInfo1}
                    type="date"
                    value={formatDate(empregado.DT_ADMISSAO)}
                    readOnly
                  />
                </Form.Group>
              </div>

              <div className="d-flex justify-content-center mt-3">
                <Button
                  variant="danger"
                  onClick={() => setShowConfirmModal(true)}
                  className={`me-2 ${style.btn_cadastrar}`}
                  disabled={loading}
                >
                  {loading ? 'Excluindo...' : 'Excluir'}
                </Button>
              </div>
            </Form>
          </div>
        )}

        {/* Modal de Confirmação */}
        <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Confirmar Exclusão</Modal.Title>
          </Modal.Header>
          <Modal.Body>Tem certeza de que deseja excluir este empregado?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowConfirmModal(false)}>
              Cancelar
            </Button>
            <Button variant="danger" onClick={excluirEmpregado}>
              Confirmar
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Modal de Sucesso */}
        <Modal show={showSuccessModal} onHide={() => setShowSuccessModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Sucesso</Modal.Title>
          </Modal.Header>
          <Modal.Body>Empregado excluído com sucesso!</Modal.Body>
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

export default ExcluirEmpregado;