import FormOrdenDeTrabajo from "../Forms/formOrdenDeTrabajo"
import { AutomovilContextProvider } from "../../context/AutomovilContextProvider";
import { ServicioContextProvider } from "../../context/ServicioContextProvider";

export default function OrdenDeTrabajoWrapper() {
  return (
    <ServicioContextProvider>
        <AutomovilContextProvider>
            <FormOrdenDeTrabajo />
        </AutomovilContextProvider>
    </ServicioContextProvider>

  );
}