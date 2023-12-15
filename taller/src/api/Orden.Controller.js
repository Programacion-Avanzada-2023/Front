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
 * Edita a una orden del dominio.
 *
 * @param {number} id El ID de la orden a editar.
 * @param {string} detalles Los detalles nuevos de la orden.
 *
 * @returns {Promise<OrdenDeTrabajo>} La orden editada.
 */
export async function editarOrdenDeTrabajo(id, detalles) {
  try {
    const { data: orde } = await axios({
      method: "PATCH",
      url: `${SpringBoot_Api}/ordenes/${id}`,
      data: {
        detalles,
      },
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

/**
 * Busca las ordenes de trabajo por un cliente específico.
 *
 * @param {number} idCliente
 *
 * @returns {Promise<Orden[]>}
 */
export async function buscarOrdenesPorCliente(idCliente) {
  try {
    const { data } = await axios({
      method: "GET",
      url: `${SpringBoot_Api}/ordenes/cliente/${idCliente}`,
    });

    return data;
  } catch (e) {
    console.error(`Fallo al buscar ordenes de cliente ${idCliente}: ${e}`);
  }
}
