import { createContext, useContext, useState, useEffect } from "react";
import { buscarModelos } from "../api/Modelo.Controller";

const ModeloContext = createContext({
  modelos: [],
  setModelos: () => {},
  removerModelos: (id) => {},
  agregarModelo: (modelo) => {},
});

export function useModeloContext() {
  return useContext(ModeloContext);
}

export function ModeloContextProvider({ children }) {
  /** Estado que controla las modelos en lista. */
  const [modelos, setModelos] = useState([]);

  function removerModelos(id) {
    setModelos(modelos.filter((modelo) => modelo.id !== id));
  }

  function M(modelo) {
    setModelos([...modelos, modelo]);
  }

  useEffect(() => {
    buscarModelos()
      .then((modelos) => setModelos(modelos))
      .catch((e) => {
        console.error(e);
        setModelos([]);

        alert(e?.message ?? "Ocurrió un error al buscar las modelos.");
      });
  }, []);

  return (
    <ModeloContext.Provider
      value={{
        modelos,
        setModelos,
        removerModelos,
        M,
      }}
    >
      {children}
    </ModeloContext.Provider>
  );
}
