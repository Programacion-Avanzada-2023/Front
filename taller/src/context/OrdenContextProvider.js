import { createContext, useContext, useState, useEffect } from "react";
import { buscarOrdenes, buscarOrdenesPorCliente } from "../api/Orden.Controller";

const OrdenContext = createContext({
  orden: [],
  setOrdenes: () => {},
  removerOrdenes: (id) => {},
  agregarOrdenes: (orden) => {},

  /**
   * Busca las ordenes de trabajo por un cliente específico.
   *
   * @param {number} idCliente
   *
   * @returns {Promise<Orden[]>}
   */
  buscarOrdenesDeCliente: (idCliente) => {},
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

  async function buscarOrdenesDeCliente(idCliente) {
    try {
      const ordenes = await buscarOrdenesPorCliente(idCliente);

      return ordenes;
    } catch (e) {
      console.error(`Fallo al buscar ordenes de cliente ${idCliente}: ${e}`);
    }
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
        buscarOrdenesDeCliente,
      }}
    >
      {children}
    </OrdenContext.Provider>
  );
}
