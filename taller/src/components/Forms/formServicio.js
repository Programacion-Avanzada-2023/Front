import React, { useState, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Alert from 'react-bootstrap/Alert';
import { useServicioContext } from '../../context/ServicioContextProvider';
import ServicioTable from "../Tables/ServicioTable"
import {crearServicio} from "../../api/Servicio.Controller"

const formatOptionWithDescription = ({ value, label, description }) => (
  <div className="flex flex-col">
    <div>{label}</div>
    <div className="text-sm text-slate-500">{description}</div>
  </div>
);

export default function Servicio({something}) {
  const {servicios, setServicios, removerServicios, agregarServicio} = useServicioContext();

  const [name, setName] = useState("");
  const nameRef = useRef(name);
  const [descripciones, setDescripciones] = useState("");
  const descripcionesRef = useRef(descripciones);

  const [isLoading, setIsLoading] = useState("");

  const [canCreate, setCanCreate] = useState(false);

  const validateInputFields = (name) => {
    if (!name?.length) return false;

    return true;
  };

  const handleServiceCreation = async () => {
    // Armar cuerpo requerido para creacion.
    const body = {
      name: name ?? null,
      descripciones: descripciones ?? null,
    };

    setIsLoading(true);
    setCanCreate(false);

    try {
      // Crear la nueva orden.
      const servicio = await crearServicio(body);

      // Agregar la nueva orden a la lista de ordenes.
      agregarServicio(servicio);
    } catch (e) {
      console.error(e);
    }

    // Resettear estados de control de flujo.
    setIsLoading(false);
    setCanCreate(true);
    clearFormFields();
  };

  /**
   * Limpia los campos del formulario.
   */
  const clearFormFields = () => {
    // Limpiar campos usando las referencias al DOM.
    nameRef.current.value = "";
    descripcionesRef.current.value = "";

    // Limpiar estados.
    setDescripciones("");
    setName("");
    setCanCreate(false);
  };

  return (
    <div className="grid grid-cols-2 gap-4 w-full mx-4">
      <div className="w-full p-4 bg-slate-200 rounded-xl flex flex-col gap-y-2">
        <h1 className="text-xl">Servicios</h1>
        <div className="w-full grid grid-cols-2 gap-x-2">
          <div className="w-full py-1">
            <span className="text-sm text-slate-600 p-0">
              Nombre <span className="text-red-400">*</span>
            </span>
            <input
              isClearable
              isSearchable
              placeholder="Introduzca un nombre"
              ref={nameRef}
              onChange={(e) => {
                const value = e.target?.value;

                setName(value);

                // Usar directamente 'value' para la validación.
                setCanCreate(validateInputFields(value));
              }}
            ></input>

          </div>
          <div className="w-full col-span-2">
            <span className="text-sm text-slate-600 p-0">Descripcion</span>
            <textarea
              rows={5}
              className="w-full rounded-md p-2"
              placeholder="Opcionalmente, provea una descripcion adicional..."
              style={{
                resize: "none",
              }}
              ref={descripcionesRef}
              onChange={(e) => {
                const value = e.target?.value;

                setDescripciones(value?.length ? value : null);

              }}
            ></textarea>
          </div>
        </div>
        <div className="w-full grid grid-cols-3 gap-x-2">
          <button
            className={`w-full p-2 ${
              canCreate ? "bg-blue-500" : "bg-blue-300"
            } rounded-xl text-white font-semibold col-span-2`}
            disabled={!canCreate}
            onClick={handleServiceCreation}
          >
            Crear Nuevo
          </button>
          <button
            className="w-full p-2 bg-orange-500 rounded-xl text-white font-semibold"
            onClick={clearFormFields}
          >
            Limpiar Todo
          </button>
        </div>
      </div>
      <div className="w-[95%]">
        <ServicioTable
          servicio={servicios}
          removerServicios={removerServicios}
          setServicios={setServicios}
        />
      </div>
    </div>
  );
}