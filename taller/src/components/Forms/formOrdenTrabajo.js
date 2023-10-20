import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Alert from 'react-bootstrap/Alert';

export function FormOrdenDeTrabajo() {
  const [showInsertAlert, setShowInsertAlert] = useState(false);
  const [showSaveAlert, setShowSaveAlert] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);

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

  return (
    <Form className="Forms">

      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Label className="custom-label">Automovil</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Introduzca el automovil"
            defaultValue=""
          />
          <Form.Control.Feedback></Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label className="custom-label">Detalles</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Introduzca una descripcion de la orden trabajo"
            defaultValue=""
          />
          <Form.Control.Feedback></Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label className="custom-label">Servicio</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Introduzca una descripcion del servicio"
            defaultValue=""
          />
          <Form.Control.Feedback></Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label className="custom-label">fecha de creacion</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Introduzca la fecha de creacion de la orden"
            defaultValue=""
          />
          <Form.Control.Feedback></Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label className="custom-label">fecha de modificacion</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Introduzca la fecha de modificacion de la orden"
            defaultValue=""
          />
          <Form.Control.Feedback></Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="div-buttons">
        <Col className="custom-col">
          <Button variant="primary" onClick={handleInsertClick}>
            Ingresar orden de trabajo
          </Button>
          <br></br>
          <br></br>
          {/* Renderiza la alerta solo si showInsertAlert es true */}
          {showInsertAlert && (
            <Alert variant="success" className="custom-alert">
              orden de trabajo ingresada exitosamente
            </Alert>
          )}
        </Col>
        <Col className="custom-col">
          <Button variant="primary" onClick={handleSaveClick}>
            Guardar Cambios
          </Button>
          <br></br>
          <br></br>
          {/* Renderiza la alerta solo si showSaveAlert es true */}
          {showSaveAlert && (
            <Alert variant="success" className="custom-alert">
              orden de trabajo actualizada exitosamente
            </Alert>
          )}
        </Col>
        <Col className="custom-col">
          <Button variant="primary" onClick={handleDeleteClick}>
            Eliminar orden de trabajo
          </Button>
          <br></br>
          <br></br>
          {/* Renderiza la alerta solo si showDeleteAlert es true */}
          {showDeleteAlert && (
            <Alert variant="success" className="custom-alert">
              orden de trabajo eliminada exitosamente
            </Alert>
          )}
        </Col>
        <Col className="custom-col">
          <Button variant="primary">
            Listar orden de trabajo
          </Button>
        </Col>
      </Row>
    </Form>
  );
}

export default FormOrdenDeTrabajo;