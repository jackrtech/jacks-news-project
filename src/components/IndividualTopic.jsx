import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Spinner, Alert } from 'react-bootstrap';
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
      <h1>Articles on {topic}</h1>
      {articles.length === 0 ? (
        <Alert variant="info">No articles found for {topic}.</Alert>
      ) : (
        articles.map((article) => (
          <div key={article.article_id}>
            <h2>{article.title}</h2>
            <p>{article.body}</p>
          </div>
        ))
      )}
    </Container>
  );
};

export default IndividualTopic;
