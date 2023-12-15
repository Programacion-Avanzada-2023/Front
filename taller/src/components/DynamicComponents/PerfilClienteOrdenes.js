import { useOrdenContext } from "../../context/OrdenContextProvider";
import { useServicioContext } from "../../context/ServicioContextProvider";
import OrdenTable from "../Tables/OrdenTable";

export function PerfilClienteOrdenes({ ordenes, clienteId }) {
  const { servicios } = useServicioContext();

  const { setOrdenes, removerOrdenes } = useOrdenContext();

  // Filtrar ordenes por el cliente.
  const ordenesDeCliente = ordenes.filter(
    (orden) => orden.automovil.client.id === clienteId
  );

  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-between items-center">
        <h2 className="text-2xl font-bold">Ordenes de Trabajo</h2>
      </div>
      <OrdenTable
        ordenes={ordenesDeCliente}
        servicios={servicios}
        setOrdenes={setOrdenes}
        removerOrdenes={removerOrdenes}
      />
    </div>
  );
}
