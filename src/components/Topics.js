import React from 'react';
import PT from 'prop-types';
import { BrowserRouter as Route, Link } from "react-router-dom";
import Topic from './Topic';

class Topics extends React.Component {
    
    render () {
        const match = this.props.match;
        return (
            <div className="topics">
                <h2 className="pageTitle">Topics</h2>
                <h3> <Link className="topicLink" to={`${match.url}/coding`}>Coding</Link> 
                <Link className="topicLink" to={`${match.url}/cooking`}>Cooking</Link> 
                <Link className="topicLink" to={`${match.url}/football`}>Football</Link> </h3>
                <Route path={`${match.url}/:topicId`} component={Topic} />
                <Route exact path={match.url} render={() => <h3>Please select a topic ^</h3>}/>
            </div>
        );
    }

    static propTypes = {
        match: PT.object.isRequired
    }
}

export default Topics;