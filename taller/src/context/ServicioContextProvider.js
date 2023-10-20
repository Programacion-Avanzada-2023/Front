import { createContext, useContext, useState, useEffect } from "react";
import { buscarServicios } from "../api/Servicio.Controller";

const servicioContext = createContext({
  servicios: [],
  setServicios: () => {},
  removerServicio: (id) => {},
  agregarServicio: (servicio) => {},
});

export function useServicioContext() {
  return useContext(servicioContext);
}

export function servicioContextProvider({ children }) {
  /** Estado que controla los servicios en lista. */
  const [servicios, setServicios] = useState([]);

  function removerServicio(id) {
    setServicios(servicios.filter((servicio) => servicio.id !== id));
  }

  function agregarServicio(servicio) {
    setServicios([...servicios, servicio]);
  }

  useEffect(() => {
    buscarServicios()
      .then((servicios) => setServicios(servicios))
      .catch((e) => {
        console.error(e);
        setservicios([]);

        alert(e?.message ?? "Ocurrió un error al buscar los servicios.");
      });
  }, []);

  return (
    <ServicioContext.Provider
      value={{
        servicios,
        setServicios,
        removerServicio,
        agregarServicio,
      }}
    >
      {children}
    </ServicioContext.Provider>
  );
}
