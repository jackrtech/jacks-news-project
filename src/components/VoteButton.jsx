import React, { useState } from 'react';
import { ToggleButton } from 'react-bootstrap';
import { updateArticleVotes } from '../../API';
import { useParams } from 'react-router-dom';

const ToggleButtonComponent = ({ defaultChecked = false, initialVotes, onVoteUpdate }) => {
    const { article_id } = useParams()
    const [checked, setChecked] = useState(defaultChecked);
    const [articleVotes, setArticleVotes] = useState(initialVotes);

    const toggleButtonText = checked ? 'UpVoted' : 'UpVote me!';
    const toggleButtonColor = checked ? 'primary' : 'secondary';
    const voteChange = checked ? -1 : 1;


    const handleToggle = () => {
        setChecked(!checked);
        updateArticleVotes(article_id, voteChange)
            .then(({ article }) => {
                setArticleVotes(article.votes);
                onVoteUpdate(article.votes);
            })
            .catch((err) => {
                console.error(err);
            });
    };

    return (
        <ToggleButton id="toggle-check" type="checkbox" variant={toggleButtonColor} checked={checked} value="1" onChange={handleToggle}>
            {toggleButtonText}
        </ToggleButton>
    );
};

export default ToggleButtonComponent;
