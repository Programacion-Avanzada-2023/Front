import React, { useState } from "react";
import { Form, Table, Button, Modal, Col } from "react-bootstrap";
import { editarCliente, eliminarCliente } from "../api/Cliente.Controller";

export function TablaClientes({
  removerCliente,
  clientesFiltrados,
  filtro,
  handleFiltroChange,
  filtrarClientes,
  setClientesFiltrados,
  setClientes,
}) {
  const handleDeleteClick = (id) => {
    eliminarCliente(id).then(() => {
      removerCliente(id);
      setClientesFiltrados(
        clientesFiltrados.filter((cliente) => cliente.id !== id)
      );
    });
    handleCloseDeleteModal();
  };

  const handleEditClick = (personaId) => {
    editarCliente(cliente).then((cliente) => {
      setClientes((clientes) => {
        const clientePrev = clientes.find((c) => c.person.id === personaId);

        if (clientePrev) {
          setClientesFiltrados(clientes);
          return [
            ...clientes.filter((c) => c.person.id !== personaId),
            (clientePrev.person = cliente),
          ];
        }
      });
    });

    handleCloseEditModal();
  };

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const [cliente, setCliente] = useState(null);

  const handleCloseDeleteModal = () => setShowDeleteModal(false);
  const handleCloseEditModal = () => setShowEditModal(false);
  const handleShowDeleteModal = () => setShowDeleteModal(true);
  const handleShowEditModal = () => setShowEditModal(true);

  return (
    <div>
      <Modal
        show={showDeleteModal}
        onHide={handleCloseDeleteModal}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Está por borrar un cliente.</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Esta acción es permanente, ¿está seguro de querer borrar a{" "}
          {cliente?.name}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeleteModal}>
            No
          </Button>
          <Button
            variant="danger"
            onClick={() => handleDeleteClick(cliente?.id)}
          >
            Si
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showEditModal}
        onHide={handleCloseEditModal}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Editando {cliente?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div>
              <Form.Label htmlFor="name">Nombre</Form.Label>
              <Form.Control
                type="text"
                id="name"
                defaultValue={cliente?.name}
              />
            </div>
            <div>
              <Form.Label htmlFor="surname">Apellido</Form.Label>
              <Form.Control
                type="text"
                id="surname"
                defaultValue={cliente?.surName}
              />
            </div>
            <div>
              <Form.Label htmlFor="street">Calle</Form.Label>
              <Form.Control
                type="text"
                id="street"
                defaultValue={cliente?.street}
              />
            </div>
            <div>
              <Form.Label htmlFor="streetNumber">Nro. Calle</Form.Label>
              <Form.Control
                type="number"
                id="streetNumber"
                defaultValue={cliente?.streetNumber}
              />
            </div>
            <div>
              <Form.Label htmlFor="phoneNumber">Teléfono</Form.Label>
              <Form.Control
                type="text"
                id="phoneNumber"
                defaultValue={cliente?.phoneNumber}
              />
            </div>
            <div>
              <Form.Label htmlFor="email">E-Mail</Form.Label>
              <Form.Control
                type="text"
                id="email"
                defaultValue={cliente?.email}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleCloseEditModal}>
            Cancelar
          </Button>
          <Button
            variant="success"
            onClick={() => handleEditClick(cliente?.personaId)}
          >
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>

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
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clientesFiltrados.map(({ person: cliente, id }) => {
            // Calcular campos para unisión.
            const fullName = `${cliente.surName}, ${cliente.name}`,
              fullAddress =
                cliente?.street && cliente?.streetNumber
                  ? `${cliente?.street} ${cliente?.streetNumber}`
                  : null;

            return (
              <tr key={cliente.dni}>
                <td>{id}</td>
                <td>{fullName}</td>
                <td>{cliente.dni}</td>
                <td>{cliente?.phoneNumber ?? "No posee"}</td>
                <td>{fullAddress ?? "No posee"}</td>
                <td>{cliente?.email ?? "No posee"}</td>
                <td>
                  {/*Boton de Eliminar Marca*/}
                  <Col className="custom-col">
                    <Button
                      type="submit"
                      variant="primary"
                      onClick={() => {
                        setCliente({ ...cliente, id, idPersona: cliente?.id });
                        handleShowDeleteModal();
                      }}
                    >
                      Eliminar
                    </Button>
                  </Col>
                  <Col className="custom-col">
                    <Button
                      type="submit"
                      variant="primary"
                      onClick={() => {
                        setCliente({ ...cliente, id, idPersona: cliente?.id });
                        handleShowEditModal();
                      }}
                    >
                      Editar
                    </Button>
                  </Col>
                </td>
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

export default TablaClientes;
