import axios from "axios";
import { SpringBoot_Api } from "../app.config";

/**
 * @typedef {Object} Modelo
 * @property {string} nombre
 * @property {int} año
 * //Falta marca para el select, pero no estoy seguro como hacer xd
 */

/**
 * Busca modelos desde la API.
 *
 * @noparams
 *
 * @returns {Promise<Array<any>>} El listado de modelos.
 */
export async function buscarModelos() {
  try {
    const { data } = await axios({
      method: "GET",
      url: `${SpringBoot_Api}/modelos`,
    });

    return data;
  } catch (e) {
    console.error(e);
    return [];
  }
}

/**
 * Inserta a un nuevo modelo en el sistema.
 *
 * @param {Modelo} modelo El modelo a insertar.
 *
 * @returns {Promise<any>} El modelo insertado.
 */
export async function crearModelo(modelo) {
  try {
    // Crear primero el modelo.
    const { nombre } = await axios({
      method: "POST",
      url: `${SpringBoot_Api}/modelos`,
      data: modelo,
    });

    return nombre;
  } catch (e) {
    console.error(e);
    return null;
  }
}

/**
 * Elimina un modelo del sistema.
 *
 * @param {number} id El ID del modelo a eliminar.
 *
 * @returns {Promise<boolean>} Si se eliminó o no.
 */
export async function eliminarModelo(id) {
  try {
    await axios({
      method: "DELETE",
      url: `${SpringBoot_Api}/modelos/${id}`,
    });

    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
}

/**
 * Edita a un modelo del dominio.
 *
 * @param {Modelo} modelo El Modelo a editar.
 *
 * @returns {Promise<any>} El modelo editado.
 */
export async function editarModelo(id) {
  try {
    // Editar primero el modelo.
    const { data: modelo } = await axios({
      method: "PATCH",
      url: `${SpringBoot_Api}/modelos/${id}`,
      data: modelo,
    });

    return modelo;
  } catch (e) {
    console.error(e);
    return null;
  }
}