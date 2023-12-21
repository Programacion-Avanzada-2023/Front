import Modelo from "../Forms/Modelo";
import { MarcaContextProvider } from "../../context/MarcaContextProvider";
import { ModeloContextProvider } from "../../context/ModeloContextProvider";

export default function ModeloWrapper() {
  return (
    <MarcaContextProvider>
      <ModeloContextProvider>
        <Modelo />
      </ModeloContextProvider>
    </MarcaContextProvider>
  );
}
