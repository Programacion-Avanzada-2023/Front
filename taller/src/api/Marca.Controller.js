import axios from "axios";
import { SpringBoot_Api } from "../app.config";

/**
 * @typedef {Object} Marca
 * @property {string} nombre
 */

/**
 * Busca Marcas desde la API.
 *
 * @noparams
 *
 * @returns {Promise<Array<any>>} El listado de clientes.
 */

export async function buscarMarcas() {
  try {
    const { data: dataM } = await axios({
      method: "GET",
      url: `${SpringBoot_Api}/marcas`,
    });

    return dataM;
  } catch (e) {
    console.error(e);
    return [];
  }
}

/**
 * Inserta una nueva marca en el sistema.
 *
 * @param {Marca} marca La marca a insertar.
 *
 * @returns {Promise<any>} La marca insertada.
 */
export async function crearMarca(marca) {
  try {
    // Crear primero la marca.
    const { data: marc } = await axios({
      method: "POST",
      url: `${SpringBoot_Api}/marcas`,
      data: marca,
    });

    /* // Crear el recurso del cliente.
    const { data: client } = await axios({
      method: "POST",
      url: `${SpringBoot_Api}/clientes`,
      data: {
        person: persona.id,
      },
    }); */

    return marc;
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
export async function eliminarMarca(id) {
  try {
    await axios({
      method: "DELETE",
      url: `${SpringBoot_Api}/marcas/${id}`,
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
 * @param {Marca} marca La marca a editar.
 *
 * @returns {Promise<any>} La marca editada.
 */
export async function editarMarca(marca) {
  try {
    const { data: marc } = await axios({
      method: "PATCH",
      url: `${SpringBoot_Api}/marcas/${marca.id}`,
      data: marca,
    });

    return marc;
  } catch (e) {
    console.error(e);
    return null;
  }
}
