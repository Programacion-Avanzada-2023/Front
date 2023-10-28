import FormCliente from "../Forms/formCliente";
import { ClienteContextProvider } from "../../context/ClienteContextProvider";
import Cliente from "../Forms/Cliente";

export default function ClienteWrapper() {
  return (
    <ClienteContextProvider>
      <FormCliente />
      {/* <Cliente /> */}
    </ClienteContextProvider>
  );
}
