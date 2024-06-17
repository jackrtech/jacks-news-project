import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getArticleById } from "../../API"
import { Card, Container, Spinner } from 'react-bootstrap';
import '../App.css'


const IndividialArticle = () => {

  const { article_id } = useParams()
  const [article, setArticle] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)
    getArticleById(article_id)
      .then(({ article }) => {
        setArticle(article)
        setIsLoading(false)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [article_id])


  if (isLoading) {
    return (
      <Container className="spinner" style={{ minHeight: '100vh' }}>
        <Spinner animation="border" role="status"> </Spinner>
      </Container>
    );
  }

  return (
    <Container className="centered-container">
      <Card style={{ width: '50rem' }}>
        {article.article_img_url && <Card.Img variant="top" src={article.article_img_url} />}
        <Card.Body>
          <Card.Title>{article.title}</Card.Title>
          <Card.Text>
            {article.body}
          </Card.Text>
          <Card.Text>
            <strong>Author: </strong> {article.author} <strong className="votes">Votes:</strong> {article.votes}
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default IndividialArticle
