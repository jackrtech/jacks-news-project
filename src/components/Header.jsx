import React, { useContext, useEffect, useState } from "react";
import { Navbar, Nav, Container, Image } from "react-bootstrap";
import { Link } from "react-router-dom"; 
import { UserContext } from "./UserComponent";
import { getArticleTopics } from "../../API";

const Header = () => {
  const { user } = useContext(UserContext);
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    getArticleTopics()
      .then((topicsResponse) => {
        setTopics(topicsResponse.topics);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/home">The Code Chronicle</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/home">Home</Nav.Link>
            <Nav.Link as={Link} to="/articles">Articles</Nav.Link>
            {topics.map((topic) => (
              <Nav.Link key={topic.slug} as={Link} to={`/topics/${topic.slug}`}>
                {topic.slug}
              </Nav.Link>
            ))}
          </Nav>
          <Nav>
            <Nav.Link>
              <Image src={user.avatar_url} roundedCircle width="50" height="50" />
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
