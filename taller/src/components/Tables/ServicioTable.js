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
import { useState, useRef, useEffect } from "react";
import {
  crearServicio,
  eliminarServicio,
  editarServicio,
} from "../../api/Servicio.Controller";
import axios from "axios";
import { SpringBoot_Api } from "../../app.config";

/**
 *
 * @param {{
 *  servicios: Array<Servicio>
 * }} props
 * @returns
 */
export default function ServicioTable({
  servicios,
  removerServicio,
  setServicios,
}) {
  /** Estado que controla que orden fue la que se clickeo (ya sea en edicion o borrado) */
  const [servicioSeleccionado, setServicioSeleccionado] = useState(null);

  /** Estados y funciones helper para el modal de borrado. */
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDeleteModal = async () => {
    // Eliminar el servicio.
    await eliminarServicio(servicioSeleccionado?.id);

    // Eliminar al servicio.
    removerServicio(servicioSeleccionado?.id);

    // Agregar al servicio a la lista de eliminados.
    setServiciosEliminados((prev) => {
      return [...prev, servicioSeleccionado];
    });

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

    // Actualizar la orden en la base de datos.
    await editarServicio(servicioSeleccionado?.id, {
      descripcion,
    });

    // Actualizar la orden en el contexto.
    setServicios((prev) => {
      const servicios = prev.filter(
        (serv) => serv.id !== servicioSeleccionado.id
      );

      return [...servicios, { ...servicioSeleccionado, descripcion }];
    });
  };

  const handleShowEditModal = () => setShowEditModal(true);

  const [mostrarEliminados, setMostrarEliminados] = useState(false);

  const [serviciosEliminados, setServiciosEliminados] = useState([]);

  async function recuperarServicio(id) {
    const { data: servicioRecuperado } = await axios({
      method: "PATCH",
      url: `${SpringBoot_Api}/servicios/${id}/recuperar`,
    });

    setServicios((prev) => {
      const servicios = prev.filter((serv) => serv.id !== id);

      return [...servicios, servicioRecuperado];
    });

    setServiciosEliminados((prev) => {
      const servicios = prev.filter((serv) => serv.id !== id);

      return [...servicios];
    });
  }

  useEffect(() => {
    async function buscarEliminados() {
      const { data } = await axios({
        method: "GET",
        url: `${SpringBoot_Api}/servicios`,
        params: {
          eliminado: true,
        },
      });

      setServiciosEliminados(data);
    }

    buscarEliminados();
  }, []);

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

      <div className="w-full">
        <div className="p-4 bg-slate-50 m-auto flex gap-2">
          <input
            type="checkbox"
            className="p-2 checked:bg-blue-500 bg-white"
            onChange={(e) => {
              setMostrarEliminados(e.target.checked);
            }}
          />
          <span className="text-sm text-slate-700">Mostrar Eliminados</span>
        </div>
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
                    <td>{precioUnitario ? `AR$ ${precioUnitario}` : "N/A"}</td>
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
                <td colSpan={5}>No hay servicios registrados.</td>
              </tr>
            )}
            {mostrarEliminados && serviciosEliminados?.length
              ? serviciosEliminados.map((servicio, i) => {
                  // Declarar una mejor visualizacion.
                  const { id, name, descripcion, precioUnitario } = servicio;

                  return (
                    <tr key={i} className="text-center text-red-500">
                      <td>{id ?? null}</td>
                      <td>{name}</td>
                      <td className="text-sm text-slate-400 text-justify">
                        {descripcion ?? "N/A"}
                      </td>
                      <td>
                        {precioUnitario ? `AR$ ${precioUnitario}` : "N/A"}
                      </td>
                      <td className="flex gap-2 w-full">
                        <button
                          disabled={false}
                          className="p-1 bg-green-400 text-sm w-full"
                          onClick={(e) => {
                            e.preventDefault();

                            recuperarServicio(id);
                          }}
                        >
                          Recuperar
                        </button>
                      </td>
                    </tr>
                  );
                })
              : null}
          </tbody>
        </Table>
      </div>
    </>
  );
}
