import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import Alert from "react-bootstrap/Alert";
import { useMarcaContext } from "../../context/MarcaContextProvider";
import { useModeloContext } from "../../context/ModeloContextProvider";

export function FormModelo() {
  // Constantes para las alertas segun los botones que presione
  const [showInsertAlert, setShowInsertAlert] = useState(false);
  const [showSaveAlert, setShowSaveAlert] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);

  // Constantes para la validacion de nombre, año y marca
  const [nameValidated, setNameValidated] = useState(null);
  const [nameTouched, setNameTouched] = useState(false);
  const [ageValidated, setAgeValidated] = useState(null);
  const [ageTouched, setAgeTouched] = useState(false);
  const [marcaValidated, setMarcaValidated] = useState(null);
  const [marcaTouched, setMarcaTouched] = useState(false);

  // Define una lista de marcas válidas "SOLO PRUEBA"
  const marcasValidas = ["Honda", "Toyota", "Ford"];

  // Constante que contiene la url de la api Marcas
  const apiUrl = "http://localhost:8080/api/modelo";

  // Funcion que cuando presiona un boton valida si el nombre y año son correctos.
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

  //Funcion para mostrar alerta al presionar el boton "Insertar Modelo"
  const handleInsertClick = () => {
    setShowInsertAlert(true);
    setTimeout(() => {
      setShowInsertAlert(false);
    }, 3000);
  };

  //Funcion para mostrar alerta al presionar el boton "Guardar Modelo"
  const handleSaveClick = () => {
    setShowSaveAlert(true);
    setTimeout(() => {
      setShowSaveAlert(false);
    }, 3000);
  };

  //Funcion para mostrar alerta al presionar el boton "Eliminar modelo"
  const handleDeleteClick = () => {
    setShowDeleteAlert(true);
    setTimeout(() => {
      setShowDeleteAlert(false);
    }, 3000);
  };

  //EJEMPLO COMO PARA IR AVANZANDO (CREO QUE ES ASI xd)
  //Funcion para listar modelos guardados en la base de datos al presionar el boton "Listar Modelos"
  const handleListClick = () => {
    fetch(apiUrl + "/listar")
      .then((response) => {
        if (!response.ok) {
          throw new Error("No se pudieron listar las marcas.");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Marcas listadas:", data);
      })
      .catch((error) => {
        console.error("Error al listar las marcas:", error);
      });
  };

  // Determinar si los botones deben estar habilitado o deshabilitado
  const isSubmitDisabled = !nameValidated || !ageValidated || !marcaValidated;

  const { marcas } = useMarcaContext();

  const { modelos } = useModeloContext();

  return (
    <Form noValidate onSubmit={handleSubmit} className="Forms">
      <Row className="mb-3">
        {/*Campo "Nombre"*/}
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
              const isValid =
                inputValue.length >= 3 &&
                inputValue.length <= 50 &&
                /^[A-Za-z\s\-]*$/.test(inputValue);
              setNameValidated(isValid);
            }}
          />

          {/*Feedback para cuando es invalido el nombre*/}
          <Form.Control.Feedback type="invalid">
            Por favor, ingrese un nombre válido.
          </Form.Control.Feedback>
        </Form.Group>

        {/*Campo "Año"*/}
        <Form.Group as={Col} md="3" controlId="validationCustom02">
          <Form.Label className="custom-label">Año</Form.Label>
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
              // Solo deja ingresar desde 1886 a 2023
              const isValid =
                /^\d{4}$/.test(inputValue) &&
                inputValue >= 1886 &&
                inputValue <= new Date().getFullYear();
              setAgeValidated(isValid);
            }}
          />

          {/*Feedback para cuando el año es invalido*/}
          <Form.Control.Feedback type="invalid">
            Por favor, ingrese un año valido.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        {/*Select "Marcas"*/}
        <Form.Group as={Col} md="4" controlId="validationCustom03">
          <Form.Label className="custom-label">Marca</Form.Label>
          <Form.Select
            required
            type="text"
            placeholder="Introduzca una marca"
            defaultValue=""
            isInvalid={!marcaValidated && marcaTouched}
            onChange={(e) => {
              const selectedMarca = e.target.value;
              setMarcaTouched(true);
              //Solo toma como validas las marcas en la constante "COMO EJEMPLO"
              const isValid = marcas?.length
                ? marcas.map((marca) => marca.name).includes(selectedMarca)
                : false; // marcasValidas.includes(selectedMarca);
              // ["Mitsubishi", "Nissan"]
              setMarcaValidated(isValid);
            }}
          >
            {/*Se muestran las marcas en la constante "marcasValidas" para seleccionar*/}
            <option value="">Seleccione una marca</option>
            {
              /* marcasValidas.map((marca) => (
              <option key={marca} value={marca}>
                {marca}
              </option>
            )) */
              marcas?.length
                ? marcas.map((marca) => {
                    return (
                      <option key={marca.id} value={marca.id}>
                        {marca.name}
                      </option>
                    );
                  })
                : null
            }
          </Form.Select>

          {/*Feedback para cuando no selecciona nada */}
          <Form.Control.Feedback type="invalid">
            Por favor, seleccione una marca válida.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>

      {/*Fila de botones*/}
      <Row className="div-buttons">
        <Col className="custom-col">
          {/*Boton de ingresar Modelo*/}
          <Button
            type="submit"
            variant="primary"
            onClick={handleInsertClick}
            disabled={isSubmitDisabled}
          >
            Ingresar Modelo
          </Button>
          <br></br>
          <br></br>
          {/* Renderiza la alerta solo si showInsertAlert es true */}
          {showInsertAlert && (
            <Alert variant="success" className="custom-alert">
              Modelo ingresado exitosamente
            </Alert>
          )}
        </Col>

        {/*Boton de Guardar cambios*/}
        <Col className="custom-col">
          <Button
            type="submit"
            variant="primary"
            onClick={handleSaveClick}
            disabled={isSubmitDisabled}
          >
            Guardar Cambios
          </Button>
          <br />
          <br />
          {/* Renderiza la alerta solo si showSaveAlert es true */}
          {showSaveAlert && (
            <Alert variant="success" className="custom-alert">
              Modelo actualizado exitosamente
            </Alert>
          )}
        </Col>

        {/*Boton de Eliminar Modelo*/}
        <Col className="custom-col">
          <Button
            type="submit"
            variant="primary"
            onClick={handleDeleteClick}
            disabled={isSubmitDisabled}
          >
            Eliminar Modelo
          </Button>
          <br></br>
          <br></br>
          {/* Renderiza la alerta solo si showDeleteAlert es true*/}
          {showDeleteAlert && (
            <Alert variant="success" className="custom-alert">
              Modelo eliminado exitosamente
            </Alert>
          )}
        </Col>

        {/*Boton de Listar Modelos*/}
        <Col type="submit" className="custom-col" onClick={handleListClick}>
          <Button variant="primary">Listar Modelos</Button>
        </Col>
      </Row>
    </Form>
  );
}

export default FormModelo;
