import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

import ConfirmarSenha from './pages/ConfirmarSenha.jsx';
import EsqueciSenha from './pages/EsqueciSenha.jsx';
import MyLogin from './pages/MyLogin.jsx';
import MyNavBar from './components/MyNavBar.jsx';
import Permissao from './pages/Permissao.jsx';
import Buscar from './pages/Buscar.jsx';
import Home from './pages/Home.jsx';
import Empregado from './pages/Empregado.jsx';
import CadastrarEmpregado from './pages/CadastrarEmpregado.jsx';
import AtualizarEmpregado from './pages/AtualizarEmpregado.jsx';
import ExcluirEmpregado from './pages/ExcluirEmpregado.jsx';
import MyFooter from './components/MyFooter.jsx';

import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';

function App() {
  const location = useLocation();
  const hiddenNavPaths = ['/', '/EsqueciSenha', '/ConfirmarSenha']
  const hiddenFooterPaths = ['/', '/EsqueciSenha', '/ConfirmarSenha','/Empregado', '/buscar']

  return (
    <div className="App">
      {!hiddenNavPaths.includes(location.pathname) && <MyNavBar />}

      <Routes>
        <Route path='/' element={<MyLogin />} />
        <Route path='/esquecisenha' element={<EsqueciSenha/>}/>
        <Route path='/confirmarsenha' element={<ConfirmarSenha/>}/>
        <Route path='/home' element={<Home />} />
        <Route path='/permissao' element={<Permissao />} />
        <Route path='/empregado' element={<Empregado/>} />
        <Route path='/empregado/cadastrar' element={<CadastrarEmpregado/>} />
        <Route path='/empregado/atualizar' element={<AtualizarEmpregado/>} />
        <Route path='/empregado/excluir' element={<ExcluirEmpregado/>} />
        <Route path='/buscar' element={<Buscar />} />
      </Routes>

      {!hiddenFooterPaths.includes(location.pathname) && <MyFooter />}
    </div>
  );
}

export default function AppWrapper() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}