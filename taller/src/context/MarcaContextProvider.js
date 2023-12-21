import { createContext, useContext, useState, useEffect } from "react";
import { buscarMarcas } from "../api/Marca.Controller";

const MarcaContext = createContext({
  marcas: [],
  setMarcas: () => {},
  removerMarcas: (id) => {},
  agregarMarca: (marca) => {},
});

export function useMarcaContext() {
  return useContext(MarcaContext);
}

export function MarcaContextProvider({ children }) {
  /** Estado que controla las marcas en lista. */
  const [marcas, setMarcas] = useState([]);

  function removerMarca(id) {
    setMarcas(marcas.filter((marca) => marca.id !== id));
  }

  function agregarMarca(marca) {
    setMarcas([...marcas, marca]);
  }

  useEffect(() => {
    buscarMarcas()
      .then((marcas) => setMarcas(marcas))
      .catch((e) => {
        console.error(e);
        setMarcas([]);

        alert(e?.message ?? "Ocurrió un error al buscar las marcas.");
      });
  }, []);

  return (
    <MarcaContext.Provider
      value={{
        marcas,
        setMarcas,
        removerMarca,
        agregarMarca,
      }}
    >
      {children}
    </MarcaContext.Provider>
  );
}
