import { useEffect, useState } from "react";
import { getArticleTopics, getArticles } from "../../API";
import { Card, Container, Row, Col, Spinner, Dropdown, DropdownButton } from 'react-bootstrap';
import { Link } from "react-router-dom";
import '../App.css';


const ArticlesList = () => {
    const [articles, setArticles] = useState([]);
    const [filteredArticles, setFilteredArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedTopic, setSelectedTopic] = useState('');
    const [topics, setTopics] = useState([]);


    useEffect(() => {
        setIsLoading(true);

        Promise.all([getArticles(), getArticleTopics()])
            .then(([articlesResponse, topicsResponse]) => {
                setArticles(articlesResponse.articles);
                setFilteredArticles(articlesResponse.articles); 
                setTopics(topicsResponse.topics);
                setIsLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setIsLoading(false);
            });
    }, []);


    useEffect(() => {
        if (selectedTopic) {
            const filtered = articles.filter(article => article.topic === selectedTopic);
            setFilteredArticles(filtered);
        } else {
            setFilteredArticles(articles);
        }
    }, [selectedTopic, articles]);


    const handleTopicChange = (topic) => {
        setSelectedTopic(topic);
        console.log(topic);
    };


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
            <h1 className="articles-list">All Articles</h1>
            <div id="bg-nested-dropdown" className="mb-4">
                <DropdownButton title="Topics">
                    <Dropdown.Item onClick={() => handleTopicChange('')}>All Topics</Dropdown.Item>
                    {topics.map(topic => (
                        <Dropdown.Item key={topic.slug} onClick={() => handleTopicChange(topic.slug)}>
                            {topic.slug}
                        </Dropdown.Item>
                    ))}
                </DropdownButton>
            </div>
            <Row xs={1} md={2} lg={3} className="g-4">
                {filteredArticles.map(article => (
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

export default ArticlesList;
