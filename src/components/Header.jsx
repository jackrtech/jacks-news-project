import React, { useContext } from "react";
import { Navbar, Nav, Container, Image } from "react-bootstrap";
import { UserContext } from "./UserComponent";

const Header = () => {
  const { user } = useContext(UserContext);

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="/home">The Code Chronicle</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/home">Home</Nav.Link>
            <Nav.Link href="/articles">Articles</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link>
             <Image src={user.avatar_url} roundedCircle width="50" height="50"/>
            <Navbar.Text className="text-light">
              User: {user.username}
            </Navbar.Text>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;