import { useEffect, useState } from "react";
import { getArticleTopics, getArticles } from "../../API"; 
import { Card, Container, Row, Col, Spinner, Dropdown, DropdownButton } from 'react-bootstrap';
import { Link } from "react-router-dom";
import '../App.css';

const ArticlesList = () => {
    const [articles, setArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [topics, setTopics] = useState([]);
    const [selectedTopic, setSelectedTopic] = useState(null); 

    useEffect(() => {
        setIsLoading(true);

        getArticleTopics()
            .then((topicsResponse) => {
                setTopics(topicsResponse.topics);
            })
            .catch((err) => {
                console.log(err);
            });

        getArticles()
            .then((articlesResponse) => {
                setArticles(articlesResponse.articles);
                setIsLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setIsLoading(false);
            });
    }, []); 
 

    const handleTopicSelect = (topic) => {
        setSelectedTopic(topic);
    };

    
    const filteredArticles = selectedTopic ? articles.filter(article => article.topic === selectedTopic) : articles;


    if (isLoading) {
        return (
            <Container className="spinner" style={{ minHeight: '100vh' }}>
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </Container>
        );
    }

    
    return (
        <Container>
            <h1 className="articles-list">Articles {selectedTopic && `in ${selectedTopic}`}</h1>
            <div id="bg-nested-dropdown" className="mb-4">
                <DropdownButton title="Topics">
                    <Dropdown.Item onClick={() => handleTopicSelect(null)}>All Topics</Dropdown.Item>
                    {topics.map(topic => (
                        <Dropdown.Item key={topic.slug} onClick={() => handleTopicSelect(topic.slug)}>
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
