import  Automovil from "../Forms/Automovil";
import { AutomovilContextProvider } from "../../context/AutomovilContextProvider";
import { ModeloContextProvider } from "../../context/ModeloContextProvider";
import { ClienteContextProvider } from "../../context/ClienteContextProvider";

export default function AutomovilWrapper() {
  return (
    <ClienteContextProvider>
      <ModeloContextProvider>
        <AutomovilContextProvider>
          <Automovil />
        </AutomovilContextProvider>
      </ModeloContextProvider>
    </ClienteContextProvider>
    

    
  );
}