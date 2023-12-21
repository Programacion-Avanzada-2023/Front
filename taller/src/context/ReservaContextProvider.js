import { createContext, useContext, useState, useEffect } from "react";
import { buscarReservas } from "../api/Reserva.Controller";

const ReservaContext = createContext({
  reservas: [],
  setReservas: () => {},
  removerReservas: (id) => {},
  agregarReserva: (reservas) => {},
});

export function useReservaContext() {
  return useContext(ReservaContext);
}

export function ReservaContextProvider({ children }) {
  /** Estado que controla las ordenes en lista. */
  const [reservas, setReservas] = useState([]);

  function removerReservas(id) {
    setReservas(reservas.filter((reserva) => reserva.id !== id));
  }

  function agregarReserva(reserva) {
    setReservas([...reservas, reserva]);
  }

  useEffect(() => {
    buscarReservas()
      .then((reservas) => setReservas(reservas))
      .catch((e) => {
        console.error(e);
        setReservas([]);

        alert(e?.message ?? "Ocurrió un error al buscar las ordenes.");
      });
  }, []);

  return (
    <ReservaContext.Provider
      value={{
        reservas,
        setReservas,
        removerReservas,
        agregarReserva,
      }}
    >
      {children}
    </ReservaContext.Provider>
  );
}
