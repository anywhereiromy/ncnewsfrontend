import React from "react";
import ArticleCard from './ArticleCard';
import Button from './Button';
import { Link } from "react-router-dom";
import PT from 'prop-types';

class Home extends React.Component {

    state = {
        displayMostRecent: true     
    }

    render () {
        const { displayMostRecent } = this.state;
        const { articles } = this.props;
        let displayObj = {};
        displayMostRecent ? 
        displayObj = {
            class: 'recentArticles articles',
            title: 'Most Recent Articles',
            articles: articles.slice(articles.length - 10)
        } : displayObj = {
            class: 'topVotedArticles articles',
            title: 'Top Voted Articles',
            articles: articles.sort((a, b) => b.votes - a.votes).slice(0, 11)
        }
        return (
            <div className="home">
                <h4>Everything you need to know about <Link to="/topics/coding">coding</Link>, <Link to="/topics/cooking">cooking</Link> and <Link to="/topics/football">football</Link>...</h4>
                <div className={displayObj.class}>
                    <Button text={displayMostRecent ? 
                        'See Top Voted Articles' 
                        :  'See Most Recent Articles'} 
                        clickFunc={this.toggleDisplay}/>   
                    <h2 className='pageTitle'>{displayObj.title}</h2>
                    {displayObj.articles.map((article) => {
                    return <ArticleCard key={article.title} article={article}/>})}
                </div>   
            </div>
        );
    }
    
    toggleDisplay = () => {   
        this.setState({
            displayMostRecent: !this.state.displayMostRecent
        })
    }
    
    static propTypes = {
        articles: PT.array.isRequired
    }
};

export default Home;

  
