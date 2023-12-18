import FormCliente from "../Forms/formCliente";
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
