import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

// Creacion de estilos para pdf
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    padding: 1,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  title: {
    fontSize: 22,
    marginBottom: 10,
  },
  label: {
    fontSize: 18,
    marginTop: 10,
    marginBottom: 5,
  },
  value: {
    fontSize: 14,
    marginBottom: 10,
  },
  footer: {
    marginTop: 20,
    textAlign: "center",
    fontSize: 12,
  },
});

const FacturaPDF = ({ orden }) => {
  const ordenTest = {
    id: "90872a5a-35c8-44d9-9051-a03c44e51186",
    automovil: {
      id: 1,
      model: {
        id: 1,
        name: "Tiida",
        year: 2015,
        brand: {
          id: 2,
          name: "Nissan",
          origen: null,
        },
      },
      client: {
        id: 1,
        person: {
          id: 1,
          name: "Guido",
          surName: "Serniotti",
          dni: 43601081,
          street: "Dario Ramonda",
          streetNumber: 1850,
          phoneNumber: "+54123",
          email: null,
        },
      },
      licensePlate: "AA123AA",
      km: "",
    },
    detalles: "",
    servicios: [
      {
        id: 1,
        name: "Cambio de Aceite 4 tiempos",
        descripcion:
          "Cambio del aceite de motor para una motocicleta de 4 tiempos",
        precioUnitario: 2000.0,
      },
      {
        id: 2,
        name: "Cambio de filtro de aire",
        descripcion:
          "Cambio del filtro de aire del motor con repuesto apropiado",
        precioUnitario: 3000.0,
      },
    ],
    fechaCreacion: "2023-10-23T13:48:15.873416500",
    fechaModificacion: "2023-10-23T13:48:15.873416500",
  };

  return (
    <div className="bg-white">
      <Document>
        <Page style={styles.page}>
          <View>
            <div className="w-full m-4 gap-4 flex items-center">
              <img src="/icono.ico" width="100" />
              <div className="flex flex-col gap-y-2">
                <span className="text-2xl text-slate-800">
                  Los Santos Customs
                </span>
                <span className="text-lg text-slate-600">
                  Calidad que impulsa tu confianza
                </span>
              </div>
              <div className="justify-end">
                <p className="text-sm text-slate-600">#{ordenTest.id}</p>
                <p className="text-sm text-slate-600">
                  {new Date().toLocaleString()}
                </p>
              </div>
            </div>
            <div className="w-full mx-6 my-2 bg-slate-600 h-1"></div>
            <div className="relative overflow-x-auto mx-4">
              <table className="w-full text-sm text-left rtl:text-right text-gray-400">
                <thead className="text-xs uppercase bg-gray-700 text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Servicio
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Precio Unitario
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Impuesto a la Marca
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Subtotal
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-700 text-slate-600">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium whitespace-nowraptext-white"
                    >
                      {ordenTest.servicios[0].name}
                    </th>
                    <td className="px-6 py-4">AR$ {ordenTest.servicios[0].precioUnitario}</td>
                    <td className="px-6 py-4">{ordenTest.automovil.model.brand.impuestoMarca}</td>
                    <td className="px-6 py-4">$2999</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </View>
        </Page>
      </Document>
    </div>
  );
};

// Creacion del componente que sera exportado
/* const MyDocument = ({ ordenes }) => (
  <Document width={500} height={700} wrap>
    {ordenes.map((orden, index) => (
      <Page style={styles.page} key={index}>
        <View style={styles.section}>
          <View>
            <Text style={styles.title}>Factura #{orden.id}</Text>
          </View>
          <View>
            <Text style={styles.label}>Automovil:</Text>
            <Text style={styles.value}>
              {orden.automovil.licensePlate
                ? orden.automovil.licensePlate
                : "Automovil no disponible"}
            </Text>
          </View>
          <View>
            <Text style={styles.label}>Fecha:</Text>
            <Text style={styles.value}>{orden.fechaCreacion}</Text>
          </View>
          <View>
            <Text style={styles.label}>Servicios:</Text>
            {orden.servicios.map((servicio, servIndex) => (
              <Text key={servIndex}>
                {servicio.name} - ${servicio.precioUnitario}
              </Text>
            ))}
          </View>
          <View>
            <Text style={styles.label}>Total:</Text>
            <Text style={styles.value}>
              $
              {orden.servicios.reduce(
                (costoTotal, servicio) => costoTotal + servicio.precioUnitario,
                0
              )}
            </Text>
          </View>
        </View>
      </Page>
    ))}
  </Document>
); */

export default FacturaPDF;
