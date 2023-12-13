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
import {
  agregarServicioAOrdenDeTrabajo,
  editarOrdenDeTrabajo,
  eliminarOrdenDeTrabajo,
  eliminarServicioDeOrdenDeTrabajo,
} from "../../api/Orden.Controller";
import { PDFDownloadLink } from '@react-pdf/renderer';
import PdfDocument from '../PdfDocument';


/**
 *
 * @param {{
 *  ordenes: Array<OrdenDeTrabajo>
 * }} props
 * @returns
 */
export default function OrdenTable({
  ordenes,
  removerOrdenes,
  servicios,
  setOrdenes,
}) {
  /** Estado que controla que orden fue la que se clickeo (ya sea en edicion o borrado) */
  const [ordenSeleccionada, setOrdenSeleccionada] = useState(null);

  /** Estados y funciones helper para el modal de borrado. */
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDeleteModal = async () => {
    // Eliminar la orden.
    await eliminarOrdenDeTrabajo(ordenSeleccionada?.id);

    // Eliminar la orden del contexto.
    removerOrdenes(ordenSeleccionada?.id);

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
    const detalles = orderEditDetailsRef.current.value;

    // Actualizar la orden.
    const orden = await editarOrdenDeTrabajo(ordenSeleccionada.id, detalles);

    // Actualizar la orden en el contexto.
    setOrdenes((prev) => {
      // Filtrar todas las ordenes.
      const ordenes = prev.filter((o) => o.id !== orden.id);

      // Retornar el estado actualizado.
      return [...ordenes, orden];
    });
  };

  const handleShowEditModal = () => setShowEditModal(true);

  /** Estados para el modal de visualizacion de servicios activos. */
  const [showServiciosModal, setShowServiciosModal] = useState(false);

  const handleShowServiciosModal = () => setShowServiciosModal(true);

  /** Referencia a los servicios seleccionados. */
  const serviciosAgregarRef = useRef([]),
    serviciosBorrarRef = useRef([]);

  /**
   * Funcion que administra el flujo de agregar servicios a una orden.
   */
  const handleAddServiceToOrder = async () => {
    // Esconder modal de servicios.
    setShowServiciosModal(false);

    // Mappear todos los servicios a agregar a sus IDs.
    const serviciosId = serviciosAgregarRef.current
      .getValue()
      .map((s) => s.value);

    if (!serviciosId?.length) return;

    // Ir servicio por servicio y agregarlos a la orden.
    // Actualizar el 'ordenActualizada' con el ultimo resultado.
    let ordenActualizada = null;
    for (const servicio of serviciosId) {
      ordenActualizada = await agregarServicioAOrdenDeTrabajo(
        ordenSeleccionada?.id,
        servicio
      );
    }

    // Actualizar la orden en el contexto.
    setOrdenes((prev) => {
      // Buscar la orden original.
      const orden = prev.find((o) => o.id === ordenSeleccionada?.id);

      // Actualizar la orden con el resultado de la peticion.
      orden.servicios = ordenActualizada.servicios;

      // Retornar el estado actualizado.
      return prev;
    });
  };

  /** Estado que controla si el usuario puede o no eliminar servicios de una orden. */
  const [canRemoveServices, setCanRemoveServices] = useState(false);

  /** Estado que controla si el usuario puede o no agregar un nuevo servicio. */
  const [canAddServices, setCanAddServices] = useState(false);

  /**
   * Funcion que administra el flujo del borrado de servicios de una orden.
   */
  const handleRemoveServiceFromOrder = async () => {
    // Esconder modal de servicios.
    setShowServiciosModal(false);

    // Mappear todos los servicios a borrar a sus IDs.
    const serviciosId = serviciosBorrarRef.current
      .getValue()
      .map((s) => s.value);

    if (!serviciosId?.length) return;

    // Ir servicio por servicio y eliminarlos de la orden.
    // Actualizar el 'ordenActualizada' con el ultimo resultado.
    let ordenActualizada = null;
    for (const servicio of serviciosId) {
      ordenActualizada = await eliminarServicioDeOrdenDeTrabajo(
        ordenSeleccionada?.id,
        servicio
      );
    }

    // Actualizar la orden en el contexto.
    setOrdenes((prev) => {
      // Buscar la orden original.
      const orden = prev.find((o) => o.id === ordenSeleccionada?.id);

      // Actualizar la orden con el resultado de la peticion.
      orden.servicios = ordenActualizada.servicios;

      // Retornar el estado actualizado.
      return prev;
    });
  };

  return (
    <>
      {/** Modal de borrado */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Borrando {ordenSeleccionada?.id}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Esta por eliminar la orden <b>{ordenSeleccionada?.id}</b>. ¿Está
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
          <Modal.Title>Editando {ordenSeleccionada?.id}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="grid grid-cols-1 w-full gap-y-2 mx-2">
            <div>
              <span className="text-sm text-slate-700">Detalles</span>
              <textarea
                className="w-full p-2 border border-slate-200 rounded-md"
                ref={orderEditDetailsRef}
                defaultValue={ordenSeleccionada?.detalles}
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

      {/** Modal de visualizacion de servicios */}
      <Modal
        show={showServiciosModal}
        onHide={() => setShowServiciosModal(false)}
      >
        <Modal.Header className="text-sm">
          <Modal.Title>Servicios de {ordenSeleccionada?.id}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table responsive>
            <thead>
              <tr className="text-center">
                <th>#</th>
                <th>Descripcion</th>
                <th>Precio Unitario</th>
              </tr>
            </thead>
            <tbody>
              {ordenSeleccionada?.servicios?.length ? (
                ordenSeleccionada?.servicios.map((servicio, i) => {
                  const { id, descripcion, precioUnitario } = servicio;

                  return (
                    <tr key={i} className="text-center">
                      <td>{id}</td>
                      <td>{descripcion}</td>
                      <td>{precioUnitario ? `AR$ ${precioUnitario}` : 'N/A'}</td>
                    </tr>
                  );
                })
              ) : (
                <tr className="text-center">
                  <td colSpan={3}>No hay servicios registrados.</td>
                </tr>
              )}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <div className="flex flex-col w-full gap-y-2">
            <div>
              <span className="text-sm text-slate-700">Agregar servicios</span>
              <Select
                isMulti
                isClearable
                ref={serviciosAgregarRef}
                options={servicios.map((servicio) => {
                  // Filtrar los servicios que ya estan en la orden.
                  const isInOrden = ordenSeleccionada?.servicios
                    ?.map((s) => s.id)
                    .includes(servicio.id);

                  return {
                    value: servicio.id,
                    label: servicio.name,
                    description: servicio.descripcion,
                    isDisabled: isInOrden,
                  };
                })}
                onChange={(e) => {
                  // Validar que la orden no tenga todos los servicios.
                  const canAdd =
                    e?.length < servicios?.length &&
                    e?.length > 0 &&
                    e?.length + ordenSeleccionada?.servicios?.length <=
                      servicios?.length;

                  // Actualizar el estado.
                  setCanAddServices(canAdd);
                }}
              ></Select>
              <Button
                variant="primary"
                className="mt-2 w-full"
                onClick={handleAddServiceToOrder}
                disabled={!canAddServices}
              >
                Agregar a Orden
              </Button>
            </div>
            <div>
              <div className="flex flex-col my-1">
                <span className="text-sm text-slate-700">
                  Remover servicios
                </span>
                <span className="text-xs text-slate-500">
                  Recuerda: No puedes sacar todos los servicios de una orden.
                  Debes dejar al menos uno.
                </span>
              </div>
              <Select
                isMulti
                isClearable
                ref={serviciosBorrarRef}
                options={servicios.map((servicio) => {
                  // Filtrar los servicios que ya estan en la orden.
                  const isInOrden = ordenSeleccionada?.servicios
                    ?.map((s) => s.id)
                    .includes(servicio.id);

                  return {
                    value: servicio.id,
                    label: servicio.name,
                    description: servicio.descripcion,
                    isDisabled: !isInOrden,
                  };
                })}
                onChange={(e) => {
                  // Validar si la cantidad de servicios a remover es igual a la cantidad de servicios en la orden.
                  const canRemove =
                    e?.length < ordenSeleccionada?.servicios?.length &&
                    e?.length > 0;

                  // Actualizar el estado.
                  setCanRemoveServices(canRemove);
                }}
              ></Select>
              {!canRemoveServices ? (
                <span className="text-xs text-red-400">
                  No puedes dejar a la orden sin servicios, o debes seleccionar
                  al menos uno.
                </span>
              ) : null}
              <Button
                variant="danger"
                className="mt-2 w-full"
                disabled={!canRemoveServices}
                onClick={handleRemoveServiceFromOrder}
              >
                Remover de Orden
              </Button>
            </div>
          </div>
        </Modal.Footer>
      </Modal>

      <Table responsive>
        <thead>
          <tr className="text-center">
            <th>#</th>
            <th>Automovil</th>
            <th>Servicios</th>
            <th>Notas</th>
            <th>Creado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {ordenes?.length ? (
            ordenes.map((orden, i) => {
              // Declarar una mejor visualizacion.
              const { id, automovil, detalles, fechaCreacion } = orden;

              return (
                <tr key={i} className="text-center">
                  <td>{id}</td>
                  <td>{automovil.licensePlate}</td>
                  <td>
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();

                        // Establecer la orden seleccionada.
                        setOrdenSeleccionada(orden);

                        // Mostrar modal de servicios.
                        handleShowServiciosModal();
                      }}
                    >
                      Ver
                    </a>
                  </td>
                  <td className="text-sm text-slate-400 text-justify">
                    {detalles ?? "N/A"}
                  </td>
                  <td>
                    {
                      /** In DD/MM/YYYY format */
                      new Date(fechaCreacion).toLocaleDateString()
                    }
                  </td>
                  <td className="grid grid-cols-1 w-full" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ marginBottom: '5px', display: 'flex', gap: '5px' }}>
                      <button
                        className="p-1 bg-red-400 text-sm"
                        onClick={(e) => {
                          e.preventDefault();
                          // Establecer la orden seleccionada.
                          setOrdenSeleccionada(orden);
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
                          setOrdenSeleccionada(orden);
                          // Mostrar modal de edicion.
                          handleShowEditModal();
                        }}
                      >
                        Editar
                      </button>
                    </div>
                    {/**Boton para descargar factura */}
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      {/**En el nombre del archivo aparece el id de la orden igual que en el titulo de la factura */}
                      <PDFDownloadLink document={<PdfDocument ordenes={[orden]} />} fileName={`Factura_${orden.id}.pdf`}>
                        {({ loading }) => (
                          <button
                            className="p-1 bg-green-500 text-sm text-black"
                            disabled={loading}
                            style={{ marginLeft: '5px' }}
                          >
                            {loading ? 'Cargando PDF' : 'Descargar Factura'}
                          </button>
                        )}
                      </PDFDownloadLink>
                    </div>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr className="text-center">
              <td colSpan={6}>No hay ordenes de trabajo registradas.</td>
            </tr>
          )}
        </tbody>
      </Table>
    </>
  );
}
