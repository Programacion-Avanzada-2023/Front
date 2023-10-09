import React from "react";
import Table from "react-bootstrap/Table";

export function FiltroClientes({
  clientesFiltrados,
  filtro,
  handleFiltroChange,
  filtrarClientes,
}) {
  return (
    <div>
      <input
        type="text"
        placeholder="Filtrar por nombre"
        value={filtro}
        onChange={handleFiltroChange}
      />

      <button onClick={filtrarClientes}>Filtrar</button>

      <Table responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Nombre</th>
            <th>DNI</th>
            <th>Teléfono</th>
            <th>Dirección</th>
            <th>Correo</th>
          </tr>
        </thead>
        <tbody>
          {clientesFiltrados.map(({ person: cliente }) => {
            // Calcular campos para unisión.
            const fullName = `${cliente.surName}, ${cliente.name}`,
              fullAddress =
                cliente?.street && cliente?.streetNumber
                  ? `${cliente?.street} ${cliente?.streetNumber}`
                  : null;

            return (
              <tr key={cliente.dni}>
                <td>{cliente.id}</td>
                <td>{fullName}</td>
                <td>{cliente.dni}</td>
                <td>{cliente?.phoneNumber ?? "No posee"}</td>
                <td>{fullAddress ?? "No posee"}</td>
                <td>{cliente?.email ?? "No posee"}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>

      {/* <table>
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
      </table> */}
    </div>
  );
}

export default FiltroClientes;
