import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { FaSearch } from 'react-icons/fa';
import axios from 'axios';
import style from '../css/Empregado.module.css';
import Container from 'react-bootstrap/esm/Container';

const ExcluirEmpregado = () => {
  const [matriculaBusca, setMatriculaBusca] = useState('');
  const [empregado, setEmpregado] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const formatDate = (date) => {
    if (!date) return '';
    const d = new Date(date);
    return d.toISOString().split('T')[0]; // Formato "YYYY-MM-DD"
  };

  // Função para buscar o empregado
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
      setEmpregado(empregado);  // Atualiza o estado com os dados do empregado
      alert('Empregado encontrado!');
    } catch (error) {
      console.error(error);
      setErrorMessage('Erro ao buscar empregado. Verifique a matrícula ou tente novamente.');
      alert('Erro ao buscar empregado. Verifique a matrícula ou tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  // Função para excluir o empregado
  const excluirEmpregado = async () => {
    if (!empregado) {
      alert('Nenhum empregado encontrado para exclusão');
      return;
    }

    setLoading(true);
    setErrorMessage('');

    try {
      const response = await axios.delete(`http://localhost:5000/api/empregado/empregado/${empregado.MAT_EMPREGADO}`);
      if (response.status === 200) {
        alert('Empregado excluído com sucesso!');
        setEmpregado(null);  // Limpa o estado após a exclusão
        setMatriculaBusca('');  // Limpa a matrícula de busca
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

        {/* Mensagem de erro */}
        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

        {/* Formulário de exclusão */}
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

              {/* Campos "Cidade" e "Bairro" lado a lado */}
              <hr/>
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

              {/* Campos "Rua" e "Número da Rua" lado a lado */}
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

              {/* Campos "Data de Nascimento" e "Data de Admissão" lado a lado */}
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
                  onClick={excluirEmpregado} 
                  className={`me-2 ${style.btn_cadastrar}`}
                  disabled={loading}
                >
                  {loading ? 'Excluindo...' : 'Excluir'}
                </Button>
              </div>
            </Form>
          </div>
        )}
      </Container>
    </div>
  );
};

export default ExcluirEmpregado;

