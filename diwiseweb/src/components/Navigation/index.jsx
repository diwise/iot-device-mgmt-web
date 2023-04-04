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
            <Navbar.Brand href="/device-management">
              <DiwiseLogo />
            </Navbar.Brand>{" "}            
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

                  <NavDropdown title={<UserIcon />} id="basic-nav-dropdown">
                    <NavDropdown.Item href="/device-management">
                      Dashboard
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/device-management/devices/fel">
                      Fel
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/device-management/devices/varningar">
                      Varningar
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/device-management/devices/online">
                      Aktiva enheter
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/device-management/devices">
                      Alla enheter
                    </NavDropdown.Item>   
                    <NavDropdown.Item href="/device-management/map">
                      Karta
                    </NavDropdown.Item>   
                    <NavDropdown.Item href="/device-management/features">
                      Features
                    </NavDropdown.Item> 
                    <NavDropdown.Item href="/device-management/alarms">
                      Alarm
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
