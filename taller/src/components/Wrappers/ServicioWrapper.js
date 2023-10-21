import FormServicios from "../Forms/formServicios";
import { ServicioContextProvider } from "../../context/ServicioContextProvider";

export default function ServicioWrapper() {
    return (
        <ServicioContextProvider>
            <FormServicios />
        </ServicioContextProvider>
    );
}