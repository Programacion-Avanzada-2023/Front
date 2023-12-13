import FormCliente from "../Forms/FormCliente";
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
