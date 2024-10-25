import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

import MyLogin from './pages/MyLogin.jsx';
// import MyNavBar from './components/MyNavBar.jsx';
import Permissao from './pages/Permissao.jsx';
import Buscar from './pages/Buscar.jsx';

import { BrowserRouter, Route, Routes } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        {/* <MyNavBar /> */}
        <Routes>
          <Route path='/' element={<MyLogin/>} />
          <Route path='/permissao' element={<Permissao/>} />
          <Route path='/buscar' element={<Buscar/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
