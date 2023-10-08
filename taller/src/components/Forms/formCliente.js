import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Alert from 'react-bootstrap/Alert';
import FiltroClientes from '../filtroCliente';

function FormCliente() {
    // Constantes para las alertas segun los botones que presione
    const [showInsertAlert, setShowInsertAlert] = useState(false);
    const [showSaveAlert, setShowSaveAlert] = useState(false);
    const [showDeleteAlert, setShowDeleteAlert] = useState(false);

    // Constantes para la validacion de nombre y origen
    const [nameValidated, setNameValidated] = useState(null);
    const [nameTouched, setNameTouched] = useState(false);
    const [surNameValidated, setSurNameValidated] = useState(null);
    const [surNameTouched, setSurNameTouched] = useState(false);
    const [dniValidated, setDniValidated] = useState(null);
    const [dniTouched, setDniTouched] = useState(false);
    const [streetValidated, setStreetValidated] = useState(null);
    const [streetTouched, setStreetTouched] = useState(false);
    const [streetNumberValidated, setStreetNumberValidated] = useState(null);
    const [streetNumberTouched, setStreetNumberTouched] = useState(false);
    const [phoneValidated, setPhoneValidated] = useState(null);
    const [phoneTouched, setPhoneTouched] = useState(false);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        const isNameValid = nameTouched ? form.checkValidity() : true;
        const isSurNameValid = surNameTouched ? form.checkValidity() : true;
        const isDniValid = dniTouched ? form.checkValidity() : true;
        const isStreetValid = streetTouched ? form.checkValidity() : true;
        const isStreetNumberValid = streetNumberTouched ? form.checkValidity() : true;
        const isPhoneValid = phoneTouched ? form.checkValidity() : true;

        setNameValidated(isNameValid);
        setSurNameValidated(isSurNameValid);
        setDniValidated(isDniValid);
        setStreetValidated(isStreetValid);
        setStreetNumberValidated(isStreetNumberValid);
        setPhoneValidated(isPhoneValid);

        if (!isNameValid || !isSurNameValid || isDniValid || isStreetValid || isStreetNumberValid || isPhoneValid) {
        event.preventDefault();
        event.stopPropagation();
        }
    };
    //Funcion para mostrar alerta al presionar el boton "Insertar Marca"
    const handleInsertClick = () => {
        setShowInsertAlert(true);
        setTimeout(() => {
        setShowInsertAlert(false);
        }, 1000);
    };

    //Funcion para mostrar alerta al presionar el boton "Guardar Cambios"
    const handleSaveClick = () => {
        setShowSaveAlert(true);
        setTimeout(() => {
        setShowSaveAlert(false);
        }, 1000);
    };

    //Funcion para mostrar alerta al presionar el boton "Eliminar Marca"
    const handleDeleteClick = () => {
        setShowDeleteAlert(true);
        setTimeout(() => {
        setShowDeleteAlert(false);
        }, 1000);
    };

    const handleFiltrarClick = () => {
        const resultadoFiltrado = FiltroClientes.filtrarClientes();
    };

    // Determinar si los botones que requieren estos datos se habilitan
    const isSubmitDisabled = !nameValidated || !dniValidated || !streetValidated || !streetNumberValidated || !phoneValidated;

  return (
    <Form noValidate onSubmit={handleSubmit} className="Forms">
      <Row className="mb-3">
        {/*Campo "Nombre"*/}
        <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Label className="custom-label">Nombre</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Introduzca nombre del cliente"
            defaultValue=""
            isInvalid={!nameValidated && nameTouched}
            // Funciona que valida el nombre con un determinado formato
            onChange={(e) => {
              const inputValue = e.target.value;
              setNameTouched(true);
              const isValid = inputValue.length <= 50 && /^[A-Za-z\s]*$/.test(inputValue);
              setNameValidated(isValid);
            }}
          />

          {/*Feedback si es un nombre incorrecto*/}
          <Form.Control.Feedback type="invalid">
            Por favor, ingrese un nombre válido.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Label className="custom-label">Apellido</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Introduzca apellido del cliente"
            defaultValue=""
            isInvalid={!surNameValidated && surNameTouched}
            // Funciona que valida el nombre con un determinado formato
            onChange={(e) => {
              const inputValue = e.target.value;
              setSurNameTouched(true);
              const isValid = inputValue.length <= 50 && /^[A-Za-z\s]*$/.test(inputValue);
              setSurNameValidated(isValid);
            }}
          />

          {/*Feedback si es un nombre incorrecto*/}
          <Form.Control.Feedback type="invalid">
            Por favor, ingrese un apellido válido.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="3" controlId="validationCustom02">
          <Form.Label className='custom-label'>DNI</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Introduzca DNI del cliente"
            defaultValue=""
            isInvalid={!dniValidated && dniTouched}
            onChange={(e) => {
              const inputValue = e.target.value;
              setDniTouched(true);
              // Solo deja ingresar desde 1886 a 2023
              const isValid = /^\d{7,8}$/.test(inputValue);
              setDniValidated(isValid);
            }}
          />

          {/*Feedback para cuando el año es invalido*/}
          <Form.Control.Feedback type="invalid">
            Por favor, ingrese un DNI valido.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mb-3">
      <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Label className="custom-label">Calle</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Introduzca calle del cliente"
            defaultValue=""
            isInvalid={!streetValidated && streetTouched}
            // Funciona que valida el nombre con un determinado formato
            onChange={(e) => {
              const inputValue = e.target.value;
              setStreetTouched(true);
              const isValid = inputValue.length <= 50 && /^[A-Za-z\s\-]*$/.test(inputValue);
              setStreetValidated(isValid);
            }}
          />

          {/*Feedback si es un nombre incorrecto*/}
          <Form.Control.Feedback type="invalid">
            Por favor, ingrese una calle válida.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="3" controlId="validationCustom02">
          <Form.Label className='custom-label'>Numero de domicilio</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Introduzca Numero del domicilio del cliente"
            defaultValue=""
            isInvalid={!streetNumberValidated && streetNumberTouched}
            onChange={(e) => {
              const inputValue = e.target.value;
              setStreetNumberTouched(true);
              const isValid = /^\d{1,4}$/.test(inputValue);
              setStreetNumberValidated(isValid);
            }}
          />
          <Form.Control.Feedback type="invalid">
            Por favor, ingrese un Numero de domicilio valido.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="3" controlId="validationCustom02">
          <Form.Label className='custom-label'>Telefono</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Introduzca Telefono del cliente"
            defaultValue=""
            isInvalid={!phoneValidated && phoneTouched}
            onChange={(e) => {
              const inputValue = e.target.value;
              setPhoneTouched(true);
              const isValid = /^(?:\d{7,15}|\d{2,5}-\d{6,11}|\+\d{2,3}-?\d{1,15})$/.test(inputValue);
              setPhoneValidated(isValid);
            }}
          />
          <Form.Control.Feedback type="invalid">
            Por favor, ingrese un Telefono valido.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="div-buttons">
        <Col className="custom-col">
          <Button type="submit" variant="primary" onClick={handleInsertClick} disabled={isSubmitDisabled}>
            Ingresar Cliente
          </Button>
          <br></br>
          <br></br>
          {showInsertAlert && (
            <Alert variant="success" className="custom-alert">
              Cliente ingresado exitosamente
            </Alert>
          )}
        </Col>

        {/*Boton de Guardar cambios*/}
        <Col className="custom-col">
          <Button type="submit" variant="primary" onClick={handleSaveClick} disabled={isSubmitDisabled}>
            Guardar Cambios
          </Button>
          <br />
          <br />
          {/* Renderiza la alerta solo si showSaveAlert es true*/}
          {showSaveAlert &&  (
            <Alert variant="success" className="custom-alert">
              Cliente actualizado exitosamente
            </Alert>
          )}
        </Col>

        {/*Boton de Eliminar Marca*/}
        <Col className="custom-col">
          <Button type="submit" variant="primary" onClick={handleDeleteClick} disabled={isSubmitDisabled}>
            Eliminar Cliente
          </Button>
          <br></br>
          <br></br>
          {/* Renderiza la alerta solo si showDeleteAlert es true */}
          {showDeleteAlert &&(
            <Alert variant="success" className="custom-alert">
              Cliente eliminado exitosamente
            </Alert>
          )}
        </Col>

        {/*Boton de Listar Marca*/}
        <Col type="submit" className="custom-col">
          <Button variant="primary">
            Listar Clientes
          </Button>
        </Col>

        <Col>
            <Button type="submit" className="custom-col" onClick={handleFiltrarClick}>
                Filtrar por nombre
            </Button>
        </Col>
      </Row>
    </Form>
  );
}

export default FormCliente;