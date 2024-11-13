import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { FaSearch } from 'react-icons/fa';
import style from '../css/Empregado.module.css';
import Container from 'react-bootstrap/esm/Container';

const AtualizarEmpregado = () => {
  return (
    <div className={style.div}>
      <Container className={style.container}>
        {/* Campo de busca */}
        <div className="d-flex justify-content-center mb-4">
          <Form className="d-flex">
            <Form.Control
              type="text"
              placeholder="Buscar Empregado"
              className={`me-2 ${style.input}`}
              aria-label="Buscar Empregado"
            />
            <Button variant="outline-secondary" className={style.btn_buscar}>
              <FaSearch />
            </Button>
          </Form>
        </div>

        <Tabs defaultActiveKey="atualizar" id="uncontrolled-tab-example" className="mb-3">
          <Tab eventKey="atualizar" title="Atualização do Empregado">
            <Form className={style.form}>
              <h1 className="text-center">Atualização do Empregado</h1>

              <Form.Group className="mb-3" controlId="formBasicMatricula">
                <Form.Label className={style.label}>N° Matrícula*</Form.Label>
                <Form.Control className={style.inputInfo} type="number" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicNome">
                <Form.Label className={style.label}>Nome Completo*</Form.Label>
                <Form.Control className={style.inputInfo} type="text" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicCPF">
                <Form.Label className={style.label}>CPF*</Form.Label>
                <Form.Control className={style.inputInfo} type="text" />
              </Form.Group>
                <hr/>
              <div className="d-flex justify-content-center mb-3">
                <Form.Group className="me-2" controlId="formBasicRua">
                  <Form.Label className={style.label}>Rua*</Form.Label>
                  <Form.Control className={style.input} type="text" />
                </Form.Group>
                <Form.Group controlId="formBasicNumero">
                  <Form.Label className={style.label}>N°*</Form.Label>
                  <Form.Control className={style.input} type="text" />
                </Form.Group>
              </div>

              <div className="d-flex justify-content-center mb-3">
                <Form.Group className="me-2" controlId="formBasicCidade">
                  <Form.Label className={style.label}>Cidade*</Form.Label>
                  <Form.Control className={style.input} type="text" />
                </Form.Group>
                <Form.Group controlId="formBasicBairro">
                  <Form.Label className={style.label}>Bairro*</Form.Label>
                  <Form.Control className={style.input} type="text" />
                </Form.Group>
              </div>
                <hr/>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label className={style.label}>Email*</Form.Label>
                <Form.Control className={style.inputInfo} type="email" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicTelefone">
                <Form.Label className={style.label}>Telefone*</Form.Label>
                <Form.Control className={style.inputInfo} type="text" />
              </Form.Group>

              <div className="d-flex justify-content-center mb-3">
                <Form.Group className="me-2" controlId="formBasicDataNascimento">
                  <Form.Label className={style.label}>Data de Nascimento*</Form.Label>
                  <Form.Control className={style.input} type="date" />
                </Form.Group>
                <Form.Group controlId="formBasicDataAdmissao">
                  <Form.Label className={style.label}>Data de Admissão*</Form.Label>
                  <Form.Control className={style.input} type="date" />
                </Form.Group>
              </div>
            </Form>
          </Tab>

          <Tab eventKey="treinamentos" title="Treinamentos">
            <div className="text-center mt-3">
              <h2>Treinamentos Disponíveis</h2>

              <div className="mb-3">
                <h5 className={style.nomeTreinamento}>Treinamento de Operação de Máquinas e Equipamentos</h5>
                <Form.Check
                  type="radio"
                  label="Pendente"
                  name="treinamento1"
                  id="treinamento1Pendente"
                  className={style.pendente}
                />
                <Form.Check
                  type="radio"
                  label="Em Andamento"
                  name="treinamento1"
                  id="treinamento1EmAndamento"
                  className={style.emAndamento}
                />
                <Form.Check
                  type="radio"
                  label="Concluído"
                  name="treinamento1"
                  id="treinamento1Concluido"
                  className={style.concluido}
                />
              </div>
                <hr/>
              <div className="mb-3">
                <h5 className={style.nomeTreinamento}>Treinamento de Segurança no Trabalho</h5>
                <Form.Check
                  type="radio"
                  label="Pendente"
                  name="treinamento2"
                  id="treinamento2Pendente"
                  className={style.pendente}
                />
                <Form.Check
                  type="radio"
                  label="Em Andamento"
                  name="treinamento2"
                  id="treinamento2EmAndamento"
                  className={style.emAndamento}
                />
                <Form.Check
                  type="radio"
                  label="Concluído"
                  name="treinamento2"
                  id="treinamento2Concluido"
                  className={style.concluido}
                />
              </div>
                <hr/>
              <div className="mb-3">
                <h5 className={style.nomeTreinamento}>Treinamento de Gestão de Recursos Naturais</h5>
                <Form.Check
                  type="radio"
                  label="Pendente"
                  name="treinamento3"
                  id="treinamento3Pendente"
                  className={style.pendente}
                />
                <Form.Check
                  type="radio"
                  label="Em Andamento"
                  name="treinamento3"
                  id="treinamento3EmAndamento"
                  className={style.emAndamento}
                />
                <Form.Check
                  type="radio"
                  label="Concluído"
                  name="treinamento3"
                  id="treinamento3Concluido"
                  className={style.concluido}
                />
              </div>
                <hr/>
              <div className="mb-3">
                <h5 className={style.nomeTreinamento}>Treinamento de Segurança no Trabalho</h5>
                <Form.Check
                  type="radio"
                  label="Pendente"
                  name="treinamento4"
                  id="treinamento4Pendente"
                  className={style.pendente}
                />
                <Form.Check
                  type="radio"
                  label="Em Andamento"
                  name="treinamento4"
                  id="treinamento4EmAndamento"
                  className={style.emAndamento}
                />
                <Form.Check
                  type="radio"
                  label="Concluído"
                  name="treinamento4"
                  id="treinamento4Concluido"
                  className={style.concluido}
                />
              </div>
            </div>
          </Tab>
        </Tabs>

        <div className="d-flex justify-content-center mt-3">
          <Button variant="warning" type="submit" className={`me-2 ${style.btn_cadastrar}`}> 
            Atualizar
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default AtualizarEmpregado;