import { useEffect, useState } from "react"
import { getArticles } from "../../API"
import { Card, Container, Row, Col } from 'react-bootstrap';


const HomePage = () => {
    const [articles, setArticles] = useState([])
    const [sortedArticles, setSortedArticles] = useState([])


    useEffect(() => {
        getArticles()
        .then(({articles}) => {
            setArticles(articles)
            sortArticlesByVotes(articles)
        })
        .catch((err) => {
            console.log(err)
        })
    }, [])


    const sortArticlesByVotes = (articles) => {
        const sorted = [...articles].sort((a, b) => b.votes - a.votes)
        setSortedArticles(sorted.slice(0, 6))
    }



return (
    <Container>
            <h1 className="mt-4 mb-4">TCC Trending</h1>
            <Row xs={1} md={2} lg={3} className="g-4">
                {sortedArticles.map(item => (
                    <Col key={item.article_id}>
                        <Card>
                            {item.article_img_url && <Card.Img variant="top" src={item.article_img_url} />}
                            <Card.Body>
                                <Card.Title>{item.title}</Card.Title>
                                <Card.Text>
                                    <strong>Votes:</strong> {item.votes}
                                </Card.Text>
                                <Card.Text>
                                    <strong>Author:</strong> {item.author}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
)
}



export default HomePage
