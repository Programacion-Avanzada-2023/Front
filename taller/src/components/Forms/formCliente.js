import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import Alert from "react-bootstrap/Alert";
import FiltroClientes from "../filtroCliente";
import { buscarClientes, crearCliente } from "../../api/Cliente.Controller";

// import clientes from "../../data/data";

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
  const [emailValidated, setEmailValidated] = useState(null);
  const [emailTouched, setEmailTouched] = useState(false);

  /** Estados para los valores de cada input. */
  const [name, setName] = useState("");
  const [surName, setSurName] = useState("");
  const [dni, setDni] = useState("");
  const [street, setStreet] = useState("");
  const [streetNumber, setStreetNumber] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    const isNameValid = nameTouched ? form.checkValidity() : true;
    const isSurNameValid = surNameTouched ? form.checkValidity() : true;
    const isDniValid = dniTouched ? form.checkValidity() : true;
    const isStreetValid = streetTouched ? form.checkValidity() : true;
    const isStreetNumberValid = streetNumberTouched
      ? form.checkValidity()
      : true;
    const isPhoneValid = phoneTouched ? form.checkValidity() : true;

    setNameValidated(isNameValid);
    setSurNameValidated(isSurNameValid);
    setDniValidated(isDniValid);
    setStreetValidated(isStreetValid);
    setStreetNumberValidated(isStreetNumberValid);
    setPhoneValidated(isPhoneValid);

    if (
      !isNameValid ||
      !isSurNameValid ||
      isDniValid ||
      isStreetValid ||
      isStreetNumberValid ||
      isPhoneValid
    ) {
      event.preventDefault();
      event.stopPropagation();
    }
  };
  //Funcion para mostrar alerta al presionar el boton "Insertar Marca"
  const handleInsertClick = () => {
    // Armar el objeto con su cuerpo de información.
    const cliente = {
      name,
      surName,
      dni,
      street,
      streetNumber,
      phoneNumber,
      email,
    };

    // Insertar el cliente.
    crearCliente(cliente).then((cliente) => {
      setShowInsertAlert(true);

      console.log(cliente);

      setClientes([...clientes, cliente]);
      setClientesFiltrados([...clientesFiltrados, cliente]);

      setTimeout(() => setShowInsertAlert(false), 1000);
    });

    /* setTimeout(() => {
      setShowInsertAlert(false);
    }, 1000); */
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
    // Filtrar clientes.
    filtrarClientes();
  };

  // Determinar si los botones que requieren estos datos se habilitan
  const isSubmitDisabled =
    !nameValidated ||
    !dniValidated ||
    !streetValidated ||
    !streetNumberValidated ||
    !phoneValidated;

  /** Estado con el listado de clientes original. */
  const [clientes, setClientes] = useState([]);

  /** Estado que guarda un array de clientes filtrados. */
  const [clientesFiltrados, setClientesFiltrados] = useState([]);

  /** Estado que persiste el filtro seleccionado. */
  const [filtro, setFiltro] = useState("");

  const handleFiltroChange = (event) => {
    setFiltro(event.target.value);
  };

  const filtrarClientes = () => {
    const clientesFiltrados = clientes.filter(({ person: cliente }) =>
      cliente.name.toLowerCase().includes(filtro.toLowerCase())
    );
    setClientesFiltrados(clientesFiltrados);
  };

  useEffect(() => {
    buscarClientes().then((clientes) => {
      setClientes(clientes);
      setClientesFiltrados(clientes);
    });
  }, []);

  return (
    <div>
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
                const isValid =
                  inputValue.length <= 50 && /^[A-Za-z\s]*$/.test(inputValue);
                setNameValidated(isValid);

                setName(inputValue);
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
                const isValid =
                  inputValue.length <= 50 && /^[A-Za-z\s]*$/.test(inputValue);
                setSurNameValidated(isValid);

                setSurName(inputValue);
              }}
            />

            {/*Feedback si es un nombre incorrecto*/}
            <Form.Control.Feedback type="invalid">
              Por favor, ingrese un apellido válido.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="3" controlId="validationCustom02">
            <Form.Label className="custom-label">DNI</Form.Label>
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

                setDni(inputValue);
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
                const isValid =
                  inputValue.length <= 50 && /^[A-Za-z\s\-]*$/.test(inputValue);
                setStreetValidated(isValid);

                setStreet(inputValue);
              }}
            />

            {/*Feedback si es un nombre incorrecto*/}
            <Form.Control.Feedback type="invalid">
              Por favor, ingrese una calle válida.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="3" controlId="validationCustom02">
            <Form.Label className="custom-label">
              Numero de domicilio
            </Form.Label>
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

                setStreetNumber(inputValue);
              }}
            />
            <Form.Control.Feedback type="invalid">
              Por favor, ingrese un Numero de domicilio valido.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="3" controlId="validationCustom02">
            <Form.Label className="custom-label">Telefono</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Introduzca Telefono del cliente"
              defaultValue=""
              isInvalid={!phoneValidated && phoneTouched}
              onChange={(e) => {
                const inputValue = e.target.value;
                setPhoneTouched(true);
                const isValid =
                  /^(?:\d{7,15}|\d{2,5}-\d{6,11}|\+\d{2,3}-?\d{1,15})$/.test(
                    inputValue
                  );
                setPhoneValidated(isValid);

                setPhoneNumber(inputValue);
              }}
            />
            <Form.Control.Feedback type="invalid">
              Por favor, ingrese un correo valido.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="3" controlId="validationCustom02">
            <Form.Label className="custom-label">E-Mail</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Introduzca un correo"
              defaultValue=""
              isInvalid={!emailValidated && emailTouched}
              onChange={(e) => {
                const inputValue = e.target.value;
                setEmailTouched(true);
                const isValid =
                  /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(
                    inputValue
                  );
                setEmailValidated(isValid);

                setEmail(inputValue);
              }}
            />
            <Form.Control.Feedback type="invalid">
              Por favor, ingrese un correo valido.
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row className="div-buttons">
          <Col className="custom-col">
            <Button
              type="submit"
              variant="primary"
              onClick={handleInsertClick}
              disabled={isSubmitDisabled}
            >
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
            {/* Renderiza la alerta solo si showSaveAlert es true*/}
            {showSaveAlert && (
              <Alert variant="success" className="custom-alert">
                Cliente actualizado exitosamente
              </Alert>
            )}
          </Col>

          {/*Boton de Eliminar Marca*/}
          <Col className="custom-col">
            <Button
              type="submit"
              variant="primary"
              onClick={handleDeleteClick}
              disabled={isSubmitDisabled}
            >
              Eliminar Cliente
            </Button>
            <br></br>
            <br></br>
            {/* Renderiza la alerta solo si showDeleteAlert es true */}
            {showDeleteAlert && (
              <Alert variant="success" className="custom-alert">
                Cliente eliminado exitosamente
              </Alert>
            )}
          </Col>

          {/*Boton de Listar Marca*/}
          <Col type="submit" className="custom-col">
            <Button variant="primary">Listar Clientes</Button>
          </Col>

          <Col>
            <Button
              type="submit"
              className="custom-col"
              onClick={handleFiltrarClick}
            >
              Filtrar por nombre
            </Button>
          </Col>
        </Row>
      </Form>
      <FiltroClientes
        clientesFiltrados={clientesFiltrados}
        filtro={filtro}
        handleFiltroChange={handleFiltroChange}
        filtrarClientes={filtrarClientes}
      />
    </div>
  );
}

export default FormCliente;
