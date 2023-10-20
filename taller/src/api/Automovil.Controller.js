import axios from "axios";
import { SpringBoot_Api } from "../app.config";

/**
 * @typedef {Object} Automovil
 * @property {string} patente

 */

/**
 * Busca automovil desde la API.
 *
 * @noparams
 *
 * @returns {Promise<Array<any>>} El listado de automoviles.
 */
export async function buscarAutomoviles() {
  try {
    const { data } = await axios({
      method: "GET",
      url: `${SpringBoot_Api}/automoviles`,
    });

    return data;
  } catch (e) {
    console.error(e);
    return [];
  }
}

/**
 * Inserta a un nuevo automovil en el sistema.
 *
 * @param {Automovil} automovil El automovil a insertar.
 *
 * @returns {Promise<any>} El automovil insertado.
 */
export async function crearAutomovil(automovil) {
  try {
    // Crear primero la patente.
    const { data } = await axios({
      method: "POST",
      url: `${SpringBoot_Api}/automovil`,
      data: automovil,
    });

    return data;
  } catch (e) {
    console.error(e);
    return null;
  }
}

/**
 * Elimina un automovil del sistema.
 *
 * @param {number} id El ID del automovil a eliminar.
 *
 * @returns {Promise<boolean>} Si se eliminó o no.
 */
export async function eliminarAutomovil(id) {
  try {
    await axios({
      method: "DELETE",
      url: `${SpringBoot_Api}/automovil/${id}`,
    });

    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
}

/**
 * Edita a un automovil del dominio.
 *
 * @param {Modelo} modelo El automovil a editar.
 *
 * @returns {Promise<any>} El automovil editado.
 */
export async function editarAutomovil(id) {
  try {
    // Editar primero la patente.
    const { patente } = await axios({
      method: "PATCH",
      url: `${SpringBoot_Api}/automovil/${id}`,
      data: id,
    });

    return patente;
  } catch (e) {
    console.error(e);
    return null;
  }
}