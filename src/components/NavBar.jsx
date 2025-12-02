import { Navbar, Nav, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

function NavBar() {
  return (
    <Navbar bg="primary" variant="dark" expand="lg"> {/* bg = cor da barra, variant = deixa a cor mais forte, expand = responsivel para telas de smartphones*/}
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">

          <Nav className="me-auto">
            <LinkContainer to="/cadastro">
              <Nav.Link>Cadastro</Nav.Link>
            </LinkContainer>

            
          </Nav>

          <Nav>
            <LinkContainer to="/login">
              <Nav.Link>Login</Nav.Link>
            </LinkContainer>
          </Nav>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
