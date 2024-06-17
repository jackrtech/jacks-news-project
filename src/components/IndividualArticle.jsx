import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getArticleById } from "../../API"
import { Card, Container } from 'react-bootstrap';
import '../App.css'


const IndividialArticle = () => {

  const { article_id } = useParams()
  const [article, setArticle] = useState(null)

  useEffect(() => {
    getArticleById(article_id)
      .then(({ article }) => {
        setArticle(article)
        console.log(article)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [article_id])


  if (!article) {
    return <p>Loading...</p>
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
