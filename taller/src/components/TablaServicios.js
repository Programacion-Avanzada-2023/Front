import React, { useState } from "react";
import { Form, Table, Button, Modal, Col } from "react-bootstrap";
import { editarServicio, eliminarServicio } from "../api/Servicio.Controller";

export function TablaServicios({
    removerServicio,
    serviciosFiltrados,
    filtro,
    handleFiltroChange,
    filtrarServicios,
    setServiciosFiltrados,
    setServicios,
}) {
    const handleDeleteClick = (id) => {
        eliminarServicio(id).then(() => {
          removerServicio(id);
          setServiciosFiltrados(
            serviciosFiltrados.filter((servicio) => servicio.id !== id)
          );
        });
        handleCloseDeleteModal();
    };

    const handleEditClick = (servicioid) => {
        editarServicio(servicio).then((servicio) => {
          setServicios((servicios) => {
            const servicioPrev = servicios.find((s) => s.id === servicioid);
    
            if (servicioPrev) {
              setServiciosFiltrados(servicios);
              return [
                ...servicios.filter((s) => s.id !== servicioid),
                (servicioPrev.servicio = servicio),
              ];
            }
          });
        });
    
        handleCloseEditModal();
    };

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

    const [servicio, setServicio] = useState(null);

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
                    <Modal.Title>Está por borrar un servicio.</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Esta acción es permanente, ¿está seguro de querer borrar a{" "}
                {servicio?.descripcion}?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseDeleteModal}>
                    No
                </Button>
                <Button
                    variant="danger"
                    onClick={() => handleDeleteClick(servicio?.id)}
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
                <Modal.Title>Editando {servicio?.descripcion}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <div>
                    <div>
                    <Form.Label htmlFor="name">descripcion</Form.Label>
                    <Form.Control
                        type="text"
                        id="name"
                        defaultValue={servicio?.descripcion}
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
                    onClick={() => handleEditClick(servicio?.id)}
                >
                    Guardar
                </Button>
                </Modal.Footer>
            </Modal>

            <input
                type="text"
                placeholder="Filtrar por descripcion"
                value={filtro}
                onChange={handleFiltroChange}
            />
            
            <button onClick={filtrarServicios}>Filtrar</button>

            <Table responsive>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Descripcion</th>
                    </tr>
                </thead>
                <tbody>
                    {serviciosFiltrados.map(({servicio, id }) => {
                        return (
                        <tr key={servicio.id}>
                            <td>{id}</td>
                            <td>{descripcion}</td>
                            <td>
                                {/*Boton de Eliminar servicio*/}
                                <Col className="custom-col">
                                    <Button
                                    type="submit"
                                    variant="primary"
                                    onClick={() => {
                                        setServicio({ ...servicio, id});
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
                                        setServicio({ ...servicio, id});
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
                        <th>descripcion</th>
                    </tr>
                </thead>
                <tbody>
                {serviciosFiltrados.map((servicio) => (
                    <tr key={servicio.id}>
                    <td>{servicio.id}</td>
                    <td>{servicio.descripcion}</td>
                    </tr>
                ))}
                </tbody>
            </table> */}
        </div>
    );
}
