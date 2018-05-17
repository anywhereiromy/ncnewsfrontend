import React from 'react';
import PT from 'prop-types';
import { getCommentsByArticleId, getCommentsByUserId } from '../API';
import Comment from './Comment';
import Button from './Button';
import CreateComment from './CreateComment';                    

class Comments extends React.Component {

    state = {
        comments: [],
        displayComments: false
    }

    componentDidMount() {
        const { userProfile, articleId } = this.props;
        this.props.type !== 'user' ? getCommentsByArticleId(articleId)
        .then(res => this.setState({
            comments: res
        }))
        : getCommentsByUserId(userProfile._id)
        .then(res => this.setState({
            comments: res
        }))
    }

    componentWillReceiveProps(newProps) {
        newProps.type !== 'user' ? getCommentsByArticleId(newProps.articleId)
        .then(res => this.setState({
            comments: res
        }))
        : getCommentsByUserId(newProps.userProfile._id)
        .then(res => this.setState({
            comments: res
        }))
    }

    render () {
        const { comments, displayComments } = this.state;
        const { userProfile, articleId, type } = this.props;
        return (
            <div className="comments">
                {type === 'article' && userProfile._id > 0 && <CreateComment userProfile={userProfile} articleId={articleId}/>}
                <p> Number of Comments {type === 'article' ? "on Article" : `by ${userProfile.username}`}: {comments.length}</p>
                {comments.length > 0 ? displayComments ?
                <div>
                    <Button text="Hide Comments" clickFunc={this.toggleDisplayComments}/>
                    {comments.map((comment) => {
                        return <Comment articleId={articleId} key={comment._id} comment={comment} />
                    }) }
                </div>
                : <div>
                    <Button text="Show Comments" clickFunc={this.toggleDisplayComments}/>
                </div> 
                : ''}
            </div>
        );
    }

    toggleDisplayComments = () => {
        this.setState({
            displayComments: !this.state.displayComments
        })
    }

    static propTypes = {
        articleId: PT.string,
        type: PT.string.isRequired,
        userProfile: PT.object.isRequired
    }
}

export default Comments;