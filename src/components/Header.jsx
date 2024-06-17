import React from "react"
import { Navbar, Nav, Container } from "react-bootstrap"

const Header = () => {
    return (
        <>
        <Navbar bg="dark" data-bs-theme="dark">
          <Container>
            <Navbar.Brand href="/home">The Code Cronicle</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link href="/home">Home</Nav.Link>
              <Nav.Link href="/articles" >Articles</Nav.Link>
            </Nav>
          </Container>
        </Navbar>
        <br />
      </>
    )
}

export default Header
