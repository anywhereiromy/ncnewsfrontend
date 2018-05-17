import React from 'react';
import PT from 'prop-types';
import Search from './Search';
import ArticleCard from './ArticleCard';

class Articles extends React.Component { //change to a function

    render () {
        return (
            <div className="articles"> 
                <Search type="article" data={this.props.articles}/>
                {this.props.match.url === "/articles" && <h2 className="pageTitle">All Articles</h2>}
                {this.props.articles.map((article) => {
                    return <ArticleCard key={article._id} article={article} />
                })}
            </div>
        );
    }

    static propTypes = {
        articles: PT.array.isRequired,
        match: PT.object.isRequired
    }

}

export default Articles;
