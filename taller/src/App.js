import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import NavBar from './components/NavBar'
import Home from './components/home';
import 'bootstrap/dist/css/bootstrap.min.css';
import FormMarca from './components/Forms/formMarca';
import FormModelo from './components/Forms/formsModelo';
import FormAutomovil from './components/Forms/formsAutomovil';
function App() {
  return (
    <Router>
      <div>
        <NavBar />
        <br />
        
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/marca" element={<FormMarca />} />
          <Route path="/modelo" element={<FormModelo />} />
          <Route path="/automovil" element={<FormAutomovil />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;