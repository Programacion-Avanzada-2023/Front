import { createContext, useContext, useState, useEffect } from "react";
import { buscarClientes } from "../api/Cliente.Controller";

const ClienteContext = createContext({
  clientes: [],
  setClientes: () => {},
  removerCliente: (id) => {},
  agregarCliente: (cliente) => {},
});

export function useClienteContext() {
  return useContext(ClienteContext);
}

export function ClienteContextProvider({ children }) {
  /** Estado que controla los clientes en lista. */
  const [clientes, setClientes] = useState([]);

  function removerCliente(id) {
    setClientes(clientes.filter((cliente) => cliente.id !== id));
  }

  function agregarCliente(cliente) {
    setClientes([...clientes, cliente]);
  }

  useEffect(() => {
    buscarClientes()
      .then((clientes) => setClientes(clientes))
      .catch((e) => {
        console.error(e);
        setClientes([]);

        alert(e?.message ?? "Ocurrió un error al buscar los clientes.");
      });
  }, []);

  return (
    <ClienteContext.Provider
      value={{
        clientes,
        setClientes,
        removerCliente,
        agregarCliente,
      }}
    >
      {children}
    </ClienteContext.Provider>
  );
}
