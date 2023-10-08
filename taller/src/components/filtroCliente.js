import React, { useState } from "react";
import clientes from "../data/data";

export function FiltroClientes({clickHandler}) {
  const [filtro, setFiltro] = useState("");
  const [clientesFiltrados, setClientesFiltrados] = useState([]);
  
  const handleFiltroChange = (event) => {
    setFiltro(event.target.value);
  };

  const filtrarClientes = () => {
    const clientesFiltrados = clientes.filter((cliente) =>
      cliente.nombre.toLowerCase().includes(filtro.toLowerCase())
    );
    setClientesFiltrados(clientesFiltrados);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Filtrar por nombre"
        value={filtro}
        onChange={handleFiltroChange}
      />

      <button onClick={filtrarClientes}>Filtrar</button>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
          </tr>
        </thead>
        <tbody>
          {clientesFiltrados.map((cliente) => (
            <tr key={cliente.id}>
              <td>{cliente.id}</td>
              <td>{cliente.nombre}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FiltroClientes;
