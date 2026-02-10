import { Navbar, Nav, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useAuth } from "../context/AuthContext";

function NavBar() {
  const { token, userRoles, logout } = useAuth();

  const isProfessor = userRoles?.includes("ROLE_PROFESSOR");
  const isAluno = userRoles?.includes("ROLE_ALUNO");

  return (
    <Navbar bg="primary" variant="dark" expand="lg">
      <Container>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">

          {/* LINKS À ESQUERDA */}
          <Nav className="me-auto">

            {/* VISÍVEL PARA TODOS */}
            {!token && (
              <LinkContainer to="/cadastro">
                <Nav.Link>Cadastro</Nav.Link>
              </LinkContainer>
            )}

            {/* PROFESSOR */}
            {token && isProfessor && (
              <>
                <LinkContainer to="/perfil-professor">
                  <Nav.Link>Perfil do Professor</Nav.Link>
                </LinkContainer>

                <LinkContainer to="/materias">
                  <Nav.Link>Matérias</Nav.Link>
                </LinkContainer>

                <LinkContainer to="/professor/aulas/nova">
                  <Nav.Link>Criar Aula</Nav.Link>
                </LinkContainer>
              </>
            )}

            {/* ALUNO */}
            {token && isAluno && (
              <>
                <LinkContainer to="/perfil-aluno">
                  <Nav.Link>Perfil do Aluno</Nav.Link>
                </LinkContainer>

                <LinkContainer to="/aulas">
                  <Nav.Link>Aulas</Nav.Link>
                </LinkContainer>
              </>
            )}

          </Nav>

          {/* LINKS À DIREITA */}
          <Nav>

            {!token ? (
              <LinkContainer to="/login">
                <Nav.Link>Login</Nav.Link>
              </LinkContainer>
            ) : (
              <Nav.Link onClick={logout} style={{ cursor: "pointer" }}>
                Logout
              </Nav.Link>
            )}

          </Nav>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
