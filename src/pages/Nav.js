import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function NavBar() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
    <Container>
      <Navbar.Brand as={Link} to="/">Supper Pharmacy</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/">Shop</Nav.Link>
          <Nav.Link as={Link} to="/blogs">Blog</Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link href="#deets">About Us</Nav.Link>
          <Nav.Link eventKey={2} href="#memes">
            Contact Us
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
);
}

export default NavBar;