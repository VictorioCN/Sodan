import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { FaSearch } from 'react-icons/fa';
import axios from 'axios';
import style from '../css/Empregado.module.css';
import Container from 'react-bootstrap/esm/Container';

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

  const [treinamentos, setTreinamentos] = useState([]);
  const [empregadoEncontrado, setEmpregadoEncontrado] = useState(false);

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
          status: treinamento.status || ''  // Garante que o status é inicializado corretamente
        })) : [] // Garante que a lista de treinamentos não seja null ou undefined
      });

      setEmpregadoEncontrado(true);
      alert('Empregado encontrado!');
    } catch (error) {
      console.error(error);
      alert('Erro ao buscar empregado. Verifique a matrícula ou tente novamente.');
    }
  };

  // Função para atualizar o empregado
  const atualizarEmpregado = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`http://localhost:5000/api/empregado/${formData.matricula}`, formData);
      alert('Empregado atualizado com sucesso!');
    } catch (error) {
      console.error(error);
      alert('Erro ao atualizar empregado.');
    }
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
    const status = e.target.value;

    // Atualiza o status do treinamento no array de treinamentos
    setFormData((prevState) => {
      const treinamentosAtualizados = prevState.treinamentos.map((treinamento) => {
        if (treinamento.ID_TREINAMENTO === idTreinamento) {
          return { ...treinamento, status }; // Atualiza o status do treinamento específico
        }
        return treinamento;
      });
      return { ...prevState, treinamentos: treinamentosAtualizados };
    });
  };

  // Carrega os treinamentos ao carregar o componente
  useEffect(() => {
    const fetchTreinamentos = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/empregado/treinamentos');
        setTreinamentos(response.data);
      } catch (error) {
        console.error('Erro ao carregar treinamentos:', error);
      }
    };

    fetchTreinamentos();
  }, []);

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

        <Tabs defaultActiveKey="atualizar" id="uncontrolled-tab-example" className="mb-3">
          <Tab eventKey="atualizar" title="Atualização do Empregado">
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
                  <Form.Group controlId="formBasicNumero">
                    <Form.Label className={style.label}>N°*</Form.Label>
                    <Form.Control
                      className={style.input}
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
                      className={style.input}
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
                      className={style.input}
                      type="text"
                      name="bairro"
                      value={formData.bairro}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>
                </div>

                <hr />
                {/* Campos de contato */}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label className={style.label}>Email*</Form.Label>
                  <Form.Control
                    className={style.inputInfo}
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
                    className={style.inputInfo}
                    type="text"
                    name="telefone"
                    value={formData.telefone}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>

                {/* Campos de data de nascimento e admissão */}
                <div className="d-flex justify-content-center mb-3">
                  <Form.Group className="me-2" controlId="formBasicDataNascimento">
                    <Form.Label className={style.label}>Data de Nascimento*</Form.Label>
                    <Form.Control
                      className={style.input}
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
                      className={style.input}
                      type="date"
                      name="dataAdmissao"
                      value={formData.dataAdmissao}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>
                </div>

                {/* Seleção de treinamentos */}
                <h1 className="text-center mb-3">Treinamentos</h1>
                {treinamentos.map((treinamento) => {
                  const empregadoTreinamento = formData.treinamentos.find(
                    (item) => item.ID_TREINAMENTO === treinamento.ID_TREINAMENTO
                  );

                  return (
                    <Form.Group key={treinamento.ID_TREINAMENTO} className="mb-3">
                      <Form.Label>{treinamento.NOME_TREINAMENTO}</Form.Label>
                      <Form.Control
                        as="select"
                        value={empregadoTreinamento ? empregadoTreinamento.status : ''}
                        onChange={(e) => handleTreinamentoChange(e, treinamento.ID_TREINAMENTO)}
                      >
                        <option value="">Selecione o status</option>
                        <option value="Concluído">Concluído</option>
                        <option value="Em Andamento">Em Andamento</option>
                        <option value="Pendente">Pendente</option>
                      </Form.Control>
                    </Form.Group>
                  );
                })}

                {/* Botão de atualização */}
                <div className="d-flex justify-content-center mt-3">
                  <Button variant="warning" type="submit" className={`me-2 ${style.btn_cadastrar}`}>
                    Atualizar
                  </Button>
                </div>
              </Form>
            )}
          </Tab>
        </Tabs>
      </Container>
    </div>
  );
};

export default AtualizarEmpregado;
