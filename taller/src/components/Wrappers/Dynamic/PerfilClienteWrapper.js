import { useParams } from "react-router-dom";
import { OrdenContextProvider } from "../../../context/OrdenContextProvider";
import { PerfilCliente } from "../../DynamicComponents/PerfilCliente";

export function PerfilClienteWrapper() {
  // Obtener ID de cliente de la ruta.
  const { clienteId } = useParams();

  // Parsear el ID a un número.
  const idCliente = parseInt(clienteId);

  return (
    <OrdenContextProvider>
      <PerfilCliente idCliente={idCliente} />
    </OrdenContextProvider>
  );
}
