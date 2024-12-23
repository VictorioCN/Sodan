import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import style from '../css/MyNavBar.module.css'


const MyNavBar = () => {
  return (
    <div>
        <>
      <Navbar className={style.barra} bg="primary">
        <Container>
          <Navbar.Brand className={style.Logo} href="/buscar">Sodan</Navbar.Brand>
          <Nav className={style.Nav}>
            <Nav.Link href="/buscar" className={style.links}>Buscar</Nav.Link>
            <Nav.Link href="/Permissao" className={style.links}>Permissão</Nav.Link>
            <Nav.Link href="/empregado" className={style.links}>Empregado</Nav.Link>
            <Nav.Link href="/" className={style.linksSair}>Sair</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
    </div>
  )
}

export default MyNavBar