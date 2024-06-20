import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getArticleById } from '../../API';
import { Card, Container, Spinner, Row, Col } from 'react-bootstrap';
import '../App.css';
import CommentList from './CommentList';
import ToggleButtonComponent from './VoteButton';

const IndividualArticle = () => {
  const { article_id } = useParams();
  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [articleVotes, setArticleVotes] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    getArticleById(article_id)
      .then(({ article }) => {
        setArticle(article);
        setArticleVotes(article.votes);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [article_id]);

  if (isLoading) {
    return (
      <Container className="spinner" style={{ minHeight: '100vh' }}>
        <Spinner animation="border" role="status"></Spinner>
      </Container>
    );
  }

  const handleVoteUpdate = (updatedVotes) => {
    setArticleVotes(updatedVotes);
  };

  return (
    <>
      <Container className="centered-container">
        <Row>
          <Col md={8}>
            <Card style={{ width: '100%' }}>
              {article.article_img_url && (
                <Card.Img variant="top" src={article.article_img_url} />
              )}
              <Card.Body>
                <Card.Title>{article.title}</Card.Title> 
                <Card.Text>{article.body}</Card.Text>
                <Card.Text>
                  <strong>Author: {article.author} </strong> 
                   <strong> Votes: {articleVotes}</strong>
                </Card.Text>
                <ToggleButtonComponent defaultChecked={false} initialVotes={article.votes} onVoteUpdate={handleVoteUpdate} /> 
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <CommentList />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default IndividualArticle;


//hello