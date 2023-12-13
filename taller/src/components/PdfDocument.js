  import React from 'react';
  import { Page, Text, View, Document, StyleSheet} from '@react-pdf/renderer';

  // Creacion de estilos para pdf
  const styles = StyleSheet.create({
    page: {
      flexDirection: 'row',
      backgroundColor: '#ffffff',
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
      textAlign: 'center',
      fontSize: 12,
    }
  });

  // Creacion del componente que sera exportado
  const MyDocument = ({ ordenes }) => (
    <Document width={500} height={700} wrap>
      {ordenes.map((orden, index) => (
        <Page style={styles.page} key={index}>
          <View style={styles.section}>
            <View>
              <Text style={styles.title}>Factura de: {orden.id}</Text>
            </View>
            <View>
              <Text style={styles.label}>Automovil:</Text>
              <Text style={styles.value}>
                {orden.automovil.licensePlate ? orden.automovil.licensePlate : 'Automovil no disponible'}
              </Text>
            </View>
            <View>
              <Text style={styles.label}>Fecha:</Text>
              <Text style={styles.value}>{orden.fechaCreacion}</Text>
            </View>
            <View>
              <Text style={styles.label}>Servicios:</Text>
              {orden.servicios.map((servicio, servIndex) => (
                <Text key={servIndex}>{servicio.name} - ${servicio.precioUnitario}</Text>
              ))}
            </View>
            <View>
              <Text style={styles.label}>Total:</Text>
              <Text style={styles.value}>
                ${orden.servicios.reduce((costoTotal, servicio) => costoTotal + servicio.precioUnitario, 0)}
              </Text>
            </View>
          </View>
        </Page>
      ))}
    </Document>
  );

  export default MyDocument;