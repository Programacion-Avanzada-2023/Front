import FormCliente from "../Forms/formCliente";
import { ClienteContextProvider } from "../../context/ClienteContextProvider";

export default function ClienteWrapper() {
  return (
    <ClienteContextProvider>
      <FormCliente />
    </ClienteContextProvider>
  );
}
