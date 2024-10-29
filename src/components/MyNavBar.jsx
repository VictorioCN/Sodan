import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import style from './MyNavBar.module.css'


const MyNavBar = () => {
  return (
    <div>
        <>
      <Navbar className={style.barra} fixed="top"  bg="primary">
        <Container>
          <Navbar.Brand className={style.Logo} href="/home">Sodan</Navbar.Brand>
          <Nav className={style.Nav}>
            <Nav.Link href="/home" className={style.links}>Inicio</Nav.Link>
            <Nav.Link href="/Permissao" className={style.links}>Permissão</Nav.Link>
            <Nav.Link href="/cadastro" className={style.links}>Cadastro</Nav.Link>
            <Nav.Link href="/buscar" className={style.links}>Buscar</Nav.Link>
            <Nav.Link href="/sair" className={style.logoSair}>Sair</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
    </div>
  )
}

export default MyNavBar