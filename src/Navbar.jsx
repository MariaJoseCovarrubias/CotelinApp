import React from 'react';
import {
    Nav, Navbar, Container
  } from 'react-bootstrap';

function BasicExample() {
  return (
    <Navbar style={{backgroundColor: "#ffb6c1"}}>
      <Container>
        <Navbar.Brand href="#home">CotelinApp</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav"  />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Delivery</Nav.Link>
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BasicExample;