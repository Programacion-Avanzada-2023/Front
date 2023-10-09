import axios from "axios";
import { SpringBoot_Api } from "../app.config";

/**
 * @typedef {Object} Cliente
 * @property {string} nombre
 * @property {string} apellido
 * @property {number} dni
 * @property {string} street
 * @property {number} streetNumber
 * @property {string} phoneNumber
 */

/**
 * Busca clientes desde la API.
 *
 * @noparams
 *
 * @returns {Promise<Array<any>>} El listado de clientes.
 */
export async function buscarClientes() {
  try {
    const { data } = await axios({
      method: "GET",
      url: `${SpringBoot_Api}/clientes`,
    });

    return data;
  } catch (e) {
    console.error(e);
    return [];
  }
}

/**
 * Inserta a un nuevo cliente en el sistema.
 *
 * @param {Cliente} cliente El cliente a insertar.
 *
 * @returns {Promise<any>} El cliente insertado.
 */
export async function crearCliente(cliente) {
  try {
    // Crear primero la persona.
    const { data: persona } = await axios({
      method: "POST",
      url: `${SpringBoot_Api}/personas`,
      data: cliente,
    });

    // Crear el recurso del cliente.
    const { data: client } = await axios({
      method: "POST",
      url: `${SpringBoot_Api}/clientes`,
      data: {
        person: persona.id,
      },
    });

    return client;
  } catch (e) {
    console.error(e);
    return null;
  }
}

/**
 * Elimina un cliente del sistema.
 *
 * @param {number} id El ID del cliente a eliminar.
 *
 * @returns {Promise<boolean>} Si se eliminó o no.
 */
export async function eliminarCliente(id) {
  try {
    await axios({
      method: "DELETE",
      url: `${SpringBoot_Api}/clientes/${id}`,
    });

    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
}

/**
 * Edita a un cliente del dominio.
 *
 * @param {Cliente} cliente El cliente a editar.
 *
 * @returns {Promise<any>} El cliente editado.
 */
export async function editarCliente(cliente) {
  try {
    // Editar primero la persona.
    const { data: persona } = await axios({
      method: "PATCH",
      url: `${SpringBoot_Api}/personas/${cliente.idPersona}`,
      data: cliente,
    });

    return persona;
  } catch (e) {
    console.error(e);
    return null;
  }
}
