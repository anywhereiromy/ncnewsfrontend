import React from 'react';
import PT from 'prop-types';
import ArticleCard from './ArticleCard';

function Topic ({ match, articles }) {
    return (
    <div className="topics">
        <h3 className="pageTitle">{`${match.params.topic[0].toUpperCase()}${match.params.topic.slice(1)} Articles`}</h3>
        {articles.filter(article => {
            return article.belongs_to.slug === match.params.topic;
        }).map(filteredArticle => {
            return <ArticleCard key={filteredArticle._id} article={filteredArticle} />
        })}
    </div>
    );
};

Topic.propTypes = {
    match: PT.object.isRequired,
    articles: PT.array.isRequired
};


export default Topic;