import axios from "axios";
import { SpringBoot_Api } from "../app.config";

/**
 * @typedef {Object} OrdenDeTrabajo
 *
 * @property {number} automovil
 * @property {Array<number>} servicios
 * @property {string} [detalles]
 */

/**
 * Busca Marcas desde la API.
 *
 * @noparams
 *
 * @returns {Promise<Array<any>>} El listado de clientes.
 */

export async function buscarOrdenes() {
  try {
    const { data } = await axios({
      method: "GET",
      url: `${SpringBoot_Api}/ordenes`,
    });

    return data;
  } catch (e) {
    console.error(e);
    return [];
  }
}

/**
 * Inserta una nueva orden de trabajo en el sistema.
 *
 * @param {OrdenDeTrabajo} orden La orden a insertar.
 *
 * @returns {Promise<OrdenDeTrabajo>} La orden insertada.
 */
export async function crearOrdenDeTrabajo(orden) {
  try {
    // Crear primero la marca.
    const { data: ordenTrabajo } = await axios({
      method: "POST",
      url: `${SpringBoot_Api}/ordenes`,
      data: orden,
    });

    return ordenTrabajo;
  } catch (e) {
    console.error(e);
    return null;
  }
}

/**
 * Elimina una marca del sistema.
 *
 * @param {number} id El ID de la marca a eliminar.
 *
 * @returns {Promise<boolean>} Si se eliminó o no.
 */
export async function eliminarOrdenDeTrabajo(id) {
  try {
    await axios({
      method: "DELETE",
      url: `${SpringBoot_Api}/ordenes/${id}`,
    });

    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
}

/**
 * Edita a una marca del dominio.
 *
 * @param {OrdenDeTrabajo} orden La marca a editar.
 *
 * @returns {Promise<any>} La marca editada.
 */
export async function editarOrdenDeTrabajo(orden) {
  try {
    const { data: orde } = await axios({
      method: "PATCH",
      url: `${SpringBoot_Api}/OrdenesDeTrabajo/${orden.id}`,
      data: orden,
    });

    return orde;
  } catch (e) {
    console.error(e);
    return null;
  }
}

/**
 * Agrega un servicio a una orden de trabajo.
 *
 * @param {number} id El ID de la orden de trabajo.
 * @param {number} servicioId El ID del servicio a agregar.
 *
 * @returns {Promise<any>} La orden de trabajo editada.
 */
export async function agregarServicioAOrdenDeTrabajo(id, servicioId) {
  try {
    const { data: orden } = await axios({
      method: "POST",
      url: `${SpringBoot_Api}/ordenes/${id}/servicios`,
      data: {
        servicio: servicioId,
      },
    });

    return orden;
  } catch (e) {
    console.error(e);
    return null;
  }
}

/**
 * Elimina un servicio de una orden de trabajo.
 *
 * @param {number} id El ID de la orden de trabajo.
 * @param {number} servicioId El ID del servicio a eliminar.
 *
 * @returns {Promise<any>} La orden de trabajo editada.
 */
export async function eliminarServicioDeOrdenDeTrabajo(id, servicioId) {
  try {
    const { data: orden } = await axios({
      method: "DELETE",
      url: `${SpringBoot_Api}/ordenes/${id}/servicios`,
      data: {
        servicio: servicioId,
      },
    });

    return orden;
  } catch (e) {
    console.error(e);
    return null;
  }
}
