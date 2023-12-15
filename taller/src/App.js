import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import NavBar from "./components/NavBar";
import Home from "./components/home";
import "bootstrap/dist/css/bootstrap.min.css";
import MarcaWrapper from "./components/Wrappers/MarcaWrapper";
import ServicioWrapper from "./components/Wrappers/ServicioWrapper";
import ClienteWrapper from "./components/Wrappers/ClienteWrapper";
import ModeloWrapper from "./components/Wrappers/ModeloWrapper";
import AutomovilWrapper from "./components/Wrappers/AutomovilWrapper";
import OrdenDeTrabajoWrapper from "./components/Wrappers/OrdenDeTrabajoWrapper";
import { PerfilClienteWrapper } from "./components/Wrappers/Dynamic/PerfilClienteWrapper";

function App() {
  return (
    <Router>
      <div className="w-full">
        <NavBar />
        <br />

        <div className="w-full">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/marcas" element={<MarcaWrapper />} />
            <Route path="/modelos" element={<ModeloWrapper />} />
            <Route path="/automoviles" element={<AutomovilWrapper />} />
            <Route path="/clientes" element={<ClienteWrapper />} />
            <Route path="/ordenes" element={<OrdenDeTrabajoWrapper />} />
            <Route path="/servicios" element={<ServicioWrapper />} />
            <Route path="/home" element={<Navigate to="/" />} />

            {/** Rutas Dinámicas */}
            <Route
              path="/clientes/:clienteId"
              element={<PerfilClienteWrapper />}
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
