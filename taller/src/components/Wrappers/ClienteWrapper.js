import Cliente from "../Forms/Cliente";
import { ClienteContextProvider } from "../../context/ClienteContextProvider";
import { OrdenContextProvider } from '../../context/OrdenContextProvider';

export default function ClienteWrapper() {
  return (
    <ClienteContextProvider>
      <OrdenContextProvider>
        <Cliente />
      </OrdenContextProvider>

      {/* <Cliente /> */}
    </ClienteContextProvider>
  );
}
