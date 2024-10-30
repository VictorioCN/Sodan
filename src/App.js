import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

import MyLogin from './pages/MyLogin.jsx';
import MyNavBar from './components/MyNavBar.jsx';
import Permissao from './pages/Permissao.jsx';
import Buscar from './pages/Buscar.jsx';
import Home from './pages/Home.jsx';
import Empregado from './pages/Empregado.jsx';
import MyFooter from './components/MyFooter.jsx';

import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';

function App() {
  const location = useLocation();

  return (
    <div className="App">
      {/* Renderiza o Navbar apenas se não estiver na página de login */}
      {location.pathname !== '/' && <MyNavBar />}

      <Routes>
        <Route path='/' element={<MyLogin />} />
        <Route path='/home' element={<Home />} />
        <Route path='/permissao' element={<Permissao />} />
        <Route path='/empregado' element={<Empregado/>} />
        <Route path='/buscar' element={<Buscar />} />
      </Routes>

      {/* Renderiza o footer apenas se não estiver na página de login */}
      {location.pathname !== '/' && <MyFooter />}
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