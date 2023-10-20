import React, { useState } from "react";
import { Form, Table, Button, Modal, Col } from "react-bootstrap";
import { editarModelo, eliminarModelo } from "../api/Modelo.Controller";

export function TablaModelos({
  removerModelo,
  modelosFiltrados,
  filtro,
  handleFiltroChange,
  filtrarModelos,
  setModelosFiltrados,
  setModelos,
}) {
  const handleDeleteClick = (id) => {
    eliminarModelo(id).then(() => {
      removerModelo(id);
      setModelosFiltrados(
        modelosFiltrados.filter((modelo) => modelo.id !== id)
      );
    });
    handleCloseDeleteModal();
  };

  const handleEditClick = (modeloId) => {
    editarModelo(modelo).then((modelo) => {
      setModelos((modelos) => {
        const modeloPrev = modelos.find((m) => m.model.id === modeloId);

        if (modeloPrev) {
          setModelosFiltrados(modelos);
          return [
            ...modelos.filter((m) => m.model.id !== modeloId),
            (modeloPrev.model = modelo),
          ];
        }
      });
    });

    handleCloseEditModal();
  };

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const [modelo, setModelo] = useState(null);

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
          <Modal.Title>Está por borrar un modelo.</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Esta acción es permanente, ¿está seguro de querer borrar a{" "}
          {modelo?.name}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeleteModal}>
            No
          </Button>
          <Button
            variant="danger"
            onClick={() => handleDeleteClick(modelo?.id)}
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
                defaultValue={modelo?.name}
              />
            </div>
            <div>
              <Form.Label htmlFor="surname">Apellido</Form.Label>
              <Form.Control
                type="text"
                id="surname"
                defaultValue={modelo?.surName}
              />
            </div>
            <div>
              <Form.Label htmlFor="street">Calle</Form.Label>
              <Form.Control
                type="text"
                id="street"
                defaultValue={modelo?.street}
              />
            </div>
            <div>
              <Form.Label htmlFor="streetNumber">Nro. Calle</Form.Label>
              <Form.Control
                type="number"
                id="streetNumber"
                defaultValue={modelo?.streetNumber}
              />
            </div>
            <div>
              <Form.Label htmlFor="phoneNumber">Teléfono</Form.Label>
              <Form.Control
                type="text"
                id="phoneNumber"
                defaultValue={modelo?.phoneNumber}
              />
            </div>
            <div>
              <Form.Label htmlFor="email">E-Mail</Form.Label>
              <Form.Control
                type="text"
                id="email"
                defaultValue={modelo?.email}
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
          {modelosFiltrados.map(({ modelo, id }) => {
            // Calcular campos para unisión.
            return (
              <tr key={modelo.dni}>
                <td>{id}</td>
                <td>{nombre}</td>
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