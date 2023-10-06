import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Alert from 'react-bootstrap/Alert';

export function FormAutomovil() {
  const [showInsertAlert, setShowInsertAlert] = useState(false);
  const [showSaveAlert, setShowSaveAlert] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [patenteValidated, setPatenteValidated] = useState(null);
  const [patenteTouched, setPatenteTouched] = useState(false);
  const [modeloValidated, setModeloValidated] = useState(null);
  const [modeloTouched, setModeloTouched] = useState(false);
  const [clienteValidated, setClienteValidated] = useState(null);
  const [clienteTouched, setClienteTouched] = useState(false);
  // Define una lista de marcas válidas
  const modelosValidos = ["Mod1", "Mod2"];
  const clientesValidos = ["Mairone Nicolas","Pedraza Santiago"];

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

  const handleInsertClick = () => {
    setShowInsertAlert(true);
    setTimeout(() => {
      setShowInsertAlert(false);
    }, 3000);
  };

  const handleSaveClick = () => {
    setShowSaveAlert(true);
    setTimeout(() => {
      setShowSaveAlert(false);
    }, 3000);
  };

  const handleDeleteClick = () => {
    setShowDeleteAlert(true);
    setTimeout(() => {
      setShowDeleteAlert(false);
    }, 3000);
  };

  // Determinar si el botón de envío debe estar habilitado o deshabilitado
  const isSubmitDisabled = !patenteValidated || !modeloValidated || !clienteValidated;

  return (
    <>
      <Form noValidate onSubmit={handleSubmit} className="Forms">
        <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="validationCustom03">
          <Form.Label className="custom-label">Modelo</Form.Label>
          <Form.Select
            required
            isInvalid={!modeloValidated && modeloTouched}
            onChange={(e) => {
              const selectedModelo = e.target.value;
              setModeloTouched(true);
              const isValid = modelosValidos.includes(selectedModelo);
              setModeloValidated(isValid);
            }}
          >
            <option value="">Seleccione un modelo</option>
            {modelosValidos.map((modelo) => (
              <option key={modelo} value={modelo}>
                {modelo}
              </option>
            ))}
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            Por favor, seleccione un modelo válido.
          </Form.Control.Feedback>
        </Form.Group>
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
              const isValid = /^[A-Z]{3}\d{3}[A-Z]{2}$/i.test(inputValue);
              setPatenteValidated(isValid);
            }}
          />
          <Form.Control.Feedback type="invalid">
            Por favor, ingrese una patente valida.
          </Form.Control.Feedback>
        </Form.Group>
        </Row>
          
        <Row className="mb-3">
          <Form.Group as={Col} md="4" controlId="validationCustom03">
            <Form.Label className="custom-label">Cliente</Form.Label>
            <Form.Select
              required
              isInvalid={!clienteValidated && clienteTouched}
              onChange={(e) => {
                const selectedCliente = e.target.value;
                setClienteTouched(true);
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
            <Form.Control.Feedback type="invalid">
              Por favor, seleccione un cliente válido.
            </Form.Control.Feedback>
          </Form.Group>
        </Row>

        <Row className="div-buttons">
          <Col className="custom-col">
            <Button type="submit" variant="primary" onClick={handleInsertClick} disabled={isSubmitDisabled}>
              Ingresar Automovil
            </Button>
            <br></br>
            <br></br>
            {/* Renderiza la alerta solo si showInsertAlert es true y el campo de nombre es válido */}
            {showInsertAlert && patenteValidated && (
              <Alert variant="success" className="custom-alert">
                Patente ingresada exitosamente
              </Alert>
            )}
          </Col>
          <Col className="custom-col">
            <Button type="submit" variant="primary" onClick={handleSaveClick} disabled={isSubmitDisabled}>
              Guardar Cambios
            </Button>
            <br />
            <br />
            {/* Renderiza la alerta solo si showSaveAlert es true y ambos campos son válidos */}
            {showSaveAlert && patenteValidated && modeloValidated && clienteValidated && (
              <Alert variant="success" className="custom-alert">
                Automovil actualizado exitosamente
              </Alert>
            )}
          </Col>
          <Col className="custom-col">
            <Button type="submit" variant="primary" onClick={handleDeleteClick} disabled={isSubmitDisabled}>
              Eliminar Automovil
            </Button>
            <br></br>
            <br></br>
            {/* Renderiza la alerta solo si showDeleteAlert es true y el campo de origen es válido */}
            {showDeleteAlert && patenteValidated && (
              <Alert variant="success" className="custom-alert">
                Automovil eliminado exitosamente
              </Alert>
            )}
          </Col>
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