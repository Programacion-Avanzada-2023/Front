import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Alert from 'react-bootstrap/Alert';
import { useAutomovilContext } from '../../context/AutomovilContextProvider';
import { useServicioContext } from '../../context/ServicioContextProvider';

export function FormOrdenDeTrabajo() {
  const [showInsertAlert, setShowInsertAlert] = useState(false);
  const [showSaveAlert, setShowSaveAlert] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);

  const [automovilValidated, setAutomovilValidated] = useState(null);
  const [automovilTouched, setAutomovilTouched] = useState(false);
  const [detalleValidated, setDetalleValidated] = useState(null);
  const [detalleTouched, setDetalleTouched] = useState(false);
  const [servicioValidated, setServicioValidated] = useState(null);
  const [servicioTouched, setServicioTouched] = useState(false);
  const [fechaCreacionValidated, setFechaCreacionValidated] = useState(null);
  const [fechaCreacionTouched, setFechaCreacionTouched] = useState(false);
  const [fechaModificacionValidated, setFechaModificacionValidated] = useState(null);
  const [fechaModificacionTouched, setFechaModificacionTouched] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    const isAutomovilValid = automovilTouched ? form.checkValidity() : true;
    const isDetalleValid = detalleTouched ? form.checkValidity() : true;
    const isServicioValid = servicioTouched ? form.checkValidity() : true;
    const isFechaCreacionValid = fechaCreacionTouched ? form.checkValidity() : true;
    const isFechaModificacionValid = fechaModificacionTouched ? form.checkValidity() : true;

    setAutomovilValidated(isAutomovilValid);
    setDetalleValidated(isDetalleValid);
    setServicioValidated(isServicioValid);
    setFechaCreacionValidated(isFechaCreacionValid);
    setFechaModificacionValidated(isFechaModificacionValid);

    if (!isAutomovilValid || !isDetalleValid || !isServicioValid || !isFechaCreacionValid || !isFechaModificacionValid) {
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

  const { automoviles } = useAutomovilContext();

  const { servicios } = useServicioContext();

  return (
    <div>
      
    <Form className="Forms">

      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="validationCustom03">
          <Form.Label className="custom-label">Automovil</Form.Label>
          <Form.Select
            required
            type="text"
            placeholder="Introduzca el automovil"
            defaultValue=""
            isInvalid={!automovilValidated && automovilTouched}
            onChange={(e) => {
              const selectedAutomovil = e.target.value;
              setAutomovilTouched(true);
              //Solo toma como validas las marcas en la constante "COMO EJEMPLO"
              const isValid = automoviles?.length
                ? automoviles.map((automovil) => automovil.name).includes(selectedAutomovil)
                : false; // marcasValidas.includes(selectedMarca);
              // ["Mitsubishi", "Nissan"]
              setAutomovilValidated(isValid);
            }}
          >
            {/*Se muestran las marcas en la constante "marcasValidas" para seleccionar*/}
            <option value="">Seleccione un automovil</option>
            {
              /* marcasValidas.map((marca) => (
              <option key={marca} value={marca}>
                {marca}
              </option>
            )) */
              automoviles?.length
                ? automoviles.map((automovil) => {
                    return (
                      <option key={automovil.id} value={automovil.id}>
                        {automovil.name}
                      </option>
                    );
                  })
                : null
            }
          </Form.Select>

          {/*Feedback para cuando no selecciona nada */}
          <Form.Control.Feedback type="invalid">
            Por favor, seleccione una automovil válido.
          </Form.Control.Feedback>
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
        <Form.Group as={Col} md="4" controlId="validationCustom03">
          <Form.Label className="custom-label">Servicio</Form.Label>
          <Form.Select
            required
            type="text"
            placeholder="Introduzca una descripcion del servicio"
            defaultValue=""
            isInvalid={!servicioValidated && servicioTouched}
            onChange={(e) => {
              const selectedServicio = e.target.value;
              setServicioTouched(true);
              //Solo toma como validas las marcas en la constante "COMO EJEMPLO"
              const isValid = servicios?.length
                ? servicios.map((servicios) => servicios.name).includes(selectedServicio)
                : false; // marcasValidas.includes(selectedMarca);
              // ["Mitsubishi", "Nissan"]
              setServicioValidated(isValid);
            }}
          >
            {/*Se muestran las marcas en la constante "marcasValidas" para seleccionar*/}
            <option value="">Seleccione un Servicio</option>
            {
              /* marcasValidas.map((marca) => (
              <option key={marca} value={marca}>
                {marca}
              </option>
            )) */
              servicios?.length
                ? servicios.map((servicio) => {
                    return (
                      <option key={servicio.id} value={servicio.id}>
                        {servicio.name}
                      </option>
                    );
                  })
                : null
            }
          </Form.Select>

          {/*Feedback para cuando no selecciona nada */}
          <Form.Control.Feedback type="invalid">
            Por favor, seleccione una automovil válido.
          </Form.Control.Feedback>
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
            Listar orden de servicio
          </Button>
        </Col>
      </Row>
    </Form>
  </div>
  );
}

export default FormOrdenDeTrabajo;