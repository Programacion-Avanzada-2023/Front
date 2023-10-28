//import FormMarca from "../Forms/formMarca";
import { MarcaContextProvider } from "../../context/MarcaContextProvider";
import Marca from "../Forms/Marca";

export default function MarcaWrapper() {
    return (
        <MarcaContextProvider>
            <Marca />
        </MarcaContextProvider>
    );
}