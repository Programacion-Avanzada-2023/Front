import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Alert from 'react-bootstrap/Alert';

export function FormServicio() {
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
          <Form.Label className="custom-label">Name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Introduzca nombre del servicio"
            defaultValue=""
          />
          <Form.Control.Feedback></Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label className="custom-label">Descripcion</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Introduzca una descripcion del servicio"
            defaultValue=""
          />
          <Form.Control.Feedback></Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="div-buttons">
        <Col className="custom-col">
          <Button variant="primary" onClick={handleInsertClick}>
            Ingresar Marca
          </Button>
          <br></br>
          <br></br>
          {/* Renderiza la alerta solo si showInsertAlert es true */}
          {showInsertAlert && (
            <Alert variant="success" className="custom-alert">
              Marca ingresada exitosamente
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
              servicio actualizado exitosamente
            </Alert>
          )}
        </Col>
        <Col className="custom-col">
          <Button variant="primary" onClick={handleDeleteClick}>
            Eliminar servicio
          </Button>
          <br></br>
          <br></br>
          {/* Renderiza la alerta solo si showDeleteAlert es true */}
          {showDeleteAlert && (
            <Alert variant="success" className="custom-alert">
              servicio eliminada exitosamente
            </Alert>
          )}
        </Col>
        <Col className="custom-col">
          <Button variant="primary">
            Listar servicio
          </Button>
        </Col>
      </Row>
    </Form>
  );
}

export default FormServicio;