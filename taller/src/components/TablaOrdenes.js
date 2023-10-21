import React, { useState } from "react";
import { Form, Table, Button, Modal, Col } from "react-bootstrap";
import { editarOrdenDeTrabajo, eliminarOrdenDeTrabajo} from "../api/orden.Controller";

export function TablaModelos({
  removerOrden,
  OrdenesFiltradas,
  filtro,
  handleFiltroChange,
  filtrarOrdenes,
  setOrdenesFiltradas,
  setOrdenes,
}) {
  const handleDeleteClick = (id) => {
    eliminarOrdenDeTrabajo(id).then(() => {
      removerOrden(id);
      setOrdenesFiltradas(
        modelosFiltrados.filter((orden) => orden.id !== id)
      );
    });
    handleCloseDeleteModal();
  };

  const handleEditClick = (ordenId) => {
    editarOrdenDeTrabajo(orden).then((orden) => {
      setModelos((ordenes) => {
        const ordenPrev = ordenes.find((o) => o.ordenn.id === ordenId);

        if (ordenPrev) {
          setOrdenesFiltradas(ordenes);
          return [
            ...ordenes.filter((o) => o.ordenn.id !== ordenId),
            (ordenPrev.ordenn = orden),
          ];
        }
      });
    });

    handleCloseEditModal();
  };

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const [orden, setOrden] = useState(null);

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
          <Modal.Title>Está por borrar una orden de trabajo.</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Esta acción es permanente, ¿está seguro de querer borrar a{" "}
          {orden?.name}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeleteModal}>
            No
          </Button>
          <Button
            variant="danger"
            onClick={() => handleDeleteClick(orden?.id)}
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
          <Modal.Title>Editando {modelo?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div>
              <Form.Label htmlFor="name">Nombre</Form.Label>
              <Form.Control
                type="text"
                id="name"
                defaultValue={orden?.name}
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
            onClick={() => handleEditClick(modelo?.modeloId)}
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

      <button onClick={filtrarModelos}>Filtrar</button>

      <Table responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Nombre</th>
            <th>Año</th>
            <th>Marca</th>
          </tr>
        </thead>
        <tbody>
          {modelosFiltrados?.map(({ modelo, id }) => {
            // Calcular campos para unisión.
            return (
              <tr key={modelo.dni}>
                <td>{id}</td>
                <td>{modelo.nombre}</td>
                <td>
                  {/*Boton de Eliminar Modelo*/}
                  <Col className="custom-col">
                    <Button
                      type="submit"
                      variant="primary"
                      onClick={() => {
                        setModelo({ ...modelo, id});
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
                        setModelo({ ...modelo, id});
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

export default TablaModelos;