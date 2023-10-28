import React, { useState, useRef } from "react";
import { Form, Table, Button, Modal, Col } from "react-bootstrap";
import { editarCliente, eliminarCliente } from "../api/Cliente.Controller";

export function TablaClientes({
  removerCliente,
  clientesFiltrados,
  filtro,
  handleFiltroChange,
  filtrarClientes,
  setClientesFiltrados,
  setClientes,
}) {
  const handleDeleteClick = (id) => {
    eliminarCliente(id).then(() => {
      removerCliente(id);
      setClientesFiltrados(
        clientesFiltrados.filter((cliente) => cliente.id !== id)
      );
    });
    handleCloseDeleteModal();
  };

  const handleEditClick = (personaId) => {
    const valido = validateInputFields();
    setValidated(valido);

    if (!valido) return;

    editarCliente(cliente).then((cliente) => {
      setClientes((clientes) => {
        const clientePrev = clientes.find((c) => c.person.id === personaId);

        if (clientePrev) {
          setClientesFiltrados(clientes);
          return [
            ...clientes.filter((c) => c.person.id !== personaId),
            (clientePrev.person = cliente),
          ];
        }
      });
    });

    handleCloseEditModal();
  };

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const [cliente, setCliente] = useState(null);

  const handleCloseDeleteModal = () => setShowDeleteModal(false);
  const handleCloseEditModal = () => setShowEditModal(false);
  const handleShowDeleteModal = () => setShowDeleteModal(true);
  const handleShowEditModal = () => setShowEditModal(true);

  /** Referencias a campos de edicion del modal. */
  const nameRef = useRef();
  const surnameRef = useRef();
  const streetRef = useRef();
  const streetNumberRef = useRef();
  const phoneNumberRef = useRef();
  const emailRef = useRef();

  /** Helpers para validacion de campos. */
  const [validated, setValidated] = useState(false);

  const validateInputFields = () => {
    function isValidForm() {
      // Nombre no puede estar vacio, menor a 32 caracteres.
      if (!nameRef.current.value?.length || nameRef.current.value.length > 32)
        return false;

      // Apellido no puede estar vacio, menor a 32 caracteres.
      if (
        !surnameRef.current.value?.length ||
        surnameRef.current.value.length > 32
      )
        return false;

      // Calle no puede tener mas de 32 caracteres.
      if (
        streetRef.current.value?.length ||
        streetRef.current.value.length > 32
      )
        return false;

      // Numero de calle no puede ser negativo ni mayor a 9999.
      if (
        streetNumberRef.current.value < 0 ||
        streetNumberRef.current.value > 9999
      )
        return false;

      // Telefono debe ser de origen argentino.
      if (
        !phoneNumberRef.current.value?.length &&
        phoneNumberRef.current.value.length > 32 &&
        /^(?:\d{7,15}|\d{2,5}-\d{6,11}|\+\d{2,3}-?\d{1,15})$/.test(
          phoneNumberRef.current.value
        )
      )
        return false;

      // Correo debe ser valido.
      if (
        !emailRef.current.value?.length &&
        /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(
          emailRef.current.value
        )
      )
        return false;

      return true;
    }

    const isValid = isValidForm();
    setValidated(isValid);

    return isValid;
  };

  return (
    <div>
      <Modal
        show={showDeleteModal}
        onHide={handleCloseDeleteModal}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Está por borrar un cliente.</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Esta acción es permanente, ¿está seguro de querer borrar a{" "}
          {cliente?.name}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeleteModal}>
            No
          </Button>
          <Button
            variant="danger"
            onClick={() => handleDeleteClick(cliente?.id)}
          >
            Si
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showEditModal}
        onHide={handleCloseEditModal}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Editando {cliente?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate validated={validated} onChange={validateInputFields}>
            <div>
              <Form.Label htmlFor="name">Nombre</Form.Label>
              <Form.Control
                type="text"
                id="name"
                ref={nameRef}
                defaultValue={cliente?.name}
                onChange={validateInputFields}
              />
              <Form.Control.Feedback type="invalid">
                El nombre no puede estar vacio y debe ser menor a 32 caracteres.
              </Form.Control.Feedback>
            </div>
            <div>
              <Form.Label htmlFor="surname">Apellido</Form.Label>
              <Form.Control
                type="text"
                id="surname"
                ref={surnameRef}
                defaultValue={cliente?.surName}
                onChange={validateInputFields}
              />
              <Form.Control.Feedback type="invalid">
                El apellido no puede estar vacio y debe ser menor a 32
                caracteres.
              </Form.Control.Feedback>
            </div>
            <div>
              <Form.Label htmlFor="street">Calle</Form.Label>
              <Form.Control
                type="text"
                id="street"
                ref={streetRef}
                defaultValue={cliente?.street}
                onChange={validateInputFields}
              />
              <Form.Control.Feedback type="invalid">
                La calle debe tener menos de 32 caracteres.
              </Form.Control.Feedback>
            </div>
            <div>
              <Form.Label htmlFor="streetNumber">Nro. Calle</Form.Label>
              <Form.Control
                type="number"
                id="streetNumber"
                ref={streetNumberRef}
                defaultValue={cliente?.streetNumber}
                onChange={validateInputFields}
              />
              <Form.Control.Feedback type="invalid">
                El numero de calle no puede ser negativo ni mayor a 9999.
              </Form.Control.Feedback>
            </div>
            <div>
              <Form.Label htmlFor="phoneNumber">Teléfono</Form.Label>
              <Form.Control
                type="text"
                id="phoneNumber"
                ref={phoneNumberRef}
                defaultValue={cliente?.phoneNumber}
                onChange={validateInputFields}
              />
              <Form.Control.Feedback type="invalid">
                El numero de telefono debe ser de origen argentino.
              </Form.Control.Feedback>
            </div>
            <div>
              <Form.Label htmlFor="email">E-Mail</Form.Label>
              <Form.Control
                type="text"
                id="email"
                ref={emailRef}
                defaultValue={cliente?.email}
                onChange={validateInputFields}
              />
              <Form.Control.Feedback type="invalid">
                El correo no es valido.
              </Form.Control.Feedback>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleCloseEditModal}>
            Cancelar
          </Button>
          <Button
            variant="success"
            onClick={() => handleEditClick(cliente?.personaId)}
            disabled={!validated}
          >
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>

      <input
        type="text"
        placeholder="Filtrar por nombre"
        value={filtro}
        onChange={handleFiltroChange}
      />

      <button onClick={filtrarClientes}>Filtrar</button>

      <Table responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Nombre</th>
            <th>DNI</th>
            <th>Teléfono</th>
            <th>Dirección</th>
            <th>Correo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clientesFiltrados.map(({ person: cliente, id }) => {
            // Calcular campos para unisión.
            const fullName = `${cliente.surName}, ${cliente.name}`,
              fullAddress =
                cliente?.street && cliente?.streetNumber
                  ? `${cliente?.street} ${cliente?.streetNumber}`
                  : null;

            return (
              <tr key={cliente.dni}>
                <td>{id}</td>
                <td>{fullName}</td>
                <td>{cliente.dni}</td>
                <td>{cliente?.phoneNumber ?? "No posee"}</td>
                <td>{fullAddress ?? "No posee"}</td>
                <td>{cliente?.email ?? "No posee"}</td>
                <td>
                  {/*Boton de Eliminar Marca*/}
                  <Col className="custom-col">
                    <Button
                      type="submit"
                      variant="primary"
                      onClick={() => {
                        setCliente({ ...cliente, id, idPersona: cliente?.id });
                        handleShowDeleteModal();
                      }}
                    >
                      Eliminar
                    </Button>
                  </Col>
                  <Col className="custom-col">
                    <Button
                      type="submit"
                      variant="primary"
                      onClick={() => {
                        setCliente({ ...cliente, id, idPersona: cliente?.id });
                        handleShowEditModal();
                      }}
                    >
                      Editar
                    </Button>
                  </Col>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>

      {/* <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
          </tr>
        </thead>
        <tbody>
          {clientesFiltrados.map((cliente) => (
            <tr key={cliente.id}>
              <td>{cliente.id}</td>
              <td>{cliente.nombre}</td>
            </tr>
          ))}
        </tbody>
      </table> */}
    </div>
  );
}

export default TablaClientes;
