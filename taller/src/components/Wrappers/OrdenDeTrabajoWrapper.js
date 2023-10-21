import FormOrdenDeTrabajo from "../Forms/formOrdenDeTrabajo"
import { AutomovilContextProvider } from "../../context/AutomovilContextProvider";
import { ServicioContextProvider } from "../../context/ServicioContextProvider";
import { OrdenContextProvider } from "../../context/OrdenContextProvider"; 

export default function OrdenDeTrabajoWrapper() {
  return (
    <ServicioContextProvider>
        <AutomovilContextProvider>
          <OrdenContextProvider>
            <FormOrdenDeTrabajo />
          </OrdenContextProvider>
        </AutomovilContextProvider>
    </ServicioContextProvider>

  );
}