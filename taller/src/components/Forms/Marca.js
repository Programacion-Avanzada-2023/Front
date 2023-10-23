import { useMarcaContext } from "../../context/MarcaContextProvider";
import MarcaTable from "../Tables/MarcaTable";
import { useState, useRef } from "react";
import { crearMarca } from "../../api/Marca.Controller";

const formatOptionWithDescription = ({ value, label, nombre }) => (
  <div className="flex flex-col">
    <div>{label}</div>
    <div className="text-sm text-slate-500">{nombre}</div>
  </div>
);

export default function Marca({ something }) {
  
  /** Importar funcionalidad de ordenes de trabajo en el contexto. */
  const { marcas, setMarca, removerMarca, agregarMarca } =
    useMarcaContext();

  /** Estado que persiste la escritura de un detalle de la orden (opcional). */
  const [nombre, setNombre] = useState("");
  const nombreRef = useRef(nombre);
  const [origen, setOrigen] = useState("");
  const origenRef = useRef(origen);

  /** Estado que determina si algo esta cargando. */
  const [isLoading, setIsLoading] = useState(false);

  /** Estado que habilita la creacion de una nueva orden. */
  const [canCreate, setCanCreate] = useState(false);

  const validateInputFields = (nombre, origen) => {
    if (!nombre?.length && !origen?.length) return false;

    return true;
  };

  /**
   * Administra el flujo de ejecucion para la creacion de una nueva orden de trabajo.
   */
  const handleOrderCreation = async () => {
    // Armar cuerpo requerido para creacion.
    const body = {
      nombre,
      origen,
    };

    setIsLoading(true);
    setCanCreate(false);

    try {
      // Crear la nueva orden.
      const marca = await crearMarca(body);

      // Agregar la nueva orden a la lista de ordenes.
      agregarMarca(marca);
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
    
    nombreRef.current.value = "";
    origenRef.current.value = "";

    // Limpiar estados.
    setNombre("");
    setOrigen("");
    setCanCreate(false);
  };

  return (
    <div className="grid grid-cols-2 gap-4 w-full mx-4">
      <div className="w-full p-4 bg-slate-200 rounded-xl flex flex-col gap-y-2">
        <h1 className="text-xl">Marcas</h1>
        <div className="w-full grid grid-cols-2 gap-x-2">
          <div className="w-full py-1">
            <span className="text-sm text-slate-600 p-0">Nombre</span>
                <textarea
                rows={5}
                className="w-full rounded-md p-2"
                placeholder="Opcionalmente, provea una descripcion adicional..."
                style={{
                    resize: "none",
                }}
                ref={nombreRef}
                onChange={(e) => {
                    const value = e.target?.value;

                    setNombre(value?.length ? value : null);

                    //setCanCreate(validateInputFields(value));
                }}
                ></textarea>
          </div>
          <div className="w-full py-1">
          <span className="text-sm text-slate-600 p-0">Origen</span>
            <textarea
              rows={5}
              className="w-full rounded-md p-2"
              placeholder="Opcionalmente, provea una descripcion adicional..."
              style={{
                resize: "none",
              }}
              ref={origenRef}
              onChange={(e) => {
                const value = e.target?.value;

                setOrigen(value?.length ? value : null);
                setCanCreate(value);
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
            onClick={handleOrderCreation}
          >
            Crear Nueva
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
        <MarcaTable
          marcas={marcas}
          removerMarca={removerMarca}
          setMarca={setMarca}
        />
      </div>
    </div>
  );
}
