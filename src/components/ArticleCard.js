import React from 'react';
import PT from 'prop-types';
import { Link } from "react-router-dom";

function ArticleCard ({ article }) {

    return (
        <div className="articleCard" key={article.title}>
            <h2>
                <Link to={`/articles/${article._id}`}>{getArticleSnippet(article)}</Link>
            </h2>
            <p>{article.body.slice(0, 201)}...</p>
            <p>Topic : <Link to={`/topics/${article.belongs_to.title.toLowerCase()}`}>{article.belongs_to.title}</Link>  Votes : {article.votes}
            </p>        
        </div>
    );
}

function getArticleSnippet (article) {
    let end = '';
    article.title.length > 30 ? end = '...' : end = '';
    return `${article.title.slice(0, 31)}${end}`;
}

ArticleCard.propTypes = {
    article: PT.object.isRequired
}

export default ArticleCard;