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
        <Navbar.Brand href="/home">
          <img
            src={logoImage} 
            alt="Logo"
            width="100"
            height="40"
          /> 
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">           
            <NavDropdown title="Opciones" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/marca">Marca</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/modelo">Modelo</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/automovil">Automovil</NavDropdown.Item>
              <NavDropdown.Divider />
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
