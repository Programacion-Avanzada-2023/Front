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
  const [precioUnitario, setPrecioUnitario] = useState("");
  const pUnitarioRef = useRef(precioUnitario);

  const [isLoading, setIsLoading] = useState("");

  const [canCreate, setCanCreate] = useState(false);

  const validateInputFields = (name, descripcion, precioUnitario) => {
    if (!name?.length) return false;
    if (!descripcion?.length || descripcion?.length < 4) return false;
    if (!precioUnitario || precioUnitario <= 0) {
      return false; // Indicar que los campos no son válidos
    }
    return true; // Si todos los campos son válidos
  };
  const handleServiceCreation = async () => {
    if (!name) return;
  
    // Armar cuerpo requerido para creacion.
    const body = {
      name: name,
      descripcion: descripciones ?? null,
      precioUnitario: precioUnitario, // Incluir el precio unitario en el cuerpo del servicio
    };
  
    setIsLoading(true);
    setCanCreate(false);
  
    try {
      // Crear el nuevo servicio.
      const servicio = await crearServicio(body);
  
      // Agregar el nuevo servicio a la lista de servicios.
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
    setPrecioUnitario("");
    setDescripciones("");
    setName("");
    setCanCreate(false);
  };

  return (
    <div className="grid grid-cols-2 gap-4 w-full mx-4">
      <div className="w-full p-4 bg-slate-200 rounded-xl flex flex-col gap-y-2">
        <h1 className="text-xl">Servicios</h1>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label className="text-sm text-slate-600">
              Nombre <span className="text-red-400">*</span>
            </label>
            <input
              className="p-1 rounded-md"
              placeholder="Introduzca un nombre"
              ref={nameRef}
              onChange={(e) => {
                const value = e.target?.value;
                setName(value);
                setCanCreate(validateInputFields(value, descripciones));
              }}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm text-slate-600">
              Precio Unitario <span className="text-red-400">*</span>
            </label>
            <input
              type="number"
              className="p-1 rounded-md"
              placeholder="Introduzca el precio unitario"
              value={precioUnitario}
              onChange={(e) => {
                const value = e.target.value;
                setPrecioUnitario(value);
                setCanCreate(validateInputFields(name, descripciones, value));
              }}
            />
          </div>
          <div className="flex flex-col col-span-2">
            <label className="text-sm text-slate-600">
              Descripción <span className="text-red-400">*</span>
            </label>
            <textarea
              rows={5}
              className="w-full rounded-md p-2"
              placeholder="Opcionalmente, provea una descripción adicional..."
              style={{ resize: "none" }}
              ref={descripcionesRef}
              onChange={(e) => {
                const value = e.target?.value;
                setDescripciones(value?.length ? value : null);
                setCanCreate(validateInputFields(name, value));
              }}
            ></textarea>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <button
            className={`col-span-2 p-2 ${
              canCreate ? "bg-blue-500" : "bg-blue-300"
            } rounded-xl text-white font-semibold`}
            disabled={!canCreate}
            onClick={handleServiceCreation}
          >
            Crear Nuevo
          </button>
          <button
            className="p-2 bg-orange-500 rounded-xl text-white font-semibold"
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
