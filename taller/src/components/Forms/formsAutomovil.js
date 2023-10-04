import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';


export function FormAutomovil() {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  return (
    <>
      <Form noValidate validated={validated} onSubmit={handleSubmit} className="Forms">
        <Row>
          <Col className="custom-col">
            <Form.Label className="custom-label">Modelo</Form.Label>
            <Form.Select className='mb-2 w-75' required> 
              <option value="">Seleccione un modelo</option>
            </Form.Select>
          </Col>
          <Col className="custom-col">
            <Form.Label className="custom-label">Patente</Form.Label>
            <Form.Control className='w-50'
              required
              type="text"
              placeholder="Introduzca patente del vehiculo"
              defaultValue=""
            />
          </Col>
        </Row>
          
        <Row>
          <Col className="custom-col">
            <Form.Label className="custom-label">Cliente</Form.Label>
            <Form.Select className='mb-2 w-75' required> 
              <option value="">Seleccione un modelo</option>
            </Form.Select>
          </Col>
        </Row>

        <Row className="div-buttons">
          <Col className="custom-col">
            <Button type="submit">Insertar Automovil</Button>
          </Col>

          <Col className="custom-col">
            <Button type="submit">Guardar Cambios</Button>
          </Col>
          
          <Col className="custom-col">
            <Button type="submit">Eliminar Automovil</Button>
          </Col>  

          <Col className="custom-col">
            <Button type="submit">Listar Automoviles</Button>
          </Col>
        </Row>
      </Form>
    </>
  );
}

export default FormAutomovil;