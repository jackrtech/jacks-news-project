import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getCommentsByArticleId } from "../../API"
import { Container, Row, Col, Card, Image } from "react-bootstrap";
import '../App.css'


const CommentList = () => {

    const { article_id } = useParams()
    const [comments, setComments] = useState([])

    useEffect(() => {
        getCommentsByArticleId(article_id)
            .then(({ comments }) => {
                setComments(comments)
                console.log(comments)
            })
            .catch((err) => console.log(err))
    }, [article_id])




    return (
        <Container >
            <Row>
                <Col>
                    <Card className="comments-container">
                        <Card.Body>
                            <div className="comments-scroller">
                                {comments.map((comment) => (
                                    <Card key={comment.comment_id} >
                                        <Card.Body>
                                            <p>{comment.body}</p>
                                            <div >
                                                <Image alt="add getUserImg later" roundedCircle width="40" height="40" />
                                                <div >
                                                    <strong>{comment.author}</strong>
                                                </div>
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