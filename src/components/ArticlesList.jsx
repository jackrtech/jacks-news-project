import { useEffect, useState } from "react"
import { getArticles } from "../../API"
import { Card, Container, Row, Col } from 'react-bootstrap';
import '../App.css'
import { Link } from "react-router-dom";

const ArticlesList = () => {

    const [articles, setArticles] = useState([])

    useEffect(() => {
        getArticles()
            .then(({ articles }) => {
                setArticles(articles)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])




    return (
        <Container>
            <h1 className="articles-list">All Articles</h1>
            <Row xs={1} md={2} lg={3} className="g-4">
                {articles.map(item => (
                    <Col key={item.article_id}>
                        <Link to={`/articles/${item.article_id}`} className="link" >
                            <Card >
                                {item.article_img_url && <Card.Img variant="top" src={item.article_img_url} />}
                                <Card.Body>
                                    <Card.Title>{item.title}</Card.Title>
                                    <Card.Text>
                                        <strong>Author: </strong> {item.author} <strong className="votes">Votes:</strong> {item.votes}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Link>
                    </Col>
                ))}
            </Row>
        </Container>
    )
}



export default ArticlesList