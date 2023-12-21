/**
 * @typedef Persona
 *
 * @property {number} id
 * @property {string} name
 * @property {string} surName
 * @property {number} dni
 * @property {string} [street]
 * @property {number} [streetNumber]
 * @property {string} [phoneNumber]
 * @property {string} [email]
 */

/**
 * @typedef Cliente
 *
 * @property {number} id
 * @property {Persona} person
 */

/**
 * @typedef Marca
 *
 * @property {number} id
 * @property {string} name
 * @property {string} origen
 * @property {float} impuestoMarca
 */

/**
 * @typedef Modelo
 *
 * @property {number} id
 * @property {string} name
 * @property {Marca} brand
 * @property {number} year
 */

/**
 * @typedef Automovil
 *
 * @property {number} id
 * @property {Modelo} model
 * @property {Cliente} client
 * @property {string} licensePlate
 */

/**
 * @typedef Servicio
 *
 * @property {number} id
 * @property {string} name
 * @property {string} descripcion
 * @property {float} precioUnitario
 */

/**
 * @typedef OrdenDeTrabajo
 *
 * @property {number} id
 * @property {Automovil} automovil
 * @property {string} [detalles]
 * @property {Array<Servicio>} servicios
 * @property {string} fechaCreacion
 * @property {string} fechaModificacion
 */

import { Modal, Button, Table } from "react-bootstrap";
import Select from "react-select";
import { useState, useRef } from "react";
import { eliminarMarca } from "../../api/Marca.Controller";

/**
 *
 * @param {{
 *  marcas: Array<Marca>
 * }} props
 * @returns
 */
export default function MarcaTable({ marcas, removerMarca, setMarcas }) {
  /** Estado que controla que orden fue la que se clickeo (ya sea en edicion o borrado) */
  const [marcaSeleccionada, setMarcaSeleccionada] = useState(null);

  /** Estados y funciones helper para el modal de borrado. */
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDeleteModal = async () => {
    // Eliminar la orden.
    await eliminarMarca(marcaSeleccionada?.id);

    // Eliminar la orden del contexto.
    removerMarca(marcaSeleccionada?.id);

    // Esconder el modal.
    setShowDeleteModal(false);
  };
  const handleShowDeleteModal = () => setShowDeleteModal(true);

  /** Estados y funciones helper para el modal de edicion. */
  const [showEditModal, setShowEditModal] = useState(false);
  const [canEditOrder, setCanEditOrder] = useState(false);

  const orderEditDetailsRef = useRef(null);
  const orderEditDetailsRefName = useRef(null);

  const handleEditModal = async () => {
    // Esconder modal de edicion.
    setShowEditModal(false);

    // Obtener el valor del textarea.
    const name = orderEditDetailsRefName.current.value;
    const origen = orderEditDetailsRef.current.value;
 
    // Actualizar la orden en el contexto.
    setMarcas((prev) => {
      // Buscar la orden original.
      const marca = prev.find((m) => m.id === marcaSeleccionada?.id);

      // Actualizar la orden con el resultado de la peticion.
      marca.name = name;
      marca.origen = origen;

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
          <Modal.Title>Borrando {marcaSeleccionada?.id}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Esta por eliminar la marca <b>{marcaSeleccionada?.id}</b>. ¿Está
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
          <Modal.Title>Editando {marcaSeleccionada?.id}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="grid grid-cols-1 w-full gap-y-2 mx-2">
            <div>
              <span className="text-sm text-slate-700">name</span>
              <textarea
                className="w-full p-2 border border-slate-200 rounded-md"
                ref={orderEditDetailsRefName}
                defaultValue={marcaSeleccionada?.name}
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
            <div>
              <span className="text-sm text-slate-700">Origen</span>
              <textarea
                className="w-full p-2 border border-slate-200 rounded-md"
                ref={orderEditDetailsRef}
                defaultValue={marcaSeleccionada?.origen}
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
            <th>Origen</th>
            <th>Impuesto</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {marcas?.length ? (
            marcas.map((marca, i) => {
              // Declarar una mejor visualizacion.
              const { id, name, origen, impuestoMarca } = marca || {};
              console.log(marca);
              return (
                <tr key={i} className="text-center">
                  <td>{id}</td>
                  <td>{name}</td>
                  <td>{origen?.length ? origen : "No Especifica"}</td>
                  <td>{impuestoMarca ? `${impuestoMarca * 100}%` : "N/A"}</td>
                  <td className="grid grid-cols-2 w-full">
                    <button
                      className="p-1 bg-red-400 text-sm"
                      onClick={(e) => {
                        e.preventDefault();

                        // Establecer la orden seleccionada.
                        setMarcaSeleccionada(marca);

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
                        setMarcaSeleccionada(marca);

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
              <td colSpan={6}>No hay marcas registradas.</td>
            </tr>
          )}
        </tbody>
      </Table>
    </>
  );
}
