import axios from "axios";
import { SpringBoot_Api } from "../app.config";

/**
 * @typedef {Object} Servicio
 * @property {string} name
 * @property {string} [descripcion]
 */

/**
 * Busca servicios desde la API.
 *
 * @noparams
 *
 * @returns {Promise<Array<any>>} El listado de servicios.
 */
export async function buscarServicios() {
  try {
    const { data } = await axios({
      method: "GET",
      url: `${SpringBoot_Api}/servicios`,
    });

    return data;
  } catch (e) {
    console.error(e);
    return [];
  }
}

/**
 * Inserta a un nuevo servicio en el sistema.
 *
 * @param {Servicio} servicio El servicio a insertar.
 *
 * @returns {Promise<Servicio>} El servicio insertado.
 */
export async function crearServicio(servicio) {
  try {
    // Crear primero la persona.
    const { data: servicio } = await axios({
      method: "POST",
      url: `${SpringBoot_Api}/servicios`,
      data: servicio,
    });

    return servicio;
  } catch (e) {
    console.error(e);
    return null;
  }
}

/**
 * Elimina un servicio del sistema.
 *
 * @param {number} id El ID del servicio a eliminar.
 *
 * @returns {Promise<boolean>} Si se eliminó o no.
 */
export async function eliminarServicio(id) {
  try {
    await axios({
      method: "DELETE",
      url: `${SpringBoot_Api}/servicios/${id}`,
    });

    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
}

/**
 * Edita a un servicio del dominio.
 *
 * @param {Servicio} servicio El servicio a editar.
 *
 * @returns {Promise<any>} El servicio editado.
 */
export async function editarServicio(servicio) {
  try {
    // Editar primero la persona.
    const { data: service} = await axios({
      method: "PATCH",
      url: `${SpringBoot_Api}/servicios/${servicio.id}`,
      data: servicio,
    });

    return service;
  } catch (e) {
    console.error(e);
    return null;
  }
}