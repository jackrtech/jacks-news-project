import { useEffect, useState } from "react"
import { getArticles } from "../../API"
import { Card, Container, Row, Col, Spinner } from 'react-bootstrap';
import { Link } from "react-router-dom";

const HomePage = () => {
    const [articles, setArticles] = useState([])
    const [sortedArticles, setSortedArticles] = useState([])
    const [isLoading, setIsLoading] = useState(true)


    useEffect(() => {
        setIsLoading(true)
        getArticles()
        .then(({articles}) => {
            setArticles(articles)
            sortArticlesByVotes(articles)
            setIsLoading(false)
        })
        .catch((err) => {
            console.log(err)
        })
    }, [])


    const sortArticlesByVotes = (articles) => {
        const sorted = [...articles].sort((a, b) => b.votes - a.votes)
        setSortedArticles(sorted.slice(0, 6))
    }


if(isLoading) {
    return (
        <Container className="spinner" style={{ minHeight: '100vh' }}>
            <Spinner animation="border" role="status"> </Spinner>
        </Container>
    );
}

return (
    <Container>
            <h1 className="articles-list">TCC Trending</h1>
            <Row xs={1} md={2} lg={3} className="g-4">
                {sortedArticles.map(item => (
                    <Col key={item.article_id}>
                        <Link to={`/articles/${item.article_id}`} className="link" >
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
                        </Link>
                    </Col>
                ))}
            </Row>
        </Container>
)
}



export default HomePage
