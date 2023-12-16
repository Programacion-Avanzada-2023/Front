import { useClienteContext } from "../../context/ClienteContextProvider";
import { useTecnicoContext } from "../../context/TecnicoContextProvider";
import { useReservaContext } from "../../context/ReservaContextProvider";
import Select from "react-select";
import { useState, useRef } from "react";
import { crearReserva } from "../../api/Reserva.Controller";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

export default function Reserva({ something }) {
  const { clientes } = useClienteContext();
  const { tecnicos } = useTecnicoContext();

  const { reservas, setReserva, removerReserva, agregarReserva } =
    useReservaContext();

  const [cliente, setCliente] = useState();
  const clienteRef = useRef(cliente);
  const [tecnico, setTecnico] = useState();
  const tecnicoRef = useRef(tecnico);
  const [fechaInicio, setFechaInicio] = useState();
  const fechaInicioRef = useRef(fechaInicio);
  const [fechaFin, setFechaFin] = useState();
  const fechaFinRef = useRef(fechaFin);

  /** Estado que determina si algo esta cargando. */
  const [isLoading, setIsLoading] = useState(false);

  /** Estado que habilita la creacion de una nueva orden. */
  const [canCreate, setCanCreate] = useState(false);

  const validateInputFields = () => {
    const fechaInicio = fechaInicioRef.current.value;
    const fechaFin = fechaFinRef.current.value;
    const cliente = clienteRef.current.getValue();
    const tecnico = tecnicoRef.current.getValue();

    if (!fechaInicio || !fechaInicio.length) return false;
    if (!fechaFin || !fechaFin.length) return false;

    const inicio = new Date(fechaInicio),
      fin = new Date(fechaFin);
    if (inicio > fin) return false;
    if (inicio < new Date() || fin < new Date()) return false;

    if (!tecnico?.length) return false;
    if (!cliente?.length) return false;

    return true;
  };

  const handleOrderCreation = async () => {
    // Armar cuerpo requerido para creacion.
    const body = {
      fechaInicio,
      fechaFin,
      tecnico: tecnico,
      client: cliente,
    };

    setIsLoading(true);
    setCanCreate(false);

    try {
      // Crear la nueva orden.
      console.log(body);
      const reserva = await crearReserva(body);
      console.log(fechaInicio, fechaFin, tecnico, cliente);
      console.log(reserva);

      // Agregar la nueva orden a la lista de ordenes.
      agregarReserva(reserva);
    } catch (e) {
      console.error(e);
    }

    // Resettear estados de control de flujo.
    setIsLoading(false);
    setCanCreate(true);
    clearFormFields();
  };

  const clearFormFields = () => {
    // Limpiar campos usando las referencias al DOM.

    tecnicoRef.current.clearValue();
    clienteRef.current.clearValue();
    fechaInicioRef.current.value = "";
    fechaFinRef.current.value = 0;

    // Limpiar estados.
    setTecnico(null);
    setCliente(null);
    setFechaInicio("");
    setFechaFin("");
    setCanCreate(false);
  };

  return (
    <div className="grid grid-cols-2 gap-4 w-full mx-4">
      <div className="w-full p-4 bg-slate-200 rounded-xl flex flex-col gap-y-2">
        <h1 className="text-xl">Reserva</h1>
        <div className="w-full grid grid-cols-2 gap-x-2">
          <div className="w-full py-1 flex flex-col gap-2">
            <span className="text-sm text-slate-600 p-0">
              Fecha Inicio <span className="text-red-400">*</span>
            </span>
            <input
              type="date"
              ref={fechaInicioRef}
              onChange={(e) => {
                const value = e.target?.value;

                setFechaInicio(value);

                setCanCreate(validateInputFields());
              }}
              className="p-1 rounded-md"
            />
          </div>
          <div className="w-full py-1 flex flex-col gap-2">
            <span className="text-sm text-slate-600 p-0">
              Fecha Fin <span className="text-red-400">*</span>
            </span>
            <input
              type="date"
              ref={fechaFinRef}
              onChange={(e) => {
                const value = e.target?.value;

                setFechaFin(value);

                setCanCreate(validateInputFields());
              }}
              className="p-1 rounded-md"
            />
          </div>
          <div className="w-full py-1">
            <span className="text-sm text-slate-600 p-0">
              Tecnico <span className="text-red-400">*</span>
            </span>
            <Select
              isClearable
              isSearchable
              placeholder="Seleccione un tecnico"
              ref={tecnicoRef}
              options={tecnicos.map((tecnico) => ({
                value: tecnico.id,
                label: `${tecnico.person.name} ${tecnico.person.surName}`,
              }))}
              onChange={(value) => {
                if (value) {
                  const id = value?.value ?? null;

                  setTecnico(id);
                  setCanCreate(validateInputFields());
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
                if (value) {
                  const id = value?.value ?? null;

                  setCliente(id);
                  setCanCreate(validateInputFields());
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
      <Calendar localizer={localizer} />
    </div>
  );
}
