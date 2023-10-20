import FormModelo from "../Forms/formsModelo";
import { MarcaContextProvider } from "../../context/MarcaContextProvider";
import { ModeloContextProvider } from "../../context/ModeloContextProvider";

export default function ModeloWrapper() {
  return (
    <MarcaContextProvider>
      <ModeloContextProvider>
        <FormModelo />
      </ModeloContextProvider>
    </MarcaContextProvider>
  );
}
