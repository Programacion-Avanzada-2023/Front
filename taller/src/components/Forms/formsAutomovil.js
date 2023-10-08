import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Alert from 'react-bootstrap/Alert';

export function FormAutomovil() {
  // Constantes para las alertas segun los botones que presione
  const [showInsertAlert, setShowInsertAlert] = useState(false);
  const [showSaveAlert, setShowSaveAlert] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);

  // Constantes para la validacion de patente, modelo y cliente
  const [patenteValidated, setPatenteValidated] = useState(null);
  const [patenteTouched, setPatenteTouched] = useState(false);
  const [modeloValidated, setModeloValidated] = useState(null);
  const [modeloTouched, setModeloTouched] = useState(false);
  const [clienteValidated, setClienteValidated] = useState(null);
  const [clienteTouched, setClienteTouched] = useState(false);

  // Define una lista de marcas y clientes "A MODO DE EJEMPLO"
  const modelosValidos = ["Mod1", "Mod2"];
  const clientesValidos = ["Mairone Nicolas","Pedraza Santiago"];

  // Constante que contiene la url de la api Automovil
  const apiUrl = 'http://localhost:8080/api/automovil';

  // Funcion que cuando presiona un boton valida si la patente, el cliente y modelo son correctos.
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    const isPatenteValid = patenteTouched ? form.checkValidity() : true;
    const isModeloValid = modeloTouched ? form.checkValidity() : true;
    const isClienteValid = clienteTouched ? form.checkValidity() : true;

    setPatenteValidated(isPatenteValid);
    setModeloValidated(isModeloValid);
    setClienteValidated(isClienteValid);

    if (!isPatenteValid || !isModeloValid || !isClienteValid) {
      event.preventDefault();
      event.stopPropagation();
    }
  };

  //Funcion para mostrar alerta al presionar el boton "Insertar Automovil"
  const handleInsertClick = () => {
    setShowInsertAlert(true);
    setTimeout(() => {
      setShowInsertAlert(false);
    }, 3000);
  };

  //Funcion para mostrar alerta al presionar el boton "Guardar Automovil"
  const handleSaveClick = () => {
    setShowSaveAlert(true);
    setTimeout(() => {
      setShowSaveAlert(false);
    }, 3000);
  };

  //Funcion para mostrar alerta al presionar el boton "Eliminar Automovil"
  const handleDeleteClick = () => {
    setShowDeleteAlert(true);
    setTimeout(() => {
      setShowDeleteAlert(false);
    }, 3000);
  };

  //EJEMPLO COMO PARA IR AVANZANDO (CREO QUE ES ASI xd)
  //Funcion para listar automoviles guardados en la base de datos al presionar el boton "Listar Automoviles"
  const handleListClick = () => {
    fetch(apiUrl + '/listar')
      .then(response => {
        if (!response.ok) {
          throw new Error('No se pudieron listar las marcas.');
        }
        return response.json();
      })
      .then(data => {
        console.log('Marcas listadas:', data);
      })
      .catch(error => {
        console.error('Error al listar las marcas:', error);
      });
  };

  // Determinar si el botón de envío debe estar habilitado o deshabilitado
  const isSubmitDisabled = !patenteValidated || !modeloValidated || !clienteValidated;

  return (
    <>
      <Form noValidate onSubmit={handleSubmit} className="Forms">
        <Row className="mb-3">
          {/*Select "Modelo"*/}
        <Form.Group as={Col} md="4" controlId="validationCustom03">
          <Form.Label className="custom-label">Modelo</Form.Label>
          <Form.Select
            required
            isInvalid={!modeloValidated && modeloTouched}
            onChange={(e) => {
              const selectedModelo = e.target.value;
              setModeloTouched(true);
              //Misma logica que en el form de modelo. Solo para probar su funcionamiento
              const isValid = modelosValidos.includes(selectedModelo);
              setModeloValidated(isValid);
            }}
          >
            {/*Se muestran todos los modelos guardados para seleccionar*/}
            <option value="">Seleccione un modelo</option>
            {modelosValidos.map((modelo) => (
              <option key={modelo} value={modelo}>
                {modelo}
              </option>
            ))}
          </Form.Select>

          {/*Feedback para cuando no selecciona un modelo correcto*/}
          <Form.Control.Feedback type="invalid">
            Por favor, seleccione un modelo válido.
          </Form.Control.Feedback>
        </Form.Group>

        {/*Campo "Patente"*/}
        <Form.Group as={Col} md="3" controlId="validationCustom02">
          <Form.Label className='custom-label'>Patente</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Introduzca patente del automovil"
            defaultValue=""
            isInvalid={!patenteValidated && patenteTouched}
            onChange={(e) => {
              const inputValue = e.target.value;
              setPatenteTouched(true);
              //Logica para validar patente ingresada
              const isValid = /^[A-Z]{3}\d{3}[A-Z]{2}$|^[A-Z]{3}\d{3}$/i.test(inputValue);
              setPatenteValidated(isValid);
            }}
          />

          {/*Feedback para cuando la patente es incorrecta*/}
          <Form.Control.Feedback type="invalid">
            Por favor, ingrese una patente valida.
          </Form.Control.Feedback>
        </Form.Group>
        </Row>
          
        <Row className="mb-3">
          {/*Campo "Cliente"*/}
          <Form.Group as={Col} md="4" controlId="validationCustom03">
            <Form.Label className="custom-label">Cliente</Form.Label>
            <Form.Select
              required
              isInvalid={!clienteValidated && clienteTouched}
              onChange={(e) => {
                const selectedCliente = e.target.value;
                setClienteTouched(true);
                //misma logica que modelo
                const isValid = clientesValidos.includes(selectedCliente);
                setClienteValidated(isValid);
              }}
            >
              <option value="">Seleccione un cliente</option>
              {clientesValidos.map((cliente) => (
                <option key={cliente} value={cliente}>
                  {cliente}
                </option>
              ))}
            </Form.Select>

            {/*Feedback para un cliente incorrecto*/}
            <Form.Control.Feedback type="invalid">
              Por favor, seleccione un cliente válido.
            </Form.Control.Feedback>
          </Form.Group>
        </Row>

        {/*Fila de botones*/}
        <Row className="div-buttons">
          <Col className="custom-col">

            {/*Boton Ingresar Automovil*/}
            <Button type="submit" variant="primary" onClick={handleInsertClick} disabled={isSubmitDisabled}>
              Ingresar Automovil
            </Button>
            <br></br>
            <br></br>

            {/* Renderiza la alerta solo si showInsertAlert es true*/}
            {showInsertAlert &&(
              <Alert variant="success" className="custom-alert">
                Patente ingresada exitosamente
              </Alert>
            )}
          </Col>
          
          {/*Boton de guardar cambios*/}
          <Col className="custom-col">
            <Button type="submit" variant="primary" onClick={handleSaveClick} disabled={isSubmitDisabled}>
              Guardar Cambios
            </Button>
            <br />
            <br />
            {/* Renderiza la alerta solo si showSaveAlert es true*/}
            {showSaveAlert &&(
              <Alert variant="success" className="custom-alert">
                Automovil actualizado exitosamente
              </Alert>
            )}
          </Col>

          {/*Boton eliminar automovil*/}
          <Col className="custom-col">
            <Button type="submit" variant="primary" onClick={handleDeleteClick} disabled={isSubmitDisabled}>
              Eliminar Automovil
            </Button>
            <br></br>
            <br></br>
            {/* Renderiza la alerta solo si showDeleteAlert es true*/}
            {showDeleteAlert && (
              <Alert variant="success" className="custom-alert">
                Automovil eliminado exitosamente
              </Alert>
            )}
          </Col>

          {/*Boton de listar automoviles*/}
          <Col type="submit" className="custom-col">
            <Button variant="primary">
              Listar Automoviles
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
}

export default FormAutomovil;