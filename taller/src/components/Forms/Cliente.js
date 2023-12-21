import { useClienteContext } from "../../context/ClienteContextProvider";
import ClienteTable from "../Tables/ClienteTable";
import { useState, useRef } from "react";
import { crearCliente } from "../../api/Cliente.Controller";
import { useOrdenContext } from "../../context/OrdenContextProvider";

export default function Cliente({ something }) {
  /** Importar funcionalidad de ordenes de trabajo en el contexto. */
  const { clientes, setClientes, removerCliente, agregarCliente } =
    useClienteContext();

  /** Estado que persiste la escritura de un detalle de la orden (opcional). */
  const [name, setName] = useState("");
  const [surName, setSurName] = useState("");
  const [dni, setDni] = useState("");
  const [street, setStreet] = useState("");
  const [streetNumber, setStreetNumber] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");

  const nameRef = useRef(name);
  const surnameRef = useRef(surName);
  const dniRef = useRef(dni);
  const streetRef = useRef(street);
  const streetNumberRef = useRef(name);
  const phoneNumberRef = useRef(name);
  const emailRef = useRef(name);

  /** Estado que determina si algo esta cargando. */
  const [isLoading, setIsLoading] = useState(false);

  /** Estado que habilita la creacion de una nueva orden. */
  const [canCreate, setCanCreate] = useState(false);

  const validateInputFields = (
    name,
    surName,
    dni,
    street,
    streetNumber,
    phoneNumber,
    email
  ) => {
    if (!name?.length) return false;
    if (!surName?.length) return false;
    if (!dni?.length) return false;
    if (!street?.length) return false;
    if (!streetNumber?.length) return false;
    if (!phoneNumber?.length) return false;
    if (!email?.length) return false;

    return true;
  };

  /**
   * Administra el flujo de ejecucion para la creacion de una nueva orden de trabajo.
   */
  const handleOrderCreation = async () => {
    if (
      !name ||
      !surName ||
      !dni ||
      !street ||
      !streetNumber ||
      !phoneNumber ||
      !email
    )
      return;

    const isValidFields = validateInputFields(
      name,
      surName,
      dni,
      street,
      streetNumber,
      phoneNumber,
      email
    );
    // Armar cuerpo requerido para creacion.
    if (isValidFields) {
      const body = {
        name: name,
        surName: surName,
        dni: dni,
        street: street,
        streetNumber: streetNumber,
        phoneNumber: phoneNumber,
        email: email,
      };

      setIsLoading(true);
      setCanCreate(false);

      try {
        const cliente = await crearCliente(body);
        agregarCliente(cliente);
      } catch (e) {
        console.error(e);
      }

      setIsLoading(false);
      clearFormFields();
    }
  };
  /**
   * Limpia los campos del formulario.
   */
  const clearFormFields = () => {
    // Limpiar campos usando las referencias al DOM.

    nameRef.current.value = "";
    surnameRef.current.value = "";
    dniRef.current.value = "";
    streetRef.current.value = "";
    streetNumberRef.current.value = "";
    phoneNumberRef.current.value = "";
    emailRef.current.value = "";

    // Limpiar estados.
    setName("");
    setSurName("");
    setDni("");
    setStreet("");
    setStreetNumber("");
    setPhoneNumber("");
    setEmail("");
    setCanCreate(false);
  };

  const { ordenes } = useOrdenContext();
  const [clientesFiltrados, setClientesFiltrados] = useState([]);

  /** Estado que persiste el filtro por nombre o apellido de cliente */
  const [filtroNombre, setFiltroNombre] = useState("");

  /** Estado que persiste la fecha de última visita. */
  const [filtroFecha, setFiltroFecha] = useState("");

  /**
   * Filtra a los clientes por el nombre o apellido ingresado.
   */
  const filtrarPorNombre = (previo) => {
    if (!filtroNombre) return previo ?? clientes;

    console.log(clientes);

    const filtrados = (previo ?? clientes).filter(
      ({ person: cliente }) =>
        cliente.name.toLowerCase().includes(filtroNombre.toLowerCase()) ||
        cliente.surName.toLowerCase().includes(filtroNombre.toLowerCase())
    );

    return filtrados;
  };

  /**
   * Filtra a los clientes por la fecha de última visita ingresada.
   */
  const filtrarPorFecha = (previo) => {
    if (!filtroFecha) return previo ?? clientesFiltrados;

    const filtrados = (previo ?? clientes).filter((cliente) => {
      // Buscar la última orden del cliente.
      const ultimaOrden = ordenes
        .filter((orden) => orden.automovil.client.id === cliente.id)
        .sort(
          (a, b) =>
            new Date(b.fechaModificacion) - new Date(a.fechaModificacion)
        )[0];

      // Si no tiene ordenes, no filtrar.
      if (!ultimaOrden) return true;

      // Es igual a la fecha de última visita?
      const fecha = new Date(ultimaOrden.fechaModificacion),
        fechaDeFiltro = new Date(filtroFecha);

      return (
        fecha.getUTCFullYear() === fechaDeFiltro.getUTCFullYear() &&
        fecha.getUTCMonth() === fechaDeFiltro.getUTCMonth() &&
        fecha.getUTCDate() === fechaDeFiltro.getUTCDate()
      );
    });

    return filtrados;
  };

  const handleFiltroChange = () => {
    const filtroPorNombre = filtrarPorNombre();

    const filtroFinal = filtrarPorFecha(filtroPorNombre);

    setClientesFiltrados(filtroFinal);
  };

  return (
    <div className="grid grid-cols-2 gap-4 w-full mx-4">
      <div className="w-full p-4 bg-slate-200 rounded-xl flex flex-col gap-y-2">
        <h1 className="text-xl">Clientes</h1>
        <div className="w-full grid grid-cols-3 gap-x-2">
          <div className="w-full py-1">
            <span className="text-sm text-slate-600 p-0">
              Nombre <span className="text-red-400 text-sm">*</span>
            </span>
            <input
              type="text"
              className="w-full rounded-md p-2"
              placeholder="Nombre"
              ref={nameRef}
              onChange={(e) => {
                const value = e.target?.value;

                setName(value);

                setCanCreate(validateInputFields(name, value));
              }}
            />
          </div>
          <div className="w-full py-1">
            <span className="text-sm text-slate-600 p-0">
              Apellido <span className="text-red-400 text-sm">*</span>
            </span>
            <input
              type="text"
              className="w-full rounded-md p-2"
              placeholder="Apellido"
              ref={surnameRef}
              onChange={(e) => {
                const value = e.target?.value;

                setSurName(value);

                setCanCreate(validateInputFields(surName, value));
              }}
            />
          </div>
          <div className="w-full py-1">
            <span className="text-sm text-slate-600 p-0">
              D.N.I. <span className="text-red-400 text-sm">*</span>
            </span>
            <input
              type="number"
              className="w-full rounded-md p-2"
              placeholder="D.N.I."
              ref={dniRef}
              onChange={(e) => {
                const value = e.target?.value;

                setDni(value);

                setCanCreate(validateInputFields(dni, value));
              }}
            />
          </div>
          <div className="w-full py-1">
            <span className="text-sm text-slate-600 p-0">
              Telefono Celular <span className="text-red-400 text-sm">*</span>
            </span>
            <input
              type="text"
              className="w-full rounded-md p-2"
              placeholder="+54 ..."
              ref={phoneNumberRef}
              onChange={(e) => {
                const value = e.target?.value;

                setPhoneNumber(value);

                setCanCreate(validateInputFields(phoneNumber, value));
              }}
            />
          </div>
          <div className="col-span-2 flex gap-x-2">
            <div className="w-full py-1">
              <span className="text-sm text-slate-600 p-0">Direccion</span>
              <input
                type="text"
                className="w-full rounded-md p-2"
                placeholder="Nombre de Calle"
                ref={streetRef}
                onChange={(e) => {
                  const value = e.target?.value;

                  setStreet(value);

                  setCanCreate(validateInputFields(street, value));
                }}
              />
            </div>
            <div className="w-full py-1">
              <span className="text-sm text-slate-600 p-0">Altura</span>
              <input
                type="number"
                className="w-full rounded-md p-2"
                placeholder="Altura de Calle"
                ref={streetNumberRef}
                onChange={(e) => {
                  const value = e.target?.value;

                  setStreetNumber(value);

                  setCanCreate(validateInputFields(streetNumber, value));
                }}
              />
            </div>
          </div>
          <div className="py-1 col-span-3 justify-self-center w-[50%]">
            <span className="text-sm text-slate-600 p-0">E-Mail</span>
            <input
              type="text"
              className="w-full rounded-md p-2"
              placeholder="alguien@test.com"
              ref={emailRef}
              onChange={(e) => {
                const value = e.target?.value;

                setEmail(value);

                setCanCreate(validateInputFields(email, value));
              }}
            />
          </div>
          <div className="w-full flex gap-2 col-span-3">
            <button
              className={`w-full p-2 ${
                name &&
                surName &&
                dni &&
                street &&
                streetNumber &&
                phoneNumber &&
                email &&
                validateInputFields(
                  name,
                  surName,
                  dni,
                  street,
                  streetNumber,
                  phoneNumber,
                  email
                )
                  ? "bg-blue-500"
                  : "bg-blue-300"
              } rounded-xl text-white font-semibold col-span-2`}
              disabled={
                !name ||
                !surName ||
                !dni ||
                !street ||
                !streetNumber ||
                !phoneNumber ||
                !email ||
                !validateInputFields(
                  name,
                  surName,
                  dni,
                  street,
                  streetNumber,
                  phoneNumber,
                  email
                )
              }
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
      </div>
      <div className="w-[95%]">
        <ClienteTable
          clientes={clientes}
          removerCliente={removerCliente}
          setClientes={setClientes}
          setFiltroNombre={setFiltroNombre}
          setFiltroFecha={setFiltroFecha}
          handleFiltroChange={handleFiltroChange}
          setClientesFiltrados={setClientesFiltrados}
        />
      </div>
    </div>
  );
}
