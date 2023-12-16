import axios from 'axios';
import { SpringBoot_Api } from "../app.config";

/**
 * @typedef {Object} Tecnico
 *
 * @property {number} id
 * @property {import("../components/Tables/OrdenTable").Persona} person
 */

export async function buscarTecnicos() {
  try {
    const { data } = await axios({
      method: "GET",
      url: `${SpringBoot_Api}/tecnicos`,
    });

    return data;
  } catch (e) {
    console.error(e);
    return [];
  }
}