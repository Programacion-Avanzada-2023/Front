import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";

import NavBar from "./components/NavBar";
import Home from "./components/home";
import "bootstrap/dist/css/bootstrap.min.css";
import FormMarca from "./components/Forms/formMarca";
import FormModelo from "./components/Forms/formsModelo";
import FormAutomovil from "./components/Forms/formsAutomovil";
import FormCliente from "./components/Forms/formCliente";
import FormOrdenDeTrabajo from "./components/Forms/formOrdenDeTrabajo";
import FormServicio from "./components/Forms/formServicio";
import { ClienteContextProvider } from "./context/ClienteContextProvider";


function App() {
  return (
    <Router>
      <ClienteContextProvider>
        <div>
          <NavBar />
          <br />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/marca" element={<FormMarca />} />
            <Route path="/modelo" element={<FormModelo />} />
            <Route path="/automovil" element={<FormAutomovil />} />
            <Route path="/cliente" element={<FormCliente />} />
            <Route path="/orden" element={<FormOrdenDeTrabajo/>} />
            <Route path="/servicio" element={<FormServicio/>} />
            <Route path="/home" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </ClienteContextProvider>
    </Router>
  );
}

export default App;
