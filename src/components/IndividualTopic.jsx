import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Container, Spinner, Alert, Row, Col, Card } from 'react-bootstrap';
import { getArticlesByTopic } from '../../API';



const IndividualTopic = () => {

  const { topic } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    setIsLoading(true);

    getArticlesByTopic(topic)
      .then((articlesResponse) => {
        setArticles(articlesResponse.articles);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, [topic]);


  if (isLoading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  return (
    <Container>
      <h1 className="articles-list">Articles {topic && `in ${topic}`}</h1>
  <Row xs={1} md={2} lg={3} className="g-4">
                {articles.map(article => (
                    <Col key={article.article_id}>
                        <Link to={`/articles/${article.article_id}`} className="link">
                            <Card>
                                {article.article_img_url && <Card.Img variant="top" src={article.article_img_url} />}
                                <Card.Body>
                                    <Card.Title>{article.title}</Card.Title>
                                    <Card.Text>
                                        <strong>Author:</strong> {article.author} <strong className="votes">Votes:</strong> {article.votes}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Link>
                    </Col>
                ))}
            </Row>
    </Container>
  );
};

export default IndividualTopic;
