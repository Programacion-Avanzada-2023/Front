import { useMarcaContext } from "../../context/MarcaContextProvider";
import MarcaTable from "../Tables/MarcaTable";
import { useState, useRef } from "react";
import { crearMarca } from "../../api/Marca.Controller";

const formatOptionWithDescription = ({ value, label, name }) => (
  <div className="flex flex-col">
    <div>{label}</div>
    <div className="text-sm text-slate-500">{name}</div>
  </div>
);

export default function Marca({ something }) {
  
  /** Importar funcionalidad de ordenes de trabajo en el contexto. */
  const { marcas, setMarcas, removerMarca, agregarMarca } =
    useMarcaContext();

  /** Estado que persiste la escritura de un detalle de la orden (opcional). */
  const [name, setname] = useState("");
  const nameRef = useRef(name);
  const [origen, setOrigen] = useState("");
  const origenRef = useRef(origen);
  const [impuestoMarca, setImpuestoMarca] = useState("");
  const impuestoRef = useRef(impuestoMarca);

  /** Estado que determina si algo esta cargando. */
  const [isLoading, setIsLoading] = useState(false);

  /** Estado que habilita la creacion de una nueva orden. */
  const [canCreate, setCanCreate] = useState(false);

  const validateInputFields = (name, origen, impuestoMarca) => {
    if (!name?.length) return false;
    if (!origen?.length || origen?.length < 4) return false;
    if (!impuestoMarca || impuestoMarca < 0) {
      return false; // Indicar que los campos no son válidos
    }
    const decimalRegex = /^\d+(\.\d{1,2})?$/;

    if (!decimalRegex.test(impuestoMarca.toString())) {
      return false; // No es un número decimal válido
    }
    return true;
  };

  /**
   * Administra el flujo de ejecucion para la creacion de una nueva orden de trabajo.
   */
  const handleOrderCreation = async () => {
    if (!name || !origen || !impuestoMarca) return;

    const isValidFields = validateInputFields(name, origen, impuestoMarca);
    // Armar cuerpo requerido para creacion.
    if (isValidFields) {
      const body = {
        name: name,
        origen: origen ?? null,
        impuestoMarca: impuestoMarca,
      };
  
      setIsLoading(true);
      setCanCreate(false);
  
      try {
        const marca = await crearMarca(body);
        agregarMarca(marca);
      } catch (e) {
        console.error(e);
      }
  
      setIsLoading(false);
      clearFormFields();
    }
  }
  /**
   * Limpia los campos del formulario.
   */
  const clearFormFields = () => {
    // Limpiar campos usando las referencias al DOM.
    
    nameRef.current.value = "";
    origenRef.current.value = "";
    impuestoRef.current.value = "";

    // Limpiar estados.
    setname("");
    setOrigen("");
    setImpuestoMarca("");
    setCanCreate(false);
  };


  return (
    <div className="grid grid-cols-2 gap-4 w-full mx-4">
      <div className="w-full p-4 bg-slate-200 rounded-xl flex flex-col gap-y-2">
        <h1 className="text-xl">Marcas</h1>
        <div className="w-full grid grid-cols-2 gap-x-2">
          <div className="w-full py-1">
              <label className="text-sm text-slate-600">
                Nombre <span className="text-red-400">*</span>
              </label>
                <textarea
                rows={5}
                className="w-full rounded-md p-2"
                isClearable
                isSearchable
                placeholder="Introduzca nombre de la marca"
                style={{
                    resize: "none",
                }}
                ref={nameRef}
                onChange={(e) => {
                    const value = e.target?.value;

                    setname(value);

                    setCanCreate(validateInputFields(name, value));
                }}
                ></textarea>
          </div>
          <div className="w-full py-1">
            <label className="text-sm text-slate-600">
                  Origen <span className="text-red-400">*</span>
                </label>
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
        <div className="flex flex-col">
            <label className="text-sm text-slate-600">
              Impuesto<span className="text-red-400">*</span>
            </label>
            <input
              type="number"
              className="p-1 rounded-md"
              placeholder="Introduzca el impuesto de la marca"
              value={impuestoMarca}
              ref={impuestoRef}
              onChange={(e) => {
                const value = e.target.value;
                setImpuestoMarca(value);
                setCanCreate(validateInputFields(name, origen, value));
              }}
            />
          </div>
        <div className="w-full grid grid-cols-3 gap-x-2">
          <button
            className={`w-full p-2 ${
              name && origen && impuestoMarca && validateInputFields(name, origen, impuestoMarca) ? "bg-blue-500" : "bg-blue-300"
            } rounded-xl text-white font-semibold col-span-2`}
            disabled={!name || !origen || !impuestoMarca || !validateInputFields(name, origen, impuestoMarca)}
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
          setMarcas={setMarcas}
        />
      </div>
    </div>
  );
}
