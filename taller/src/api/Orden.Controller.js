import axios from "axios";
import { SpringBoot_Api } from "../app.config";

/**
 * @typedef {Object} OrdenDeTrabajo
 * @property {string} detalles
 * @property {date} fechaCreacion
 * @property {date} fechaModificacion
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
        url: `${SpringBoot_Api}/OrdenesDeTrabajo`,
      });
  
      return data;
    } catch (e) {
      console.error(e);
      return [];
    }
  }

  /**
 * Inserta una nueva marca en el sistema.
 *
 * @param {OrdenDeTrabajo} orden La marca a insertar.
 *
 * @returns {Promise<any>} La marca insertada.
 */
export async function crearOrdenDeTrabajo(orden) {
  try {
    // Crear primero la marca.
    const { data: orde } = await axios({
      method: "POST",
      url: `${SpringBoot_Api}/OrdenesDeTrabajo`,
      data: orden,
    });

    /* // Crear el recurso del cliente.
    const { data: client } = await axios({
      method: "POST",
      url: `${SpringBoot_Api}/clientes`,
      data: {
        person: persona.id,
      },
    }); */

    return orde;
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
        url: `${SpringBoot_Api}/OrdenesDeTrabajo/${id}`,
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
