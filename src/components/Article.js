import React from 'react';
import PT from 'prop-types';
import Button from './Button';
import { Link } from "react-router-dom";
import Comments from './Comments';
import Search from './Search';
import Loading from './Loading';
import { getArticleById, updateVote } from '../API';

class Article extends React.Component {

    state = {
        loading: true,
        article: {}
    }

    componentDidMount() {
        getArticleById(this.props.match.params.articleId)
        .then( res => {
            this.setState({
            loading: false,
            article: res
        })})
    }

    componentDidUpdate(newProps) {
        newProps.articles !== this.setState.articles && getArticleById(this.props.match.params.articleId)
        .then( res => {
            this.setState({
            loading: false,
            article: res
        })})
    }

    render () {
        const article = this.state.article;
        const { articles, login, userProfile} = this.props;
        return (
            this.state.loading ? <Loading /> 
            : <div className="article" key={article.title}>
                    <h2><Link to={`/articles/${article._id}`}>{article.title}</Link></h2>
                    <p>{article.body}</p>
                    <p>Topic : <Link to={`/topics/${article.belongs_to.title.toLowerCase()}`}>{article.belongs_to.title}</Link> Votes : {article.votes} </p> 
                    <div>
                        <Button text="Like" increment="1" objectId={article._id} clickFunc={() => updateVote('up', "articles", article._id)} /> <Button text="Down Vote" clickFunc={() => updateVote('down', "articles", article._id)} />
                    </div>
                    <Comments login={login} type="article" userProfile={userProfile} articleId={article._id} />
                    <Search type="article" data={articles} />      
            </div>
        );
    }

    static propTypes = {
        match: PT.object.isRequired,
        articles: PT.array.isRequired,
        userProfile: PT.object.isRequired,
        login: PT.func.isRequired
    }
}

export default Article;
