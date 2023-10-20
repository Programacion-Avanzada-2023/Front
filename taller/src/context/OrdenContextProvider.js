import { createContext, useContext, useState, useEffect } from "react";
import { buscarOrdenes } from "../api/Orden.Controller";

const OrdenContext = createContext({
  orden: [],
  setOrdenes: () => {},
  removerOrdenes: (id) => {},
  agregarOrdenes: (orden) => {},
});

export function useOrdenContext() {
  return useContext(OrdenContext);
}

export function OrdenContextProvider({ children }) {
  /** Estado que controla las ordenes en lista. */
  const [ordenes, setOrdenes] = useState([]);

  function removerOrdenes(id) {
    setOrdenes(ordenes.filter((orden) => orden.id !== id));
  }

  function agregarOrdenes(orden) {
    setOrdenes([...ordenes, orden]);
  }

  useEffect(() => {
    buscarOrdenes()
      .then((ordenes) => setOrdenes(ordenes))
      .catch((e) => {
        console.error(e);
        setOrdenes([]);

        alert(e?.message ?? "Ocurrió un error al buscar las ordenes.");
      });
  }, []);

  return (
    <OrdenContext.Provider
      value={{
        ordenes,
        setOrdenes,
        removerOrdenes,
        agregarOrdenes,
      }}
    >
      {children}
    </OrdenContext.Provider>
  );
}
