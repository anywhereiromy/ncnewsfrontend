import React from 'react';
import PT from 'prop-types';
import Button from './Button';
import { Link } from "react-router-dom";
import { updateVote } from '../API';

class Comment extends React.Component {

    state = {
        comment: {}
    }

    render () {
        const comment = this.props.comment;
        const d = new Date(0);
        d.setUTCSeconds(comment.created_at);
        return (
            <div key={comment}>
                <p>{comment.body}</p>
                <div>
                    <p><img src={comment.created_by.avatar_url} alt="User Profile" height="15" width="15"/> <Link to={`/users/${comment.created_by._id}`}>{comment.created_by.username}</Link> commented on article <Link to={`/articles/${comment.belongs_to._id}`}>{`${comment.belongs_to.title}`}</Link>{` at ${d}`}</p>
                    <p>Votes : {comment.votes}</p>
                    <div>
                        <Button text="Like" objectId={comment._id} clickFunc={() => {updateVote('up', 'comments', comment._id)}} /> 
                        <Button text="Down Vote" objectId={comment._id} clickFunc={() => {updateVote('down', 'comments', comment._id)}} />
                    </div>
                </div> 
            </div>   
        );
    }

    static propTypes = {
        comment: PT.object.isRequired
    }
}

export default Comment;