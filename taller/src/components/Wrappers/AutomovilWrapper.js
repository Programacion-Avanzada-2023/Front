import FormCliente, { FormAutomovil } from "../Forms/formsAutomovil";
import { AutomovilContextProvider } from "../../context/AutomovilContextProvider";
import { ModeloContextProvider } from "../../context/ModeloContextProvider";
import { ClienteContextProvider } from "../../context/ClienteContextProvider";

export default function AutomovilWrapper() {
  return (
    <ClienteContextProvider>
      <ModeloContextProvider>
        <AutomovilContextProvider>
          <FormAutomovil />
        </AutomovilContextProvider>
      </ModeloContextProvider>
    </ClienteContextProvider>
    

    
  );
}