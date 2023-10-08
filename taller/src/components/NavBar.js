import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom'; // Importa Link desde react-router-dom
import { Image } from "react-bootstrap";
import logoImage from "../../src/imagen/logo.png";


export function NavBar() {
  return (
    <Navbar bg="dark" data-bs-theme="dark" expand="lg" className="bg-body-tertiary">
      <Container>
        {/*Imagen en el NavBar*/}
        <Navbar.Brand href="/home" style={{ marginLeft: '-100px' }}>
          <img
            src={logoImage} 
            alt="Logo"
            width="120"
            height="50"
          /> 
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">           
            <NavDropdown title="Opciones" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/marca">CRUD Marca</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/modelo">CRUD Modelo</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/automovil">CRUD Automovil</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/cliente">CRUD Cliente</NavDropdown.Item>
              <NavDropdown.Divider />
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
