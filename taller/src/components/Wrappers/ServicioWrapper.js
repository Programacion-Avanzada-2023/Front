import FormServicios from "../Forms/formServicio";
import { ServicioContextProvider } from "../../context/ServicioContextProvider";

export default function ServicioWrapper() {
    return (
        <ServicioContextProvider>
            <FormServicios />
        </ServicioContextProvider>
    );
}