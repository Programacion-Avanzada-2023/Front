import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';

export function FormModelo() {
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
    <Form noValidate validated={validated} onSubmit={handleSubmit} className="Forms">
      <Row className="mb-2">
        <Form.Group className="custom-col" as={Col} md="4" controlId="validationCustom01">
          <Form.Label className='custom-label'>Nombre</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Introduzca nombre del modelo"
            defaultValue=""
          />
          <Form.Control.Feedback></Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="custom-col" as={Col} md="4" controlId="validationCustom02">
          <Form.Label className='custom-label'>Año</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Introduzca año del modelo"
            defaultValue=""
          />
          <Form.Control.Feedback></Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="6" controlId="validationCustom03">
            <Form.Label className="custom-label">Marca</Form.Label>
            <Form.Select className='mb-2 w-75' required> 
              <option value="">Seleccione una marca</option>
            </Form.Select>
        </Form.Group>
      </Row>
      <Row className="div-buttons">
        <Col className="custom-col">
          <Button type="submit">Insertar Modelo</Button>
        </Col>

        <Col className="custom-col">
          <Button type="submit">Guardar Cambios</Button>
        </Col>
          
        <Col className="custom-col">
          <Button type="submit">Eliminar Modelo</Button>
        </Col>  

        <Col className="custom-col">
          <Button type="submit">Listar Modelos</Button>
        </Col>
      </Row>
    </Form>
  );
}

export default FormModelo;