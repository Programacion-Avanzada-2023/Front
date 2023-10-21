import FormMarca from "../Forms/formMarca";
import { MarcaContextProvider } from "../../context/MarcaContextProvider";

export default function MarcaWrapper() {
    return (
        <MarcaContextProvider>
            <FormMarca />
        </MarcaContextProvider>
    );
}