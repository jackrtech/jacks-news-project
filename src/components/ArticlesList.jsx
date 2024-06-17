import { useEffect, useState } from "react"
import { getArticles } from "../../API"
import { Card, Container, Row, Col } from 'react-bootstrap';
import '../App.css'

const ArticlesList = () => {

    const [articles, setArticles] = useState([])

    useEffect(() => {
        getArticles()
        .then(({articles}) => {
            setArticles(articles)
        })
        .catch((err) => {
            console.log(err)
        })
    }, [])


    return (
        <Container>
            <h1 className="mt-4 mb-4">All Articles</h1>
            <Row xs={1} md={2} lg={3} className="g-4">
                {articles.map(item => (
                    <Col key={item.article_id}>
                        <Card>
                            {item.article_img_url && <Card.Img variant="top" src={item.article_img_url} />}
                            <Card.Body>
                                <Card.Title>{item.title}</Card.Title>
                                <Card.Text>
                                    <strong>Author: </strong> {item.author} <strong className="votes">Votes:</strong> {item.votes}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    )
}



export default ArticlesList