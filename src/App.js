import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

import MyLogin from './pages/MyLogin';
import MyNavBar from './components/MyNavBar';
import Permissao from './pages/Permissao';

import { BrowserRouter, Route, Routes } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <Permissao/>
     {/* <MyLogin/>
     <BrowserRouter>
      <MyNavBar/>
      <Routes>
        <Route path='/permissao' element={<Permissao/>}/>
        <Route path='/myLogin' element={<MyLogin/>}/>
      </Routes> 
     </BrowserRouter> */}
    </div>
  );
}

export default App;
