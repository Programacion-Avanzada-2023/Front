import { createContext, useContext, useState, useEffect } from "react";
import { buscarTecnicos } from '../api/Tecnico.Controller';

const TecnicoContext = createContext({
  servicios: [],
  setServicios: () => {},
  removerServicio: (id) => {},
  agregarServicio: (servicio) => {},
});

export function useTecnicoContext() {
  return useContext(TecnicoContext);
}

export function TecnicoContextProvider({ children }) {
  /** Estado que controla los técnicos en lista. */
  const [tecnicos, setTecnicos] = useState([]);

  function removerTecnico(id) {
    setTecnicos(tecnicos.filter((tecnico) => tecnico.id !== id));
  }

  function agregarTecnico(tecnico) {
    setTecnicos([...tecnicos, tecnico]);
  }

  useEffect(() => {
    buscarTecnicos()
      .then((tecnicos) => setTecnicos(tecnicos))
      .catch((e) => {
        console.error(e);
        setTecnicos([]);

        alert(e?.message ?? "Ocurrió un error al buscar los técnicos.");
      });
  }, []);

  return (
    <TecnicoContext.Provider
      value={{
        tecnicos,
        setTecnicos,
      }}
    >
      {children}
    </TecnicoContext.Provider>
  );
}
