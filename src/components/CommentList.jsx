import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { deleteArticleComments, getCommentsByArticleId, getUsers, updateArticleComments } from "../../API"
import { Container, Row, Col, Card, Image, Form, Button } from "react-bootstrap";
import '../App.css'
import { UserContext } from "./UserComponent";


const CommentList = () => {


    const { article_id } = useParams();
    const [comments, setComments] = useState([]);
    const [users, setUsers] = useState([]);
    const [newComment, setNewComment] = useState("");
    const { user } = useContext(UserContext);


    useEffect(() => {
        getCommentsByArticleId(article_id)
            .then(({ comments }) => {
                setComments(comments || [])
            })
            .catch((err) => console.log(err))

    }, [article_id, comments])


    useEffect(() => {
        getUsers()
            .then(({ users }) => {
                setUsers(users || [])
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])


    const getUserURL = (username) => {
        const user = users.find(user => user.username === username);
        if (user) {
            return user.avatar_url;
        } else {
            return 'https://i.pinimg.com/736x/fa/39/eb/fa39eb88592bf16aebab746f88068ac7.jpg'
        }
    }


    const handleAddComment = () => {

        updateArticleComments(article_id, { username: user.username, body: newComment })
            .then((newComment) => {
                setComments([...comments, newComment]);
                setNewComment("");
            })
            .catch((err) => {
                console.log(err)
            })
    };


    const handleDeleteComment = (comment_id) => {

        deleteArticleComments(comment_id)
            .then((response) => {
                setComments(comments.filter(comment => comment.comment_id !== comment_id))
            })
            .catch((err) => {
                console.log(err)
            })
    }


    return (
        <Container >
            <Row>
                <Col>
                    <Form>
                        <Form.Group controlId="formComment">
                            <Form.Label>Add your comment:</Form.Label>
                            <Form.Control as="textarea" rows={3} value={newComment} onChange={(e) => setNewComment(e.target.value)} />
                        </Form.Group>
                        <Button variant="primary" onClick={handleAddComment}>Submit</Button>
                    </Form>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Card className="comments-container">
                        <Card.Body>
                            <div className="comments-scroller">
                                {comments && comments.map((comment) => (
                                    <Card key={comment.comment_id || 999} >
                                        <Card.Body>
                                            <p>{comment.body}</p>
                                            <div>
                                                <Image src={getUserURL(comment.author)} roundedCircle width="30" height="30" />
                                                <strong>{comment.author}</strong>
                                                {user.username === comment.author && (
                                                        <Button className="delete-button" size="sm" variant="outline-danger" onClick={() => handleDeleteComment(comment.comment_id)}>Delete</Button>
                                                    )} 
                                            </div>
                                        </Card.Body>
                                    </Card>
                                ))}
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );


}

export default CommentList