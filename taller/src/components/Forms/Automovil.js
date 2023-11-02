import { useAutomovilContext } from "../../context/AutomovilContextProvider";
import { useClienteContext } from "../../context/ClienteContextProvider";
import { useModeloContext } from "../../context/ModeloContextProvider";
import AutomovilTable from "../Tables/AutomovilTable";
import Select from "react-select";
import { useState, useRef } from "react";
import { crearAutomovil } from "../../api/Automovil.Controller";

/* const formatOptionWithDescription = ({ value, label, name }) => (
  <div className="flex flex-col">
    <div>{label}</div>
    <div className="text-sm text-slate-500">{name}</div>
  </div>
);
 */
export default function Automovil({ something }) {


  const { modelos } = useModeloContext();

  const { clientes } = useClienteContext();

  /** Importar funcionalidad de ordenes de trabajo en el contexto. */
  const { Automovil, setAutomoviles, removerAutomoviles, agregarAutomoviles } =
    useAutomovilContext();

  const [modelo, setModelo] = useState();
  const modeloRef = useRef(modelo);
  const [cliente, setCliente] = useState();
  const clienteRef = useRef(cliente);

  /** Estado que persiste la escritura de un detalle de la orden (opcional). */
  const [licensePlate, setLicensePlate] = useState("");
  const licensePlateRef = useRef(licensePlate);

  /** Estado que determina si algo esta cargando. */
  const [isLoading, setIsLoading] = useState(false);

  /** Estado que habilita la creacion de una nueva orden. */
  const [canCreate, setCanCreate] = useState(false);

  const validateInputFields = (licensePlate) => {
    if (!licensePlate) return false;

    return true;
  };

  /**
   * Administra el flujo de ejecucion para la creacion de una nueva orden de trabajo.
   */
  const handleOrderCreation = async () => {    
    // Armar cuerpo requerido para creacion.
    const body = {
      license: licensePlate,
      modelo,
      cliente,
    };

    setIsLoading(true);
    setCanCreate(false);

    try {
      // Crear la nueva orden.
      console.log(body);
      const automovil = await crearAutomovil(body)/* .then(() => {agregarModelos(modelo)
        console.log(name, year, marca);
        console.log(modelo);
      }) */
      console.log(licensePlate, modelo, cliente);
      console.log(automovil);

      // Agregar la nueva orden a la lista de ordenes.
      agregarAutomoviles(automovil);
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

    modeloRef.current.clearValue();
    clienteRef.current.clearValue();
    licensePlateRef.current.value = "";

    // Limpiar estados.
    setModelo(null);
    setCliente(null);
    setLicensePlate("");
    setCanCreate(false);
  };

  return (
    <div className="grid grid-cols-2 gap-4 w-full mx-4">
      <div className="w-full p-4 bg-slate-200 rounded-xl flex flex-col gap-y-2">
        <h1 className="text-xl">Automovil</h1>
        <div className="w-full grid grid-cols-2 gap-x-2">
          <div className="w-full py-1">
            <span className="text-sm text-slate-600 p-0">Patente</span>
                <textarea
                rows={5}
                className="w-full rounded-md p-2"
                isClearable
                isSearchable
                placeholder="Opcionalmente, provea una descripcion adicional..."
                style={{
                    resize: "none",
                }}
                ref={licensePlateRef}
                onChange={(e) => {
                    const value = e.target?.value;

                    setLicensePlate(value);

                    setCanCreate(validateInputFields(licensePlate, value));
                }}
                ></textarea>
          </div>
            <div className="w-full py-1">
                <span className="text-sm text-slate-600 p-0">
                Modelo <span className="text-red-400">*</span>
                </span>
                <Select
                isClearable
                isSearchable
                placeholder="Seleccione un modelo"
                ref={modeloRef}
                options={modelos.map((modelo) => {
                    // Obtener modelo y marca.
                    const {
                    id,
                    name,
                    year,
                    } = modelo;

                    return {
                    value: id,
                    label: `${name} ${year} `,
                    };
                })}
                onChange={(value) => {
                  if (value) {

                    const id = value?.value ?? null;

                    setModelo(id);
                    setCanCreate(true);
                  } 

                    // Pasar por parametro, ya que los estados no se actualizan hasta el fin de la ejecucion de la funcion anonima.
                }}
                isMulti = {false}
                ></Select>
          </div>
          <div className="w-full py-1">
                <span className="text-sm text-slate-600 p-0">
                Cliente <span className="text-red-400">*</span>
                </span>
                <Select
                isClearable
                isSearchable
                placeholder="Seleccione un cliente"
                ref={clienteRef}
                options={clientes.map((cliente) => {
                    // Obtener modelo y marca.
                    const {
                    id,
                    name,
                    surName,
                    dni,
                    } = cliente;

                    return {
                    value: id,
                    label: `${name} ${surName} ${dni} `,
                    };
                })}
                onChange={(value) => {
                  if (value) {

                    const id = value?.value ?? null;

                    setCliente(id);
                    setCanCreate(true);
                  } 

                    // Pasar por parametro, ya que los estados no se actualizan hasta el fin de la ejecucion de la funcion anonima.
                }}
                isMulti = {false}
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
        <AutomovilTable
          automoviles={modelos}
          removerAutomoviles={removerAutomoviles}
          setAutomoviles={setAutomoviles}
        />
      </div>
    </div>
  );
}
