import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Alert from 'react-bootstrap/Alert';
import TablaMarcas from "../TablaMarcas";
import { crearMarca } from "../../api/Marca.Controller";
import { useMarcaContext } from "../../context/MarcaContextProvider" 


export function FormMarca() {
  // Constantes para las alertas segun los botones que presione
  const [showInsertAlert, setShowInsertAlert] = useState(false);
  const [showSaveAlert, setShowSaveAlert] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);

  // Constantes para la validacion de nombre y origen
  const [nameValidated, setNameValidated] = useState(null);
  const [nameTouched, setNameTouched] = useState(false);
  const [originValidated, setOriginValidated] = useState(null);
  const [originTouched, setOriginTouched] = useState(false);

  // Constante que contiene la url de la api Marcas
  const apiUrl = 'http://localhost:8080/api/marca';

  // Funcion que cuando presiona un boton valida si el nombre y origen son correctos.
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    const isNameValid = nameTouched ? form.checkValidity() : true;
    const isOriginValid = originTouched ? form.checkValidity() : true;

    setNameValidated(isNameValid);
    setOriginValidated(isOriginValid);

    if (!isNameValid || !isOriginValid) {
      event.preventDefault();
      event.stopPropagation();
    }
  };

  //Funcion para mostrar alerta al presionar el boton "Insertar Marca"
  const handleInsertClick = () => {
     const marca = {
      name,
    };

    crearMarca(marca).then((marca) => {
      setShowInsertAlert(true);

      setMarcas([...marcas, marca]);
      setMarcasFiltradas([...marcasFiltradas, marca]);

      setTimeout(() => setShowInsertAlert(false), 1000);
    });

  };

  const [name, setName] = useState("");

  const { marcas, setMarcas, removerMarca } = useMarcaContext(); 

  const { marcasFiltradas, setMarcasFiltradas } = useState([]);

  useEffect(() => {
    if (marcas?.length) setMarcasFiltradas(marcas);
  }, [marcas]);


  const handleFiltroChange = (event) => {
    setFiltro(event.target.value);
  };

  const filtrarMarcas = () => {
    const marcasFiltradas = marcas.filter(({ marca }) =>
      marca.nombre.toLowerCase().includes(filtro.toLowerCase())
    );
    setMarcasFiltradas(marcasFiltradas);
  };

  const handleFiltrarClick = () => {
    // Filtrar clientes.
    filtrarMarcas();
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

  const [filtro, setFiltro] = useState("");

  //EJEMPLO COMO PARA IR AVANZANDO (CREO QUE ES ASI xd)
  //Funcion para listar marcas guardadas en la base de datos al presionar el boton "Listar Marcas"
  const handleListClick = () => {
    fetch(apiUrl + '/listar')
      .then(response => {
        if (!response.ok) {
          throw new Error('No se pudieron listar las marcas.');
        }
        return response.json();
      })
      .then(data => {
        console.log('Marcas listadas:', data);
      })
      .catch(error => {
        console.error('Error al listar las marcas:', error);
      });
  };

  // Determinar si los botones que requieren estos datos se habilitan
  const isSubmitDisabled = !nameValidated || !originValidated;

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
              placeholder="Introduzca nombre de la marca"
              defaultValue=""
              isInvalid={!nameValidated && nameTouched}
              // Funciona que valida el nombre con un determinado formato
              onChange={(e) => {
                const inputValue = e.target.value;
                setNameTouched(true);
                const isValid = inputValue.length >= 3 && inputValue.length <= 50 && /^[A-Za-z\s\-]*$/.test(inputValue);
                setNameValidated(isValid);

                setName(inputValue);
              }}
            />

            {/*Feedback si es un nombre incorrecto*/}
            <Form.Control.Feedback type="invalid">
              Por favor, ingrese un nombre válido.
            </Form.Control.Feedback>
          </Form.Group>

          {/*Campo origen*/}
          <Form.Group as={Col} md="4" controlId="validationCustom02">
            <Form.Label className="custom-label">Origen</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Introduzca país de origen de la marca"
              defaultValue=""
              isInvalid={!originValidated && originTouched}
              // Funcion que valida el origen con un determinado formato
              onChange={(e) => {
                const inputValue = e.target.value;
                setOriginTouched(true);
                const isValid = inputValue.length >= 3 && inputValue.length <= 50 && /^[A-Za-z]+$/.test(inputValue);
                setOriginValidated(isValid);
              }}
            />

            {/*Feedback si es un origen incorrecto*/}
            <Form.Control.Feedback type="invalid">
              Por favor, ingrese un país de origen válido.
            </Form.Control.Feedback>
          </Form.Group>
        </Row>

        {/*Fila de botones*/}
        <Row className="div-buttons">
          <Col className="custom-col">
            {/*Boton de ingresar Marca*/}
            <Button type="submit" variant="primary" onClick={handleInsertClick} disabled={isSubmitDisabled}>
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
                Marca actualizada exitosamente
              </Alert>
            )}
          </Col>

          {/*Boton de Eliminar Marca*/}
          <Col className="custom-col">
            <Button type="submit" variant="primary" onClick={handleDeleteClick} disabled={isSubmitDisabled}>
              Eliminar Marca
            </Button>
            <br></br>
            <br></br>
            {/* Renderiza la alerta solo si showDeleteAlert es true */}
            {showDeleteAlert &&(
              <Alert variant="success" className="custom-alert">
                Marca eliminada exitosamente
              </Alert>
            )}
          </Col>

          {/*Boton de Listar Marca*/}
          <Col type="submit" className="custom-col" onClick={handleListClick}>
            <Button variant="primary">
              Listar Marcas
            </Button>
          </Col>
        </Row>
      </Form>

      <TablaMarcas
      removerMarca={removerMarca}
      marcasFiltradas={marcasFiltradas}
      filtro={filtro}
      handleFiltroChange={handleFiltroChange}
      filtrarMarcas={filtrarMarcas}
      setMarcasFiltradas={setMarcasFiltradas}
      setMarcas={setMarcas}
      />
    </div>
  );
}

export default FormMarca;