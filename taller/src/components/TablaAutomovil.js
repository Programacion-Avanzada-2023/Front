import React, { useState } from "react";
import { Form, Table, Button, Modal, Col } from "react-bootstrap";
import { editarAutomovil, eliminarAutomovil } from "../api/Marca.Controller";


export function TablaAutomovil({
    removerAutomovil,
    automovilesFiltrados, 
    filtro,
    handleFiltroChange,
    filtrarAutomoviles, 
    setAutomovilesFiltrados,
    setAutomoviles, 
}) {
    const handleDeleteClick = (id) => {
        eliminarAutomovil(id).then(() => {
          removerAutomovil(id);
          setAutomovilesFiltrados(
            automovilesFiltrados.filter((automovil) => automovil.id !== id)
          );
        });
        handleCloseDeleteModal();
    };

    const handleEditClick = (automovilId) => {
        editarAutomovil(automovil).then((automovil) => {
          setAutomoviles((automoviles) => {
            const automovilPrev = automoviles.find((a) => a.id === automovilId);
    
            if (automovilPrev) {
              setAutomovilesFiltrados(automoviles);
              return [
                ...automoviles.filter((a) => a.id !== automovilId),
                (automovilPrev.automovil = automovil),
              ];
            }
          });
        });
    
        handleCloseEditModal();
    };

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

    const [automovil, setAutomovil] = useState(null);

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
                    <Modal.Title>Está por borrar un automovil.</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Esta acción es permanente, ¿está seguro de querer borrar a{" "}
                {automovil?.nombre}?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseDeleteModal}>
                    No
                </Button>
                <Button
                    variant="danger"
                    onClick={() => handleDeleteClick(automovil?.id)}
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
                <Modal.Title>Editando {automovil?.nombre}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <div>
                    <div>
                    <Form.Label htmlFor="name">Nombre</Form.Label>
                    <Form.Control
                        type="text"
                        id="name"
                        defaultValue={automovil?.nombre}
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
                    onClick={() => handleEditClick(automovil?.id)}
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
            
            <button onClick={filtrarAutomoviles}>Filtrar</button>

            <Table responsive>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Patente</th>
                    </tr>
                </thead>
                <tbody>
                    {automovilesFiltrados.map(({ automovil, id }) => {
                        return (
                        <tr key={automovil.id}>
                            <td>{id}</td>
                            <td>{patente}</td>
                            <td>
                                {/Boton de Eliminar Marca/}
                                <Col className="custom-col">
                                    <Button
                                    type="submit"
                                    variant="primary"
                                    onClick={() => {
                                        setAutomovil({ ...automovil, id});
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
                                        setAutomovil({ ...automovil, id});
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
        </div>
    );
}