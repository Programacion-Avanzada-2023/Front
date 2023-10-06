import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Alert from 'react-bootstrap/Alert';

export function FormMarca() {
  const [showInsertAlert, setShowInsertAlert] = useState(false);
  const [showSaveAlert, setShowSaveAlert] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [nameValidated, setNameValidated] = useState(null);
  const [nameTouched, setNameTouched] = useState(false);
  const [originValidated, setOriginValidated] = useState(null);
  const [originTouched, setOriginTouched] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    const isNameValid = nameTouched ? form.checkValidity() : true;
    const isOriginValid = originTouched ? form.checkValidity() : true;

    setNameValidated(isNameValid);
    setOriginValidated(isOriginValid);

    if (!isNameValid || !isOriginValid) {
      event.preventDefault();
      event.stopPropagation();
    }
  };

  const handleInsertClick = () => {
    setShowInsertAlert(true);
    setTimeout(() => {
      setShowInsertAlert(false);
    }, 1000);
  };

  const handleSaveClick = () => {
    setShowSaveAlert(true);
    setTimeout(() => {
      setShowSaveAlert(false);
    }, 1000);
  };

  const handleDeleteClick = () => {
    setShowDeleteAlert(true);
    setTimeout(() => {
      setShowDeleteAlert(false);
    }, 1000);
  };

  // Determinar si el botón de envío debe estar habilitado o deshabilitado
  const isSubmitDisabled = !nameValidated || !originValidated;

  return (
    <Form noValidate onSubmit={handleSubmit} className="Forms">
      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Label className="custom-label">Nombre</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Introduzca nombre de la marca"
            defaultValue=""
            isInvalid={!nameValidated && nameTouched}
            onChange={(e) => {
              const inputValue = e.target.value;
              setNameTouched(true);
              const isValid = inputValue.length >= 3 && inputValue.length <= 50 && /^[A-Za-z]+$/.test(inputValue);
              setNameValidated(isValid);
            }}
          />
          <Form.Control.Feedback type="invalid">
            Por favor, ingrese un nombre válido.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label className="custom-label">Origen</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Introduzca país de origen de la marca"
            defaultValue=""
            isInvalid={!originValidated && originTouched}
            onChange={(e) => {
              const inputValue = e.target.value;
              setOriginTouched(true);
              const isValid = inputValue.length >= 3 && inputValue.length <= 50 && /^[A-Za-z]+$/.test(inputValue);
              setOriginValidated(isValid);
            }}
          />
          <Form.Control.Feedback type="invalid">
            Por favor, ingrese un país de origen válido.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="div-buttons">
        <Col className="custom-col">
          <Button type="submit" variant="primary" onClick={handleInsertClick} disabled={isSubmitDisabled}>
            Ingresar Marca
          </Button>
          <br></br>
          <br></br>
          {/* Renderiza la alerta solo si showInsertAlert es true y el campo de nombre es válido */}
          {showInsertAlert && nameValidated && (
            <Alert variant="success" className="custom-alert">
              Marca ingresada exitosamente
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
          {showSaveAlert && nameValidated && originValidated && (
            <Alert variant="success" className="custom-alert">
              Marca actualizada exitosamente
            </Alert>
          )}
        </Col>
        <Col className="custom-col">
          <Button type="submit" variant="primary" onClick={handleDeleteClick} disabled={isSubmitDisabled}>
            Eliminar Marca
          </Button>
          <br></br>
          <br></br>
          {/* Renderiza la alerta solo si showDeleteAlert es true y el campo de origen es válido */}
          {showDeleteAlert && originValidated && (
            <Alert variant="success" className="custom-alert">
              Marca eliminada exitosamente
            </Alert>
          )}
        </Col>
        <Col type="submit" className="custom-col">
          <Button variant="primary">
            Listar Marcas
          </Button>
        </Col>
      </Row>
    </Form>
  );
}

export default FormMarca;