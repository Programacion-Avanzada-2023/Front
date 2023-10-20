import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";

import NavBar from "./components/NavBar";
import Home from "./components/home";
import "bootstrap/dist/css/bootstrap.min.css";
import FormMarca from "./components/Forms/formMarca";
import FormServicio from "./components/Forms/formServicio";
import ClienteWrapper from "./components/Wrappers/ClienteWrapper";
import ModeloWrapper from "./components/Wrappers/ModeloWrapper";
import AutomovilWrapper from "./components/Wrappers/AutomovilWrapper";
import OrdenDeTrabajoWrapper from "./components/Wrappers/OrdenDeTrabajoWrapper";

function App() {
  return (
    <Router>
      <div>
        <NavBar />
        <br />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/marca" element={<FormMarca />} />
          <Route path="/modelo" element={<ModeloWrapper />} />
          <Route path="/automovil" element={<AutomovilWrapper />} />
          <Route path="/cliente" element={<ClienteWrapper />} />
          <Route path="/ordenTrabajo" element={<OrdenDeTrabajoWrapper />} />
          <Route path="/servicio" element={<FormServicio />} />
          <Route path="/home" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
