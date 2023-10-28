import React, { useState, useRef } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import Alert from "react-bootstrap/Alert";
import { useServicioContext } from "../../context/ServicioContextProvider";
import ServicioTable from "../Tables/ServicioTable";
import { crearServicio } from "../../api/Servicio.Controller";

const formatOptionWithDescription = ({ value, label, description }) => (
  <div className="flex flex-col">
    <div>{label}</div>
    <div className="text-sm text-slate-500">{description}</div>
  </div>
);

export default function Servicio({ something }) {
  const { servicios, setServicios, removerServicios, agregarServicio } =
    useServicioContext();

  const [name, setName] = useState("");
  const nameRef = useRef(name);
  const [descripciones, setDescripciones] = useState("");
  const descripcionesRef = useRef(descripciones);

  const [isLoading, setIsLoading] = useState("");

  const [canCreate, setCanCreate] = useState(false);

  const validateInputFields = (name, descripcion) => {
    if (!name?.length) return false;
    if (!descripcion?.length || descripcion?.length < 4) return false;

    return true;
  };

  const handleServiceCreation = async () => {
    if (!name) return;

    // Armar cuerpo requerido para creacion.
    const body = {
      name: name,
      descripcion: descripciones ?? null,
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
          <div className="w-full py-1 flex flex-col">
            <span className="text-sm text-slate-600 p-0">
              Nombre <span className="text-red-400">*</span>
            </span>
            <input
              className="p-1 rounded-md"
              isClearable
              isSearchable
              placeholder="Introduzca un nombre"
              ref={nameRef}
              onChange={(e) => {
                const value = e.target?.value;

                setName(value);

                // Usar directamente 'value' para la validación.
                setCanCreate(validateInputFields(value, descripciones));
              }}
            ></input>
          </div>
          <div className="w-full">
            <span className="text-sm text-slate-600 p-0">
              Descripcion <span className="text-red-400">*</span>
            </span>
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

                setCanCreate(validateInputFields(name, value));
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
          servicios={servicios}
          removerServicios={removerServicios}
          setServicios={setServicios}
        />
      </div>
    </div>
  );
}
