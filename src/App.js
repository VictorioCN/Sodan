import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

import MyLogin from './components/MyLogin';
import MyNavBar from './components/MyNavBar';

function App() {
  return (
    <div className="App">
     <MyLogin/>
     <MyNavBar/>
    </div>
  );
}

export default App;
