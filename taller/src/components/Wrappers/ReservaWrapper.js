import { ClienteContextProvider } from "../../context/ClienteContextProvider";
import { ReservaContextProvider } from "../../context/ReservaContextProvider";
import { TecnicoContextProvider } from "../../context/TecnicoContextProvider";
import Reserva from "../Forms/Reserva";

export default function ReservaWrapper() {
  return (
    <ClienteContextProvider>
      <TecnicoContextProvider>
        <ReservaContextProvider>
          <Reserva />
        </ReservaContextProvider>
      </TecnicoContextProvider>
    </ClienteContextProvider>
  );
}
