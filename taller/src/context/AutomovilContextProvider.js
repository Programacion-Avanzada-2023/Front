import { createContext, useContext, useState, useEffect } from "react";
import { buscarAutomoviles } from "../api/Automovil.Controller";

const AutomovilContext = createContext({
  automoviles: [],
  setAutomoviles: () => {},
  removerAutomovil: (id) => {},
  agregarAutomovil: (automovil) => {},
});

export function useAutomovilContext() {
  return useContext(AutomovilContext);
}

export function AutomovilContextProvider({ children }) {
  /** Estado que controla los automoviles en lista. */
  const [automoviles, setAutomoviles] = useState([]);

  function removerAutomovil(id) {
    setAutomoviles(automoviles.filter((automovil) => automovil.id !== id));
  }

  function agregarAutomovil(automovil) {
    setAutomoviles([...automoviles, automovil]);
  }

  useEffect(() => {
    buscarAutomoviles()
      .then((automoviles) => setAutomoviles(automoviles))
      .catch((e) => {
        console.error(e);
        setAutomoviles([]);

        alert(e?.message ?? "Ocurrió un error al buscar los automoviles.");
      });
  }, []);

  return (
    <AutomovilContext.Provider
      value={{
        automoviles,
        setAutomoviles,
        removerAutomovil,
        agregarAutomovil,
      }}
    >
      {children}
    </AutomovilContext.Provider>
  );
}