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
  const { automoviles, setAutomoviles, removerAutomovil, agregarAutomovil } =
    useAutomovilContext();

  const [modelo, setModelo] = useState();
  const modeloRef = useRef(modelo);
  const [cliente, setCliente] = useState();
  const clienteRef = useRef(cliente);
  const [kilometraje, setKilometraje] = useState(0);
  const kilometrajeRef = useRef(kilometraje);

  /** Estado que persiste la escritura de un detalle de la orden (opcional). */
  const [licensePlate, setLicensePlate] = useState("");
  const licensePlateRef = useRef(licensePlate);

  /** Estado que determina si algo esta cargando. */
  const [isLoading, setIsLoading] = useState(false);

  /** Estado que habilita la creacion de una nueva orden. */
  const [canCreate, setCanCreate] = useState(false);

  const validateInputFields = (licensePlate, modelo, cliente, kilometraje) => {
    console.log(licensePlate, modelo, cliente, kilometraje);

    if (!licensePlate?.length) return false;
    if (
      !/^([A-Za-z]{3}[0-9]{3}|[A-Za-z]{2}[0-9]{3}[A-Za-z]{2}|[A-Za-z]{2}\\-[0-9]{4}|[A-Za-z][0-9]{3}[A-Za-z]{3}|[A-Za-z][0-9]{6})$/.test(
        licensePlate
      )
    )
      return false;
    if (typeof modelo === "undefined") return false;
    if (typeof cliente === "undefined") return false;
    if (kilometraje < 0) return false;

    return true;
  };

  /**
   * Administra el flujo de ejecucion para la creacion de una nueva orden de trabajo.
   */
  const handleOrderCreation = async () => {
    // Armar cuerpo requerido para creacion.
    const body = {
      licensePlate,
      model: modelo,
      client: cliente,
      km: kilometraje,
    };

    setIsLoading(true);
    setCanCreate(false);

    try {
      // Crear la nueva orden.
      const automovil = await crearAutomovil(
        body
      ); /* .then(() => {agregarModelos(modelo)
        console.log(name, year, marca);
        console.log(modelo);
      }) */

      // Agregar la nueva orden a la lista de ordenes.
      agregarAutomovil(automovil);
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
    kilometrajeRef.current.value = 0;

    // Limpiar estados.
    setModelo(null);
    setCliente(null);
    setLicensePlate("");
    setCanCreate(false);
    setKilometraje(0);
  };

  return (
    <div className="grid grid-cols-2 gap-4 w-full mx-4">
      <div className="w-full p-4 bg-slate-200 rounded-xl flex flex-col gap-y-2">
        <h1 className="text-xl">Automovil</h1>
        <div className="w-full grid grid-cols-2 gap-x-2">
          <div className="w-full py-1">
            <span className="text-sm text-slate-600 p-0">
              Patente <span className="text-red-400">*</span>
            </span>
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

                setCanCreate(
                  validateInputFields(value, modelo, cliente, kilometraje)
                );
              }}
            ></textarea>
          </div>
          <div className="w-full py-1 flex flex-col gap-2">
            <span className="text-sm text-slate-600 p-0">
              Kilometraje <span className="text-red-400">*</span>
            </span>
            <input
              type="number"
              step={150}
              ref={kilometrajeRef}
              defaultValue={0}
              onChange={(e) => {
                const value = parseInt(e.target?.value);

                setKilometraje(value);

                setCanCreate(
                  validateInputFields(licensePlate, modelo, cliente, value)
                );
              }}
              className="p-1 rounded-md"
            />
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
                const { id, name, year } = modelo;

                return {
                  value: id,
                  label: `${name} ${year} `,
                };
              })}
              onChange={(value) => {
                if (value) {
                  const id = value?.value ?? null;

                  setModelo(id);
                  setCanCreate(
                    validateInputFields(licensePlate, id, cliente, kilometraje)
                  );
                }

                // Pasar por parametro, ya que los estados no se actualizan hasta el fin de la ejecucion de la funcion anonima.
              }}
              isMulti={false}
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
                  person: { name, surName, dni },
                } = cliente;

                return {
                  value: id,
                  label: `${name} ${surName} ${dni} `,
                };
              })}
              onChange={(value) => {
                const id = value?.value ?? null;

                setCliente(id);
                setCanCreate(
                  validateInputFields(licensePlate, modelo, id, kilometraje)
                );

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
        <AutomovilTable
          automoviles={automoviles}
          removerAutomoviles={removerAutomovil}
          setAutomoviles={setAutomoviles}
        />
      </div>
    </div>
  );
}
