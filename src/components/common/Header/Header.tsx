import { NavLink, useNavigate } from "react-router-dom";
import { HeaderBasket } from "../../eCommerce";
import {
  Badge,
  Navbar,
  Nav,
  Container,
  Button,
  Col,
  Row,
} from "react-bootstrap";

import InputGroup from "react-bootstrap/InputGroup";

import styles from "./styles.module.css";
import { useAppSelector } from "@store/hooks";
import { totalquantity } from "@store/Selectors/Selectorall";
import Wishlist from "@components/eCommerce/Wishlist/Wishlist";
import Dropdownusers from "../Dropdownuser/Dropdownuser";
const { headerContainer, headerLogo } = styles;
import Form from "react-bootstrap/Form";
const Header = () => {
  const navigate = useNavigate();

  const { accessToken } = useAppSelector((state) => state.Authslice);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.trim().length>0) {
      navigate(`search?q=${e.target.value}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (e.currentTarget.value.trim().length > 0) {
        navigate(`search?q=${e.currentTarget.value}`);
      }
    }
  };

  return (
    <header>
      <div className={headerContainer}>
        <div style={{ display: "flex", gap: "20px", flex: 1 }}>
          <h1 className={headerLogo}>
            <span>Our</span> <Badge bg="info">Ecom</Badge>
          </h1>
          <Form inline style={{ flex: 1 }} onSubmit={(e) => e.preventDefault()}>
            <Row className="h-100">
              <Col>
                <Form.Control
                  type="text"
                  placeholder="What are you looking for?"
                  className=" mr-sm-2 h-100"
                  onChange={handleChange}
                  onKeyDown={handleKeyDown} // Handle Enter key
                />
              </Col>
            </Row>
          </Form>
        </div>

        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <Wishlist />
          <HeaderBasket />
        </div>
      </div>
      <Navbar
        expand="lg"
        className="bg-body-tertiary"
        bg="dark"
        data-bs-theme="dark"
      >
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link to="/" as={NavLink}>
                Home
              </Nav.Link>
              <Nav.Link as={NavLink} to="categories">
                Categories
              </Nav.Link>
              <Nav.Link as={NavLink} to="about-us">
                About
              </Nav.Link>
            </Nav>
            {accessToken ? (
              <Dropdownusers></Dropdownusers>
            ) : (
              <Nav>
                <Nav.Link as={NavLink} to="login">
                  Login
                </Nav.Link>
                <Nav.Link as={NavLink} to="register">
                  Register
                </Nav.Link>
              </Nav>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
