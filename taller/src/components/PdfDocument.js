import React from "react";

import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

// Creacion de estilos para pdf
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
    paddingBottom: 10,
    marginBottom: 10,
  },
  headerLeft: {
    flexDirection: "row",
    flexGrow: 1,
  },
  headerRight: {
    flexDirection: "column",
    alignItems: "flex-end",
    flexGrow: 1,
  },
  headerText: {
    fontSize: 12,
    color: "#333333",
  },
  title: {
    fontSize: 18,
    marginBottom: 5,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 12,
    color: "#666666",
  },
  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
    alignItems: "center",
    height: 24,
  },
  tableHeader: {
    width: "25%",
    textAlign: "center",
    fontWeight: "bold",
  },
  tableCell: {
    width: "25%",
    textAlign: "center",
    fontSize: 10,
  },
  tableTotal: {
    width: "25%",
    textAlign: "center",
    fontSize: 10,
    fontWeight: "bold",
  },
});

// Creacion del componente que sera exportado
const MyDocument = ({ ordenes }) => (
  <Document width={500} height={700} wrap>
    {ordenes.map((orden, index) => {
      const impuestoMarca = orden.automovil.model.brand.impuestoMarca;
      
      const serviciosDetallados = orden.servicios.map((servicio) => {
        const precioConImpuesto =
          servicio.precioUnitario * (1 + impuestoMarca / 100);
        return {
          nombre: servicio.name,
          precioUnitario: servicio.precioUnitario,
          impuestoMarca: impuestoMarca,
          subtotal: precioConImpuesto,
        };
      });

      const total = serviciosDetallados.reduce(
        (acc, servicio) => acc + servicio.subtotal,
        0
      );

      // Obtener el cliente de la orden.
      const cliente = orden.automovil.client.person;

      return (
        <Page style={styles.page} key={index}>
          <View>
            {/* Encabezado */}
            <View style={styles.header}>
              {/* Texto e imagen */}
              <View style={styles.headerLeft}>
                <Image src="/icono.ico" style={{ width: "100pt" }} />
                <View style={styles.headerText}>
                  <Text style={styles.title}>Los Santos Customs</Text>
                  <Text style={styles.subtitle}>
                    Calidad que impulsa tu confianza
                  </Text>
                </View>
              </View>
              {/* Datos del lado derecho */}
              <View style={styles.headerRight}>
                <Text style={styles.headerText}>#{orden.id}</Text>
                <Text style={styles.headerText}>
                  {new Date().toLocaleString()}
                </Text>
                <Text style={styles.headerText}>
                  Automovil: {orden.automovil.model.name}{" "}
                  {orden.automovil.model.brand.name} -{" "}
                  {orden.automovil.licensePlate}
                </Text>
              </View>
            </View>

            {/* Tabla */}
            <View style={styles.table}>
              {/* Encabezados */}
              <View style={styles.tableRow}>
                <Text style={styles.tableHeader}>Servicio</Text>
                <Text style={styles.tableHeader}>Precio Unitario</Text>
                <Text style={styles.tableHeader}>Impuesto</Text>
                <Text style={styles.tableHeader}>Subtotal</Text>
              </View>

              {/* Datos de la tabla */}
              {serviciosDetallados.map((servicio, servIndex) => (
                <View style={styles.tableRow} key={servIndex}>
                  <Text style={styles.tableCell}>{servicio.nombre}</Text>
                  <Text style={styles.tableCell}>
                    AR$ {servicio.precioUnitario}
                  </Text>
                  <Text style={styles.tableCell}>
                    {servicio.impuestoMarca}%
                  </Text>
                  <Text style={styles.tableCell}>${servicio.subtotal}</Text>
                </View>
              ))}

              {/* Total */}
              <View style={styles.tableRow}>
                <Text style={styles.tableCell}></Text>
                <Text style={styles.tableCell}></Text>
                <Text style={styles.tableCell}></Text>
                <Text style={styles.tableTotal}>TOTAL: ${total}</Text>
              </View>
            </View>
            <View>
              <Text style={styles.title}>Cliente</Text>
            </View>
            <View style={styles.table}>
              <View style={styles.tableRow}>
                <Text style={styles.tableCell}>Nombre Completo</Text>
                <Text style={styles.tableCell}>D.N.I.</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.tableCell}>
                  {cliente.name} {cliente.surName}
                </Text>
                <Text style={styles.tableCell}>{cliente.dni}</Text>
              </View>
            </View>
          </View>
        </Page>
      );
    })}
  </Document>
);

export default MyDocument;
