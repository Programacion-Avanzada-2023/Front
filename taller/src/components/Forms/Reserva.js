import { useClienteContext } from "../../context/ClienteContextProvider";
import { useTecnicoContext } from "../../context/TecnicoContextProvider";
import { useReservaContext } from "../../context/ReservaContextProvider";
import Select from "react-select";
import { useState, useRef, useMemo } from "react";
import { crearReserva } from "../../api/Reserva.Controller";
import { Calendar, momentLocalizer, Navigate, Views } from "react-big-calendar";
import TimeGrid from "react-big-calendar/lib/TimeGrid";
import PropTypes from "prop-types";
import * as dates from "date-arithmetic";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

function EveryThreeDays({
  date,
  localizer,
  max = localizer.endOf(new Date(), "day"),
  min = localizer.startOf(new Date(), "day"),
  scrollToTime = localizer.startOf(new Date(), "day"),
  ...props
}) {
  const currRange = useMemo(
    () => EveryThreeDays.range(date, { localizer }),
    [date, localizer]
  );

  return (
    <TimeGrid
      date={date}
      eventOffset={15}
      localizer={localizer}
      max={max}
      min={min}
      range={currRange}
      scrollToTime={scrollToTime}
      {...props}
    />
  );
}

EveryThreeDays.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
  localizer: PropTypes.object,
  max: PropTypes.instanceOf(Date),
  min: PropTypes.instanceOf(Date),
  scrollToTime: PropTypes.instanceOf(Date),
};

EveryThreeDays.range = (date, { localizer }) => {
  const start = date;
  const end = dates.add(start, 2, "day");

  let current = start;
  const range = [];

  while (localizer.lte(current, end, "day")) {
    range.push(current);
    current = localizer.add(current, 1, "day");
  }

  return range;
};

EveryThreeDays.navigate = (date, action, { localizer }) => {
  switch (action) {
    case Navigate.PREVIOUS:
      return localizer.add(date, -3, "day");

    case Navigate.NEXT:
      return localizer.add(date, 3, "day");

    default:
      return date;
  }
};

EveryThreeDays.title = (date) => {
  return `Semana de ${date.toLocaleDateString()}`;
};

export default function Reserva({ something }) {
  const { clientes } = useClienteContext();
  const { tecnicos } = useTecnicoContext();

  const { reservas, agregarReserva } = useReservaContext();

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

    // Validar que tengan contenido las fechas.
    if (!fechaInicio || !fechaInicio.length) return false;
    if (!fechaFin || !fechaFin.length) return false;

    const inicio = new Date(fechaInicio),
      fin = new Date(fechaFin);

    // Validar que esten en un rango válido y no sean en el pasado.
    if (inicio > fin) return false;
    if (inicio < new Date() || fin < new Date()) return false;

    // Validar que no se superpongan con otras reservas.
    const mappeo = reservas.map((reserva) => {
      const rawStart = new Date(reserva.fechaInicio),
        rawEnd = new Date(reserva.fechaFin);

      rawStart.setHours(rawStart.getHours() - 3);
      rawEnd.setHours(rawEnd.getHours() - 3);

      return {
        id: reserva?.id,
        start: rawStart,
        end: rawEnd,
        tecnico: reserva?.tecnico,
        client: reserva?.client,
      };
    });

    // La superposición no deberia ocurrir con reservas del mismo tecnico, si los técnicos son diferentes, no deberia haber problema.
    const overlaps = mappeo.some((reserva) => {
      const { start, end } = reserva;

      const hasOverlap = (inicio >= start && inicio <= end) || (fin >= start && fin <= end);

      if (hasOverlap) {
        if (reserva?.tecnico?.id === tecnico[0]?.value) return true;
      }
    });

    console.log(overlaps);

    if (overlaps) return false;

    if (!tecnico?.length) return false;
    if (!cliente?.length) return false;

    return true;
  };

  const handleReservaCreation = async () => {
    const formatDatesToJava = (date) => {
      const d = new Date(date);

      return d.toISOString().split(".")?.[0]?.split("T").join(" ");
    };

    // Armar cuerpo requerido para creacion.
    const body = {
      fechaInicio: formatDatesToJava(fechaInicio),
      fechaFin: formatDatesToJava(fechaFin),
      tecnico: tecnico,
      client: cliente,
    };

    setIsLoading(true);
    setCanCreate(false);

    try {
      // Crear la nueva orden.
      const reserva = await crearReserva(body);

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
    fechaFinRef.current.value = "";

    // Limpiar estados.
    setTecnico(null);
    setCliente(null);
    setFechaInicio("");
    setFechaFin("");
    setCanCreate(false);
  };

  /** Construir eventos de calendario en base a las reservas. */
  const eventosCalendario = reservas.map((reserva, i) => {
    const rawStart = new Date(reserva.fechaInicio), rawEnd = new Date(reserva.fechaFin);

    rawStart.setHours(rawStart.getHours() - 3);
    rawEnd.setHours(rawEnd.getHours() - 3);

    return {
      id: i,
      title: `Cita de ${reserva.client.person.name} ${reserva.client.person.surName} con técnico ${reserva.tecnico.person.surName}`,
      start: rawStart,
      end: rawEnd,
    };
  });

  const { views } = useMemo(
    () => ({
      defaultDate: new Date(2015, 3, 1),
      views: {
        month: true,
        week: EveryThreeDays,
      },
    }),
    []
  );

  return (
    <div className="flex gap-4 w-[98%] mx-4">
      <div className="w-[60%] h-max p-4 bg-slate-200 rounded-xl flex flex-col gap-y-2">
        <h1 className="text-xl">Reserva</h1>
        <div className="w-full grid grid-cols-2 gap-x-2">
          <div className="w-full py-1 flex flex-col gap-2">
            <span className="text-sm text-slate-600 p-0">
              Fecha Inicio <span className="text-red-400">*</span>
            </span>
            <input
              type="datetime-local"
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
              type="datetime-local"
              ref={fechaFinRef}
              onChange={(e) => {
                const value = e.target?.value;

                setFechaFin(value);

                console.log(value);

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
            onClick={handleReservaCreation}
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
      <div className="w-full bg-white p-4">
        <Calendar
          defaultDate={new Date()}
          defaultView={Views.WEEK}
          localizer={localizer}
          views={views}
          events={eventosCalendario}
        />
      </div>
    </div>
  );
}
