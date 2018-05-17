import React from 'react';
import PT from 'prop-types';
import { Link } from "react-router-dom";
//NavLink,
function Nav ({ match }) {
    return (
        <div className="topnav" id="myTopnav">
            <Link className={match.url === '/' ? "active" : ''} to="/">Home</Link> 
            <Link className={match.url === '/topics' ? "active" : ''} to="/topics">Topics</Link> 
            <Link className={match.url === '/articles' ? "active" : ''} to="/articles">All Articles</Link> 
            <Link className={match.url === '/users' ? "active" : ''} to="/users">User Portal</Link> 
        </div>
    );
}

Nav.propTypes = {
    match: PT.object.isRequired
}

export default Nav;