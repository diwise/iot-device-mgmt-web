import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import "./navigation.css";
import ThemeButton from "../ThemeButton";

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
              <svg
                width="120"
                height="58"
                viewBox="0 0 144 58"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_135_4249)">
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M86.68 36C86.3996 36.0099 86.1202 35.9607 85.8601 35.8557C85.5999 35.7506 85.3648 35.5919 85.17 35.39C84.9731 35.1998 84.8174 34.9711 84.7125 34.7183C84.6075 34.4654 84.5556 34.1937 84.56 33.92C84.5586 33.6437 84.6118 33.3699 84.7165 33.1142C84.8212 32.8585 84.9753 32.626 85.17 32.43C85.363 32.2245 85.5974 32.0621 85.8576 31.9535C86.1178 31.845 86.3981 31.7926 86.68 31.8C86.9552 31.7982 87.2278 31.8533 87.4807 31.9617C87.7336 32.0701 87.9615 32.2295 88.15 32.43C88.3465 32.6247 88.5018 32.8569 88.6066 33.1129C88.7114 33.3689 88.7635 33.6434 88.76 33.92C88.76 34.4716 88.5408 35.0007 88.1508 35.3908C87.7607 35.7809 87.2316 36 86.68 36V36ZM19 31.8V56.68H15.87V53.59C15.1525 54.7286 14.1463 55.6569 12.9536 56.2805C11.761 56.904 10.4244 57.2006 9.07998 57.14C7.87678 57.158 6.68326 56.9225 5.57713 56.4487C4.471 55.9749 3.47705 55.2734 2.65998 54.39C0.952629 52.5789 0.00170898 50.184 0.00170898 47.695C0.00170898 45.206 0.952629 42.8111 2.65998 41C3.4791 40.1199 4.47367 39.4213 5.57949 38.9494C6.6853 38.4774 7.87779 38.2426 9.07998 38.26C10.4244 38.1994 11.761 38.496 12.9536 39.1195C14.1463 39.7431 15.1525 40.6714 15.87 41.81V31.81L19 31.8ZM9.47998 54.13C10.3196 54.1455 11.1536 53.9894 11.9308 53.6713C12.708 53.3532 13.4121 52.8797 14 52.28C15.174 51.0441 15.8286 49.4046 15.8286 47.7C15.8286 45.9954 15.174 44.3559 14 43.12C13.4075 42.5153 12.6969 42.039 11.9124 41.7207C11.1279 41.4024 10.2863 41.249 9.43998 41.27C8.61357 41.2642 7.79447 41.4251 7.03161 41.7429C6.26876 42.0608 5.57779 42.5291 4.99998 43.12C3.82598 44.3559 3.1714 45.9954 3.1714 47.7C3.1714 49.4046 3.82598 51.0441 4.99998 52.28C5.58827 52.8819 6.29386 53.3567 7.07307 53.6749C7.85227 53.9931 8.6885 54.148 9.52998 54.13H9.47998ZM33.92 36C33.6396 36.0099 33.3602 35.9607 33.1001 35.8557C32.8399 35.7506 32.6048 35.5919 32.41 35.39C32.2131 35.1998 32.0574 34.9711 31.9525 34.7183C31.8475 34.4654 31.7956 34.1937 31.8 33.92C31.7986 33.6437 31.8518 33.3699 31.9565 33.1142C32.0612 32.8585 32.2153 32.626 32.41 32.43C32.603 32.2245 32.8374 32.0621 33.0976 31.9535C33.3578 31.845 33.6381 31.7926 33.92 31.8C34.1952 31.7982 34.4678 31.8533 34.7207 31.9617C34.9736 32.0701 35.2015 32.2295 35.39 32.43C35.5865 32.6247 35.7418 32.8569 35.8466 33.1129C35.9514 33.3689 36.0035 33.6434 36 33.92C36.0043 34.1937 35.9524 34.4654 35.8475 34.7183C35.7426 34.9711 35.5868 35.1998 35.39 35.39C35.1997 35.5869 34.9711 35.7426 34.7183 35.8475C34.4654 35.9524 34.1937 36.0043 33.92 36ZM32.34 56.68V38.68H35.46V56.68H32.34ZM70 38.72H72.94L67.71 56.72H64.5L60.22 43.21L56 56.68H52.62L47.34 38.68H50.61L54.61 52.33L58.84 38.68H61.92L66.1 52.37L70 38.72ZM85.11 56.72V38.72H88.23V56.72H85.11ZM104.31 43.56C104.317 43.9036 104.42 44.2384 104.607 44.5264C104.794 44.8145 105.059 45.0444 105.37 45.19C106.168 45.6209 107.014 45.9565 107.89 46.19L110.83 47.06C111.809 47.3434 112.683 47.9106 113.34 48.69C114.037 49.5567 114.393 50.6488 114.34 51.76C114.363 52.5147 114.204 53.2639 113.877 53.9444C113.55 54.6248 113.064 55.2167 112.46 55.67C111.063 56.6932 109.36 57.2115 107.63 57.14C106.059 57.1876 104.507 56.7925 103.15 56C101.958 55.2961 101.025 54.2265 100.49 52.95L103.19 51.41C103.476 52.2445 104.046 52.9522 104.8 53.41C105.652 53.935 106.639 54.1992 107.64 54.17C108.527 54.2032 109.407 53.9996 110.19 53.58C110.512 53.3949 110.776 53.1238 110.953 52.797C111.129 52.4703 111.212 52.1008 111.19 51.73C111.192 51.3869 111.099 51.0499 110.923 50.7555C110.747 50.4611 110.493 50.2206 110.19 50.06C109.39 49.5975 108.532 49.2412 107.64 49L104.7 48.11C103.727 47.8278 102.854 47.2767 102.18 46.52C101.487 45.7017 101.13 44.6512 101.18 43.58C101.171 42.848 101.331 42.1237 101.646 41.4631C101.962 40.8026 102.425 40.2233 103 39.77C104.286 38.7359 105.901 38.1998 107.55 38.26C108.912 38.2433 110.255 38.5884 111.44 39.26C112.549 39.8963 113.44 40.8509 114 42L111.38 43.47C111.069 42.7276 110.529 42.1045 109.837 41.6922C109.146 41.28 108.341 41.1005 107.54 41.18C106.74 41.1545 105.95 41.3667 105.27 41.79C104.978 41.9749 104.738 42.2324 104.575 42.5373C104.412 42.8423 104.331 43.1843 104.34 43.53L104.31 43.56ZM128.86 49.18C129.099 50.6577 129.889 51.9902 131.07 52.91C132.31 53.8236 133.821 54.2922 135.36 54.24C136.378 54.3131 137.397 54.1079 138.308 53.6464C139.219 53.1849 139.987 52.4844 140.53 51.62L143.19 53.12C142.353 54.438 141.18 55.509 139.791 56.2227C138.403 56.9363 136.849 57.2668 135.29 57.18C134.011 57.2311 132.735 57.0207 131.54 56.5616C130.345 56.1025 129.256 55.4044 128.34 54.51C127.456 53.6233 126.763 52.5655 126.302 51.4014C125.841 50.2373 125.623 48.9914 125.66 47.74C125.623 46.4992 125.835 45.2636 126.283 44.1061C126.732 42.9485 127.407 41.8924 128.27 41C129.151 40.102 130.21 39.3986 131.38 38.9353C132.549 38.472 133.803 38.2589 135.06 38.31C136.266 38.2624 137.468 38.4785 138.582 38.9431C139.696 39.4077 140.695 40.1096 141.51 41C142.473 42.0949 143.186 43.3873 143.597 44.7865C144.008 46.1858 144.108 47.658 143.89 49.1L128.86 49.18ZM135.07 41.24C133.556 41.1837 132.074 41.6895 130.91 42.66C129.787 43.6307 129.058 44.9788 128.86 46.45H140.86C140.704 44.9514 139.99 43.5664 138.86 42.57C137.802 41.6672 136.451 41.1803 135.06 41.2L135.07 41.24Z"
                    fill="white"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M70.48 35.39H73.54C74.2807 32.5003 75.9584 29.9377 78.3106 28.1029C80.6628 26.2682 83.5569 25.2649 86.54 25.25C87.0914 25.2528 87.6422 25.2862 88.19 25.35V22.3C87.65 22.25 87.1 22.22 86.54 22.22C82.7568 22.2337 79.094 23.551 76.1687 25.9499C73.2433 28.3489 71.2343 31.6828 70.48 35.39V35.39ZM88.2399 0V3C79.2291 3.362 70.6049 6.75834 63.7669 12.6379C56.9289 18.5174 52.2784 26.5351 50.57 35.39H47.45C49.1825 25.7186 54.1751 16.9321 61.5965 10.4932C69.018 4.05418 78.4208 0.351012 88.2399 0V0ZM88.2399 11.5V14.65C82.3063 15.0747 76.6395 17.2822 71.9821 20.9831C67.3247 24.684 63.8941 29.7057 62.1399 35.39H58.9C60.6979 28.8508 64.4905 23.0351 69.7495 18.753C75.0085 14.4709 81.4721 11.9355 88.2399 11.5V11.5Z"
                    fill="#C24D02"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_135_4249">
                    <rect width="144" height="57.14" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  {/* Offcanvas */}
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Nav.Link href="/">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="25"
                      height="25"
                      fill="currentColor"
                      class="bi bi-search"
                      viewBox="0 0 16 16"
                    >
                      <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                    </svg>
                  </Nav.Link>
                  <Nav.Link href="/">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="25"
                      height="25"
                      fill="currentColor"
                      class="bi bi-plus-circle"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                      <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                    </svg>
                  </Nav.Link>
                  <Nav.Link href="/">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      height="30"
                      fill="currentColor"
                      class="bi bi-person"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                    </svg>
                  </Nav.Link>
                  <ThemeButton />
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
