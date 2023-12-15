import { useEffect, useState } from "react";
import {
  OrdenContextProvider,
  useOrdenContext,
} from "../../context/OrdenContextProvider";
import { ServicioContextProvider } from "../../context/ServicioContextProvider";
import { PerfilClienteOrdenes } from "./PerfilClienteOrdenes";
import { Button } from "react-bootstrap";

export function PerfilCliente({ idCliente }) {
  const { buscarOrdenesDeCliente } = useOrdenContext();

  const [ordenesDeCliente, setOrdenesDeCliente] = useState([]);

  const [cliente, setCliente] = useState({});

  useEffect(() => {
    const buscar = async () => {
      const ordenes = await buscarOrdenesDeCliente(idCliente);

      setOrdenesDeCliente(ordenes);

      // Obtener cliente a partir de una de las ordenes.
      const cliente = ordenes[0]?.automovil?.client;

      setCliente(cliente);

      console.log(cliente);
    };

    buscar();
  }, []);

  return (
    <div className="w-[98%] m-4 p-4 bg-slate-200 rounded-xl">
      {ordenesDeCliente?.length > 0 ? (
        <div className="flex gap-2 items-center">
          <div className="flex gap-2">
            <img
              className="rounded-full w-24 h-24"
              src={idCliente === 1 ? "/img/guido.jpg" : "/profile.webp"}
            />
            <div className="flex flex-col gap-0">
              <h1 className="text-3xl font-semibold">
                {cliente.person.name} {cliente.person.surName}
              </h1>
              <div>
                <p>Cliente #{idCliente}</p>
                <p>{cliente.person.phoneNumber}</p>
                <p>{cliente.person?.email ?? "Correo Desconocido"}</p>
              </div>
            </div>
          </div>
          <div className="w-full">
            <ServicioContextProvider>
              <OrdenContextProvider>
                <PerfilClienteOrdenes ordenes={ordenesDeCliente} clienteId={idCliente} />
              </OrdenContextProvider>
            </ServicioContextProvider>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-2 items-center">
          <h1 className="text-2xl font-semibold">
            No hay ordenes para este cliente.
          </h1>
          <Button
            variant="primary"
            onClick={(e) => (window.location.href = "/home")}
          >
            Regresar al Home
          </Button>
        </div>
      )}
    </div>
  );
}
