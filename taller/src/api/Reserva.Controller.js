import axios from "axios";
import { SpringBoot_Api } from "../app.config";

/**
 * @typedef {Object} Reserva
 * @property {import('./Cliente.Controller').Cliente} client
 * @property {import('./Tecnico.Controller').Tecnico} tecnico
 * @property {number} fechaInicio
 * @property {number} fechaFin
 */

/**
 * @returns {Array<Reserva>}
 */
export async function buscarReservas() {
  try {
    const { data } = await axios({
      method: "GET",
      url: `${SpringBoot_Api}/reservas`,
    });

    return data;
  } catch (e) {
    console.error(e);
    return [];
  }
}

/**
 * Inserta una nueva reserva en el sistema.
 *
 * @param {Reserva} reservaDto La reserva a insertar.
 *
 * @returns {Promise<Reserva>} La reserva insertada.
 */
export async function crearReserva(reservaDto) {
  try {
    // Crear primero la marca.
    const { data: reserva } = await axios({
      method: "POST",
      url: `${SpringBoot_Api}/reservas`,
      data: reservaDto,
    });

    return reserva;
  } catch (e) {
    console.error(e);
    return null;
  }
}

/**
 * Elimina una reserva del sistema.
 *
 * @param {number} id El ID de la reserva a eliminar.
 *
 * @returns {Promise<boolean>} Si se eliminó o no.
 */
export async function eliminarReserva(id) {
  try {
    await axios({
      method: "DELETE",
      url: `${SpringBoot_Api}/reservas/${id}`,
    });

    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
}

/**
 * Edita a una reserva del dominio.
 *
 * @param {number} id El ID de la reserva a editar.
 * @param {string} fechaInicio
 * @param {string} fechaFin
 *
 * @returns {Promise<Reserva>} La reserva editada.
 */
export async function editarReserva(id, fechaInicio, fechaFin) {
    try {
      const { data: reserva } = await axios({
        method: "PATCH",
        url: `${SpringBoot_Api}/reservas/${id}`,
        data: {
          fechaInicio,
          fechaFin,
            //...detalles,
        },
      });
  
      return reserva;
    } catch (e) {
      console.error(e);
      return null;
    }
  }