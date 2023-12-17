import FormCliente from "../Forms/FormCliente";
import { ClienteContextProvider } from "../../context/ClienteContextProvider";
import { OrdenContextProvider } from '../../context/OrdenContextProvider';

export default function ClienteWrapper() {
  return (
    <ClienteContextProvider>
      <OrdenContextProvider>
        <FormCliente />
      </OrdenContextProvider>

      {/* <Cliente /> */}
    </ClienteContextProvider>
  );
}
