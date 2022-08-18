import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import NavDropdown from "react-bootstrap/NavDropdown";
import "./navigation.css";
import UserIcon from "./userIcon";
import SearchIcon from "./searchIcon";
import AddIcon from "./addIcon";
import DiwiseLogo from "../DiwiseLogo";
import UserService from "../../services/UserService";

function MainNav() {
  return (
    <>
      {["sm"].map((expand) => (
        <Navbar
          key={expand}
          bg="diwise"
          variant="diwise"
          expand={expand}
          className="mb-3"
        >
          <Container fluid>
            <Navbar.Brand href="/">
              <DiwiseLogo />
            </Navbar.Brand>{" "}
            Prototyp
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title
                  id={`offcanvasNavbarLabel-expand-${expand}`}
                ></Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Nav.Link href="/search">
                    <SearchIcon />
                  </Nav.Link>
                  <Nav.Link href="/">
                    <AddIcon />
                  </Nav.Link>
                  <NavDropdown title={<UserIcon />} id="basic-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1">
                      Action
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">
                      Another action
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">
                      Something
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/logout" onClick={UserService.doLogout}>
                      Logga ut
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
}
export default MainNav;
