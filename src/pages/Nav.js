import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import React, { useEffect, useState } from "react"


function NavBar() {
  const token = localStorage.getItem('access_token');
  const [carts, setCarts] = useState([])
  const cart = JSON.parse(localStorage.getItem('cart'));

  useEffect(() => {
    if (cart) {
      setCarts(cart)
    }
  }, [])


  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
    <Container>
      <Navbar.Brand as={Link} to="/">React Practice</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/">Shop</Nav.Link>
          <Nav.Link as={Link} to="/blogs">Blog</Nav.Link>
        </Nav>
        <Nav>
        <Nav.Link as={Link} to="/cart"><i class="fa fa-cart-plus fa-lg" aria-hidden="true"></i> <sup> {carts.length}</sup> </Nav.Link>
        {token ? <>
        <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
        <Nav.Link as={Link} to="/logout">Log Out</Nav.Link>
        </> : <><Nav.Link as={Link} to="/login">Log In</Nav.Link></>}
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
);
}


export default NavBar;