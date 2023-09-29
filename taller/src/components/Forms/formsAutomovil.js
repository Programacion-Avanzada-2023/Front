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
  /**
  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Label>First name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="First name"
            defaultValue="Mark"
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label>Last name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Last name"
            defaultValue="Otto"
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
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
      </Row>
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
      <Form.Group className="mb-3">
        <Form.Check
          required
          label="Agree to terms and conditions"
          feedback="You must agree before submitting."
          feedbackType="invalid"
        />
      </Form.Group>
      <Button type="submit">Submit form</Button>
    </Form>
  );
  */

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