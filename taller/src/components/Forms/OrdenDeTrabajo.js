import { useAutomovilContext } from "../../context/AutomovilContextProvider";
import { useServicioContext } from "../../context/ServicioContextProvider";
import { useOrdenContext } from "../../context/OrdenContextProvider";
import { useTecnicoContext } from "../../context/TecnicoContextProvider";
import OrdenTable from "../Tables/OrdenTable";
import Select from "react-select";
import { useState, useRef } from "react";
import { crearOrdenDeTrabajo } from "../../api/Orden.Controller";

const formatOptionWithDescription = ({ value, label, description }) => (
  <div className="flex flex-col">
    <div>{label}</div>
    <div className="text-sm text-slate-500">{description}</div>
  </div>
);

export default function OrdenDeTrabajo({ something }) {
  /** Acceder a los automoviles existentes del dominio. */
  const { automoviles } = useAutomovilContext();

  /** Accceder a los servicios existentes del dominio. */
  const { servicios } = useServicioContext();

  /** Acceder a los tecnicos del dominio. */
  const { tecnicos } = useTecnicoContext();

  /** Importar funcionalidad de ordenes de trabajo en el contexto. */
  const {
    ordenes,
    setOrdenes,
    removerOrdenes,
    agregarOrdenes,
    confirmarOrden,
    asignarTecnico,
  } = useOrdenContext();

  /** Estado que persiste la seleccion de un automovil. */
  const [automovil, setAutomovil] = useState(null);
  const automovilRef = useRef(automovil);

  /** Estado que persiste la selección de un técnico. */
  const [tecnico, setTecnico] = useState(null);
  const tecnicoRef = useRef(tecnico);

  /** Estado que persiste la seleccion de servicios. */
  const [serviciosSeleccionados, setServiciosSeleccionados] = useState([]);
  const serviciosSeleccionadosRef = useRef(serviciosSeleccionados);

  /** Estado que persiste la escritura de un detalle de la orden (opcional). */
  const [detalles, setDetalles] = useState("");
  const detallesRef = useRef(detalles);

  /** Estado que determina si algo esta cargando. */
  const [isLoading, setIsLoading] = useState(false);

  /** Estado que habilita la creacion de una nueva orden. */
  const [canCreate, setCanCreate] = useState(false);

  const validateInputFields = (carId, servicesId) => {
    if (!carId) return false;
    if (!servicesId?.length) return false;

    return true;
  };

  /**
   * Administra el flujo de ejecucion para la creacion de una nueva orden de trabajo.
   */
  const handleOrderCreation = async () => {
    // Armar cuerpo requerido para creacion.
    const body = {
      automovil,
      servicios: serviciosSeleccionados,
      detalles: detalles ?? null,
      tecnico,
    };

    setIsLoading(true);
    setCanCreate(false);

    try {
      // Crear la nueva orden.
      const orden = await crearOrdenDeTrabajo(body);

      // Agregar la nueva orden a la lista de ordenes.
      agregarOrdenes(orden);
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
    automovilRef.current.clearValue();
    tecnicoRef.current.clearValue();
    serviciosSeleccionadosRef.current.clearValue();
    detallesRef.current.value = "";

    // Limpiar estados.
    setAutomovil(null);
    setTecnico(null);
    setServiciosSeleccionados([]);
    setDetalles("");
    setCanCreate(false);
  };

  return (
    <div className="flex gap-4 w-[98%] mx-4">
      <div className="w-[50%] p-4 bg-slate-200 rounded-xl flex flex-col gap-y-2">
        <h1 className="text-xl">Ordenes de Trabajo</h1>
        <div className="w-full grid grid-cols-2 gap-x-2">
          <div className="w-full py-1">
            <span className="text-sm text-slate-600 p-0">
              Automovil <span className="text-red-400">*</span>
            </span>
            <Select
              isClearable
              isSearchable
              placeholder="Seleccione un automovil"
              ref={automovilRef}
              options={automoviles.map((automovil) => {
                // Obtener modelo y marca.
                const {
                  id,
                  model: {
                    name,
                    year,
                    brand: { name: brandName },
                  },
                  client: { person },
                  licensePlate,
                } = automovil;

                return {
                  value: id,
                  label: `${brandName} ${name} ${year} [${licensePlate}] - ${person.name} ${person.surName}`,
                };
              })}
              onChange={(value) => {
                const id = value?.value ?? null;

                setAutomovil(id);

                // Pasar por parametro, ya que los estados no se actualizan hasta el fin de la ejecucion de la funcion anonima.
                setCanCreate(validateInputFields(id, serviciosSeleccionados));
              }}
            ></Select>
          </div>
          <div className="w-full py-1">
            <span className="text-sm text-slate-600 p-0">Tecnico</span>
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
                const id = value?.value ?? null;

                setTecnico(id);
              }}
            ></Select>
          </div>
          <div className="w-full py-1 col-span-2">
            <span className="text-sm text-slate-600 p-0">
              Servicios <span className="text-red-400">*</span>
            </span>
            <Select
              isClearable
              isSearchable
              isMulti
              formatOptionLabel={formatOptionWithDescription}
              placeholder="Seleccione uno o mas servicios"
              ref={serviciosSeleccionadosRef}
              options={servicios.map((servicio) => ({
                value: servicio.id,
                label: servicio.name,
                description: servicio.descripcion,
              }))}
              onChange={(value) => {
                const ids = value?.map((v) => v.value) ?? [];

                setServiciosSeleccionados(ids);

                // Pasar por parametro, ya que los estados no se actualizan hasta el fin de la ejecucion de la funcion anonima.
                setCanCreate(validateInputFields(automovil, ids));
              }}
            ></Select>
          </div>
          <div className="w-full col-span-2">
            <span className="text-sm text-slate-600 p-0">Detalles</span>
            <textarea
              rows={5}
              className="w-full rounded-md p-2"
              placeholder="Opcionalmente, provea una descripcion adicional..."
              style={{
                resize: "none",
              }}
              ref={detallesRef}
              onChange={(e) => {
                const value = e.target?.value;

                setDetalles(value?.length ? value : null);
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
      <div className="w-full">
        <OrdenTable
          ordenes={ordenes}
          servicios={servicios}
          removerOrdenes={removerOrdenes}
          setOrdenes={setOrdenes}
          confirmarOrden={confirmarOrden}
          tecnicos={tecnicos}
          asignarTecnico={asignarTecnico}
        />
      </div>
    </div>
  );
}
