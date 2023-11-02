import { useMarcaContext } from "../../context/MarcaContextProvider";
import { useModeloContext } from "../../context/ModeloContextProvider";
import ModeloTable from "../Tables/ModeloTable";
import Select from "react-select";
import { useState, useRef } from "react";
import { crearModelo } from "../../api/Modelo.Controller";
import { crearAutomovil } from "../../api/Automovil.Controller";
import Automovil from "./Automovil";

const formatOptionWithDescription = ({ value, label, name }) => (
  <div className="flex flex-col">
    <div>{label}</div>
    <div className="text-sm text-slate-500">{name}</div>
  </div>
);

export default function Modelo({ something }) {
  const [showInsertAlert, setShowInsertAlert] = useState(false);

  const { marcas } = useMarcaContext();

  /** Importar funcionalidad de ordenes de trabajo en el contexto. */
  const { modelos, setModelos, removerModelos, agregarModelos } =
    useModeloContext();

  const [marca, setMarca] = useState();
  const marcaRef = useRef(marca);

  /** Estado que persiste la escritura de un detalle de la orden (opcional). */
  const [name, setname] = useState("");
  const nameRef = useRef(name);
  const [year, setYear] = useState("");
  const yearRef = useRef(year);

  /** Estado que determina si algo esta cargando. */
  const [isLoading, setIsLoading] = useState(false);

  /** Estado que habilita la creacion de una nueva orden. */
  const [canCreate, setCanCreate] = useState(false);

  const validateInputFields = (name) => {
    if (!name?.length) return false;

    return true;
  };

  const [modelosFiltrados, setModelosFiltrados] = useState([]);

  /**
   * Administra el flujo de ejecucion para la creacion de una nueva orden de trabajo.
   */
  const handleOrderCreation = async () => {
    // Armar cuerpo requerido para creacion.
    const body = {
      name: name,
      year: year ?? null,
      brand: marca,
    };

    setIsLoading(true);
    setCanCreate(false);

    try {
      // Crear la nueva orden.
      const modelo = await crearModelo(body);

      // Agregar la nueva orden a la lista de ordenes.
      agregarModelos(modelo);
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

    marcaRef.current.clearValue();
    nameRef.current.value = "";
    yearRef.current.value = "";

    // Limpiar estados.
    setMarca(null);
    setname("");
    setYear("");
    setCanCreate(false);
  };

  return (
    <div className="grid grid-cols-2 gap-4 w-full mx-4">
      <div className="w-full p-4 bg-slate-200 rounded-xl flex flex-col gap-y-2">
        <h1 className="text-xl">Modelo</h1>
        <div className="w-full grid grid-cols-2 gap-x-2">
          <div className="w-full py-1">
            <span className="text-sm text-slate-600 p-0">Nombre</span>
            <textarea
              rows={5}
              className="w-full rounded-md p-2"
              isClearable
              isSearchable
              placeholder="Opcionalmente, provea una descripcion adicional..."
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
            <span className="text-sm text-slate-600 p-0">Año</span>
            <textarea
              rows={5}
              className="w-full rounded-md p-2"
              placeholder="Opcionalmente, provea una descripcion adicional..."
              style={{
                resize: "none",
              }}
              ref={yearRef}
              onChange={(e) => {
                const value = e.target?.value;

                setYear(value?.length ? value : null);
                setCanCreate(validateInputFields(year, value));
              }}
            ></textarea>
          </div>
          <div className="w-full py-1">
            <span className="text-sm text-slate-600 p-0">
              Marca <span className="text-red-400">*</span>
            </span>
            <Select
              isClearable
              isSearchable
              placeholder="Seleccione una marca"
              ref={marcaRef}
              options={marcas.map((marca) => {
                // Obtener modelo y marca.
                const { id, name, origen } = marca;

                return {
                  value: id,
                  label: `${name} ${origen ?? ""}`,
                };
              })}
              onChange={(value) => {
                if (value) {
                  const id = value?.value ?? null;

                  setMarca(id);
                  setCanCreate(true);
                }

                // Pasar por parametro, ya que los estados no se actualizan hasta el fin de la ejecucion de la funcion anonima.
              }}
              isMulti={false}
            ></Select>
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
        <ModeloTable
          modelos={modelos}
          marcas={marcas}
          removerModelos={removerModelos}
          setModelos={setModelos}
        />
      </div>
    </div>
  );
}
