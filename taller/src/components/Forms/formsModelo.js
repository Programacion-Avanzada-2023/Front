import {useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Alert from 'react-bootstrap/Alert';

export function FormModelo() {
  const [showInsertAlert, setShowInsertAlert] = useState(false);
  const [showSaveAlert, setShowSaveAlert] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [nameValidated, setNameValidated] = useState(null);
  const [nameTouched, setNameTouched] = useState(false);
  const [ageValidated, setAgeValidated] = useState(null);
  const [ageTouched, setAgeTouched] = useState(false);
  const [marcaValidated, setMarcaValidated] = useState(null);
  const [marcaTouched, setMarcaTouched] = useState(false);
  // Define una lista de marcas válidas
  const marcasValidas = ["Honda", "Toyota", "Ford"];

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    const isNameValid = nameTouched ? form.checkValidity() : true;
    const isAgeValid = ageTouched ? form.checkValidity() : true;

    setNameValidated(isNameValid);
    setAgeValidated(isAgeValid);

    if (!isNameValid || !isAgeValid) {
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
  const isSubmitDisabled = !nameValidated || !ageValidated || !marcaValidated;

  return (
    <Form noValidate onSubmit={handleSubmit} className="Forms">
      <Row className="mb-3">
      <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Label className="custom-label">Nombre</Form.Label>
          <Form.Control
            required
            className="custom-input-name"
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
        <Form.Group as={Col} md="3" controlId="validationCustom02">
          <Form.Label className='custom-label'>Año</Form.Label>
          <Form.Control
            className="custom-input-anio"
            required
            type="text"
            placeholder="Introduzca año del modelo"
            defaultValue=""
            isInvalid={!ageValidated && ageTouched}
            onChange={(e) => {
              const inputValue = e.target.value;
              setAgeTouched(true);
              const isValid = /^\d{4}$/.test(inputValue) && inputValue >= 1886 && inputValue <= 2023;
              setAgeValidated(isValid);
            }}
          />
          <Form.Control.Feedback type="invalid">
            Por favor, ingrese un año valido.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mb-3">
      <Form.Group as={Col} md="4" controlId="validationCustom03">
        <Form.Label className="custom-label">Marca</Form.Label>
        <Form.Select
          required
          isInvalid={!marcaValidated && marcaTouched}
          onChange={(e) => {
            const selectedMarca = e.target.value;
            setMarcaTouched(true);
            const isValid = marcasValidas.includes(selectedMarca);
            setMarcaValidated(isValid);
          }}
        >
          <option value="">Seleccione una marca</option>
          {marcasValidas.map((marca) => (
            <option key={marca} value={marca}>
              {marca}
            </option>
          ))}
        </Form.Select>
        <Form.Control.Feedback type="invalid">
          Por favor, seleccione una marca válida.
        </Form.Control.Feedback>
      </Form.Group>
      </Row>
      <Row className="div-buttons">
        <Col className="custom-col">
          <Button type="submit" variant="primary" onClick={handleInsertClick} disabled={isSubmitDisabled}>
            Ingresar Modelo
          </Button>
          <br></br>
          <br></br>
          {/* Renderiza la alerta solo si showInsertAlert es true y el campo de nombre es válido */}
          {showInsertAlert && nameValidated && (
            <Alert variant="success" className="custom-alert">
              Modelo ingresado exitosamente
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
          {showSaveAlert && nameValidated && ageValidated && (
            <Alert variant="success" className="custom-alert">
              Modelo actualizado exitosamente
            </Alert>
          )}
        </Col>
        <Col className="custom-col">
          <Button type="submit" variant="primary" onClick={handleDeleteClick} disabled={isSubmitDisabled}>
            Eliminar Modelo
          </Button>
          <br></br>
          <br></br>
          {/* Renderiza la alerta solo si showDeleteAlert es true y el campo de origen es válido */}
          {showDeleteAlert && ageValidated && (
            <Alert variant="success" className="custom-alert">
              Modelo eliminado exitosamente
            </Alert>
          )}
        </Col>
        <Col type="submit" className="custom-col">
          <Button variant="primary">
            Listar Modelos
          </Button>
        </Col>
      </Row>
    </Form>
  );
}

export default FormModelo;