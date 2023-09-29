import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';

export function FormMarca() {
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
      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Label className="custom-label">Nombre</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Introduzca nombre de la marca"
            defaultValue=""
          />
          <Form.Control.Feedback></Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label className="custom-label">Origen</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Introduzca pais de origen de la marca"
            defaultValue=""
          />
          <Form.Control.Feedback></Form.Control.Feedback>
        </Form.Group>
        {/* 
        <Form.Group as={Col} md="4" controlId="validationCustomUsername">
          <Form.Label>Username</Form.Label>
          <InputGroup hasValidation>
            <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Username"
              aria-describedby="inputGroupPrepend"
              required
            />
            <Form.Control.Feedback type="invalid">
              Please choose a username.
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
        */}
      </Row>
      {/* 
      <Row className="mb-3">
        <Form.Group as={Col} md="6" controlId="validationCustom03">
          <Form.Label>City</Form.Label>
          <Form.Control type="text" placeholder="City" required />
          <Form.Control.Feedback type="invalid">
            Please provide a valid city.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="3" controlId="validationCustom04">
          <Form.Label>State</Form.Label>
          <Form.Control type="text" placeholder="State" required />
          <Form.Control.Feedback type="invalid">
            Please provide a valid state.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="3" controlId="validationCustom05">
          <Form.Label>Zip</Form.Label>
          <Form.Control type="text" placeholder="Zip" required />
          <Form.Control.Feedback type="invalid">
            Please provide a valid zip.
          </Form.Control.Feedback>
        </Form.Group>
        
      </Row>
      */}
      <Form.Group className="mb-3">
        <Form.Check
          required
          label={<span style={{ color: 'black' }}>Aceptar terminos y condiciones</span>}
          feedback="Debes estar de acuerdo antes de registrar una marca"
          feedbackType="invalid"
        />
      </Form.Group>
      <Row className="div-buttons">
        <Col className="custom-col">
          <Button type="submit">Insertar Marca</Button>
        </Col>

        <Col className="custom-col">
          <Button type="submit">Guardar Cambios</Button>
        </Col>
        
        <Col className="custom-col">
          <Button type="submit">Eliminar Marca</Button>
        </Col>  

        <Col className="custom-col">
          <Button type="submit">Listar Marcas</Button>
        </Col>
      </Row>
    </Form>
  );
}

export default FormMarca;