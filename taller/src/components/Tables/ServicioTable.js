/**
 * @typedef Servicio
 *
 * @property {number} id
 * @property {string} name
 * @property {string} descripcion
 * @property {float} precioUnitario
 */

import { Modal, Button, Table } from "react-bootstrap";
import Select from "react-select";
import { useState, useRef } from "react";
import {
  crearServicio,
  eliminarServicio,
  editarServicio,
} from "../../api/Servicio.Controller";

/**
 *
 * @param {{
 *  servicios: Array<Servicio>
 * }} props
 * @returns
 */
export default function ServicioTable({
  servicios,
  removerServicios,
  setServicios,
}) {
  /** Estado que controla que orden fue la que se clickeo (ya sea en edicion o borrado) */
  const [servicioSeleccionado, setServicioSeleccionado] = useState(null);

  /** Estados y funciones helper para el modal de borrado. */
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDeleteModal = async () => {
    // Eliminar la orden.
    await eliminarServicio(servicioSeleccionado?.id);

    // Eliminar la orden del contexto.
    removerServicios(servicioSeleccionado?.id);

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
    const descripcion = orderEditDetailsRef.current.value;

    // Actualizar la orden en el contexto.
    setServicios((prev) => {
      // Buscar la orden original.
      const servicio = prev.find((s) => s.id === servicioSeleccionado?.id);

      // Actualizar la orden con el resultado de la peticion.
      servicio.descripcion = descripcion;

      // Retornar el estado actualizado.
      return prev;
    });
  };

  const handleShowEditModal = () => setShowEditModal(true);

  return (
    <>
      {/** Modal de borrado */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Borrando {servicioSeleccionado?.id}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Esta por eliminar el servicio <b>{servicioSeleccionado?.id}</b>. ¿Está
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
          <Modal.Title>Editando {servicioSeleccionado?.id}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="grid grid-cols-1 w-full gap-y-2 mx-2">
            <div>
              <span className="text-sm text-slate-700">Descripcion</span>
              <textarea
                className="w-full p-2 border border-slate-200 rounded-md"
                ref={orderEditDetailsRef}
                defaultValue={servicioSeleccionado?.descripcion}
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
            <th>Descripcion</th>
            <th>Precio Unitario</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {servicios?.length ? (
            servicios.map((servicio, i) => {
              // Declarar una mejor visualizacion.
              const { id, name, descripcion, precioUnitario } = servicio;

              return (
                <tr key={i} className="text-center">
                  <td>{id ?? null}</td>
                  <td>{name}</td>
                  <td className="text-sm text-slate-400 text-justify">
                    {descripcion ?? "N/A"}
                  </td>
                  <td>{servicio.precioUnitario ?? "N/A"}</td>
                  <td className="grid grid-cols-2 w-full">
                    <button
                      className="p-1 bg-red-400 text-sm"
                      onClick={(e) => {
                        e.preventDefault();

                        // Establecer la orden seleccionada.
                        setServicioSeleccionado(servicio);

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
                        setServicioSeleccionado(servicio);

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
              <td colSpan={4}>No hay servicios registrados.</td>
            </tr>
          )}
        </tbody>
      </Table>
    </>
  );
  
}
