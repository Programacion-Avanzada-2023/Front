/**
 * @typedef Modelo
 *
 * @property {number} id
 * @property {string} name
 * @property {Marca} brand
 * @property {number} year
 */

/**
 * @typedef Cliente
 *
 * @property {number} id
 * @property {Persona} person
 */


/**
 * @typedef Automovil
 *
 * @property {number} id
 * @property {Modelo} modelo
 * @property {Cliente} client
 * @property {string} licensePlate
 */
import { Modal, Button, Table } from "react-bootstrap";
import Select from "react-select";
import { useState, useRef } from "react";
import {
  editarAutomovil,
  eliminarAutomovil,
} from "../../api/Automovil.Controller";

/**
 *
 * @param {{
 *  Automoviles: Array<Modelo>
 * }} props
 * @returns
 */
export default function AutomovilTable({
  automoviles,
  removerAutomoviles,
  setAutomoviles,
}) {
  /** Estado que controla que orden fue la que se clickeo (ya sea en edicion o borrado) */
  const [automovilSeleccionado, setautomovilSeleccionado] = useState(null);

  /** Estados y funciones helper para el modal de borrado. */
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDeleteModal = async () => {
    // Eliminar la orden.
    await eliminarAutomovil(automovilSeleccionado?.id);

    // Eliminar la orden del contexto.
    removerAutomoviles(automovilSeleccionado?.id);

    // Esconder el modal.
    setShowDeleteModal(false);
  };
  const handleShowDeleteModal = () => setShowDeleteModal(true);

  /** Estados y funciones helper para el modal de edicion. */
  const [showEditModal, setShowEditModal] = useState(false);
  const [canEditOrder, setCanEditOrder] = useState(false);

  const handleShowEditModal = () => setShowEditModal(true);

  const orderEditDetailsRef = useRef(null);

  const handleEditModal = async () => {
    // Esconder modal de edicion.
    setShowEditModal(false);

    // Obtener el valor del textarea.
    const licensePlate = orderEditDetailsRef.current.value;

    const automovil = await editarAutomovil(automovilSeleccionado?.id, licensePlate);
    // Actualizar la orden en el contexto.
    setAutomoviles((prev) => {
      // Buscar la orden original.
      const automoviles = prev.filter((a) => a.id === automovilSeleccionado?.id);

      // Actualizar la orden con el resultado de la peticion.
      /* modelo.name = name;
      modelo.year = year; */

      // Retornar el estado actualizado.
      return [...automoviles, automovil];
    });
  };

  return (
    <>
      {/** Modal de borrado */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Borrando {automovilSeleccionado?.id}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Esta por eliminar la modelo <b>{automovilSeleccionado?.id}</b>. ¿Está
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
          <Modal.Title>Editando {automovilSeleccionado?.id}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="grid grid-cols-1 w-full gap-y-2 mx-2">
            <div>
              <span className="text-sm text-slate-700">name</span>
              <textarea
                className="w-full p-2 border border-slate-200 rounded-md"
                ref={orderEditDetailsRef}
                defaultValue={automovilSeleccionado?.licensePlate}
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

      {/** Modal de visualizacion de marcas */}

      <Table responsive>
        <thead>
          <tr className="text-center">
            <th>#</th>
            <th>Patente</th>
            <th>Modelo</th>
            <th>Cliente</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {automoviles?.length ? (
            automoviles.map((automovil, i) => {
              // Declarar una mejor visualizacion.
              const { id, licensePlate, modelo  } = automovil;

              return (
                <tr key={i} className="text-center">

                  <td>{id}</td>
                  <td>{licensePlate}</td>
                  <td>{modelo?.name ?? "nombre no disponible"}</td>
                  
                  <td>{""}</td>
                  {/* <td>{cliente?.person.name ?? "nombre no disponible"}</td> */}

                  <td className="grid grid-cols-2 w-full">
                    <button
                      className="p-1 bg-red-400 text-sm"
                      onClick={(e) => {
                        e.preventDefault();

                        // Establecer la orden seleccionada.
                        setautomovilSeleccionado(modelo);

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
                        setautomovilSeleccionado(modelo);

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
