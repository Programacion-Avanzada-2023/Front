//import FormOrdenDeTrabajo from "../Forms/formOrdenDeTrabajo";
import { AutomovilContextProvider } from "../../context/AutomovilContextProvider";
import { ServicioContextProvider } from "../../context/ServicioContextProvider";
import { OrdenContextProvider } from "../../context/OrdenContextProvider";
import OrdenDeTrabajo from "../Forms/OrdenDeTrabajo";
import { TecnicoContextProvider } from "../../context/TecnicoContextProvider";

export default function OrdenDeTrabajoWrapper() {
  return (
    <ServicioContextProvider>
      <AutomovilContextProvider>
        <TecnicoContextProvider>
          <OrdenContextProvider>
            <OrdenDeTrabajo />
          </OrdenContextProvider>
        </TecnicoContextProvider>
      </AutomovilContextProvider>
    </ServicioContextProvider>
  );
}
