import { createContext, useContext, useState, useEffect } from "react";
import {
  buscarOrdenes,
  buscarOrdenesPorCliente,
  editarOrdenDeTrabajo,
} from "../api/Orden.Controller";

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

  /**
   * Confirma una orden de trabajo.
   *
   * @param {number} id Orden de trabajo a confirmar.
   * @param {boolean} confirmada Estado de confirmación.
   *
   * @returns {Promise<Orden>}
   */
  confirmarOrden: (id, confirmada) => {},

  /**
   * Asigna un técnico a una orden existente.
   *
   * Para poder hacerlo, la orden no debe estar confirmada.
   *
   * @param {number} tecnico El tecnico a asignar.
   * @param {number} orden La orden a la cual asignar el tecnico.
   *
   * @returns {Promise<Orden>}
   */
  asignarTecnico: (tecnico, orden) => {},
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

  async function confirmarOrden(id, confirmada) {
    try {
      const orden = ordenes.find((orden) => orden.id === id);

      if (!orden) return orden;

      orden.confirmada = confirmada;

      // Actualizar.
      const editada = await editarOrdenDeTrabajo(id, { confirmada });

      // Actualizar lista.
      setOrdenes(ordenes.map((orden) => (orden.id === id ? editada : orden)));
    } catch (e) {
      console.error(`Fallo al confirmar orden ${id}: ${e}`);
    }
  }

  async function asignarTecnico(tecnico, orden) {
    try {
      const editada = await editarOrdenDeTrabajo(orden, {
        tecnico,
      });

      setOrdenes(ordenes.map((o) => (o.id === orden ? editada : o)));
    } catch (e) {
      console.error(
        `Fallo al asignar tecnico ${tecnico} a orden ${orden}`
      );
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
        confirmarOrden,
        asignarTecnico,
      }}
    >
      {children}
    </OrdenContext.Provider>
  );
}
