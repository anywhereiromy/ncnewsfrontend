import React from 'react';
import PT from 'prop-types';
import { postCommentByUserToArticle } from '../API';

class CreateComment extends React.Component {

    state = {
        userInput: ''
    }

    render () {
        const { userProfile } = this.props;
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    {userProfile._id > 0 && <p>Logged in as user : {userProfile.username}</p>}
                    <input onChange={this.handleChange} placeholder='Write comment here...' value={this.state.userInput} type="text"/>
                    <button type="submit">Post Comment</button>
                </form>
            </div>
        );
        
    }
    
    handleChange = (event) => {
        this.setState({
            userInput: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const { articleId, userProfile } = this.props;
        console.log(articleId, userProfile);
        postCommentByUserToArticle({
            comment: this.state.userInput,
            created_by: userProfile._id
        }, articleId)
        .then(res => {
            this.setState({
                userInput: ''
            })
        })
        
    }

    static propTypes = {
        userProfile: PT.object.isRequired,
        articleId: PT.string.isRequired
    }
}

export default CreateComment;