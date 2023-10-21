import React, { useState } from "react";
import { Form, Table, Button, Modal, Col } from "react-bootstrap";
import {  editarMarca, eliminarMarca, } from "../api/Marca.Controller";


export function TablaMarcas({
    removerMarca,
    marcasFiltradas,
    filtro,
    handleFiltroChange,
    filtrarMarcas,
    setMarcasFiltradas,
    setMarcas,
}) {
    const handleDeleteClick = (id) => {
        eliminarMarca(id).then(() => {
          removerMarca(id);
          setMarcasFiltradas(
            marcasFiltradas.filter((marca) => marca.id !== id)
          );
        });
        handleCloseDeleteModal();
    };

    const handleEditClick = (marcaid) => {
        editarMarca(marca).then((marca) => {
          setMarcas((marcas) => {
            const marcaPrev = marcas.find((m) => m.id === marcaid);
    
            if (marcaPrev) {
              setMarcasFiltradas(marcas);
              return [
                ...marcas.filter((m) => m.id !== marcaid),
                (marcaPrev.marca = marca),
              ];
            }
          });
        });
    
        handleCloseEditModal();
    };

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

    const [marca, setMarca] = useState(null);

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
                    <Modal.Title>Está por borrar una marca.</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Esta acción es permanente, ¿está seguro de querer borrar a{" "}
                {marca?.nombre}?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseDeleteModal}>
                    No
                </Button>
                <Button
                    variant="danger"
                    onClick={() => handleDeleteClick(marca?.id)}
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
                <Modal.Title>Editando {marca?.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <div>
                    <div>
                    <Form.Label htmlFor="name">Nombre</Form.Label>
                    <Form.Control
                        type="text"
                        id="name"
                        defaultValue={marca?.name}
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
                    onClick={() => handleEditClick(marca?.id)}
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
            
            <button onClick={filtrarMarcas}>Filtrar</button>

            <Table responsive>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nombre</th>
                    </tr>
                </thead>
                <tbody>
                    
                    {marcasFiltradas?.map(({marca, id}) => {
                        return (
                        <tr key={marca.id}>
                            <td>{id}</td>
                            <td>{marca.nombre}</td>
                            <td>
                                {/*Boton de Eliminar Marca*/}
                                <Col className="custom-col">
                                    <Button
                                    type="submit"
                                    variant="primary"
                                    onClick={() => {
                                        setMarca({ ...marca, id});
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
                                        setMarca({ ...marca, id});
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
                {marcasFiltradas.map((marca) => (
                    <tr key={marca.id}>
                    <td>{marca.id}</td>
                    <td>{marca.nombre}</td>
                    </tr>
                ))}
                </tbody>
            </table> */}
        </div>
    );
}

export default TablaMarcas;
