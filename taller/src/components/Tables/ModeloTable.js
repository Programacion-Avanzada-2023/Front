/**
 * @typedef modelo
 *
 * @property {number} id
 * @property {string} name
 * @property {string} year
 */

/**
 * @typedef Modelo
 *
 * @property {number} id
 * @property {string} name
 * @property {modelo} brand
 * @property {number} year
 */

import { Modal, Button, Table } from "react-bootstrap";
import { useState, useRef } from "react";
import { editarModelo, eliminarModelo } from "../../api/Modelo.Controller";

/**
 *
 * @param {{
 *  Modelo: Array<Modelo>
 * }} props
 * @returns
 */
export default function ModeloTable({ modelos, removerModelos, setModelos }) {
  /** Estado que controla que orden fue la que se clickeo (ya sea en edicion o borrado) */
  const [modeloSeleccionado, setModeloSeleccionado] = useState(null);

  /** Estados y funciones helper para el modal de borrado. */
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDeleteModal = async () => {
    // Eliminar la orden.
    await eliminarModelo(modeloSeleccionado?.id);

    // Eliminar la orden del contexto.
    removerModelos(modeloSeleccionado?.id);

    // Esconder el modal.
    setShowDeleteModal(false);
  };
  const handleShowDeleteModal = () => setShowDeleteModal(true);

  /** Estados y funciones helper para el modal de edicion. */
  const [showEditModal, setShowEditModal] = useState(false);
  const [canEditOrder, setCanEditOrder] = useState(false);

  const orderEditDetailsRef = useRef(null);

  const handleEditModal = async () => {
    // Esconder modal de edicion.
    setShowEditModal(false);

    // Obtener el valor del textarea.
    const name = orderEditDetailsRef.current.value;

    const modelo = await editarModelo({
      ...modeloSeleccionado,
      name,
    });

    // Actualizar la orden en el contexto.
    setModelos((prev) => {
      // Filtrar todos los modelos menos el editado.
      const modelos = prev.filter(
        (modelo) => modelo.id !== modeloSeleccionado?.id
      );

      // Establecer el estado con el nuevo modelo.
      return [...modelos, modelo];
    });
  };

  const handleShowEditModal = () => setShowEditModal(true);

  return (
    <>
      {/** Modal de borrado */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Borrando {modeloSeleccionado?.id}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Esta por eliminar la modelo <b>{modeloSeleccionado?.id}</b>. ¿Está
          seguro?
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={(e) => setShowDeleteModal(false)}
          >
            No
          </Button>
          <Button variant="danger" onClick={handleDeleteModal}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>

      {/** Modal de edicion de orden */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Editando {modeloSeleccionado?.id}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="grid grid-cols-1 w-full gap-y-2 mx-2">
            <div>
              <span className="text-sm text-slate-700">name</span>
              <textarea
                className="w-full p-2 border border-slate-200 rounded-md"
                ref={orderEditDetailsRef}
                defaultValue={modeloSeleccionado?.name}
                rows={5}
                style={{
                  resize: "none",
                }}
                onChange={(e) => {
                  const value = e.target?.value;

                  // Actualizar el estado.
                  setCanEditOrder(value?.length ? true : false);
                }}
              ></textarea>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={(e) => setShowEditModal(false)}>
            Cancelar
          </Button>
          <Button
            variant="primary"
            onClick={handleEditModal}
            disabled={!canEditOrder}
          >
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>

      <Table responsive>
        <thead>
          <tr className="text-center">
            <th>#</th>
            <th>Nombre</th>
            <th>Año</th>
            <th>Marca</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {modelos?.length ? (
            modelos.map((modelo, i) => {
              // Declarar una mejor visualizacion.
              const { id, name, year, brand } = modelo;

              return (
                <tr key={i} className="text-center">
                  <td>{id}</td>
                  <td>{name}</td>
                  <td>{year}</td>
                  <td>{brand?.name ?? "N/A"}</td>
                  <td className="grid grid-cols-2 w-full">
                    <button
                      className="p-1 bg-red-400 text-sm"
                      onClick={(e) => {
                        e.preventDefault();

                        // Establecer la orden seleccionada.
                        setModeloSeleccionado(modelo);

                        // Mostrar modal de borrado.
                        handleShowDeleteModal();
                      }}
                    >
                      Borrar
                    </button>
                    <button
                      className="p-1 bg-blue-400 text-sm"
                      onClick={(e) => {
                        e.preventDefault();

                        // Establecer la orden seleccionada.
                        setModeloSeleccionado(modelo);

                        // Mostrar modal de edicion.
                        handleShowEditModal();
                      }}
                    >
                      Editar
                    </button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr className="text-center">
              <td colSpan={6}>No hay modelos registradas.</td>
            </tr>
          )}
        </tbody>
      </Table>
    </>
  );
}
