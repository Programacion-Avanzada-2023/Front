//import FormOrdenDeTrabajo from "../Forms/formOrdenDeTrabajo";
import { AutomovilContextProvider } from "../../context/AutomovilContextProvider";
import { ServicioContextProvider } from "../../context/ServicioContextProvider";
import { OrdenContextProvider } from "../../context/OrdenContextProvider";
import OrdenDeTrabajo from "../Forms/OrdenDeTrabajo";

export default function OrdenDeTrabajoWrapper() {
  return (
    <ServicioContextProvider>
      <AutomovilContextProvider>
        <OrdenContextProvider>
          <OrdenDeTrabajo />
        </OrdenContextProvider>
      </AutomovilContextProvider>
    </ServicioContextProvider>
  );
}
