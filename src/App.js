import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Articles from './components/Articles';
import Article from './components/Article';
import Home from './components/Home';
import Nav from './components/Nav';
import Profile from './components/Profile';
import Topics from './components/Topics';
import Topic from './components/Topic';
import User from './components/User';
import { getAllArticles } from './API';
import './App.css';

class App extends React.Component {

  state = {
    userProfile: { _id : '' },
    articles: []
  }

  componentDidMount() {
    getAllArticles()
    .then(articles => this.setState({
        articles
    }))
    .catch(console.log)
  }

  render () {
    const { articles, userProfile } = this.state;
    return (
      <Router>
        <div className='App' >
        <img src="./images/ncnewslogo.png" height="100px" width="200px" alt="Northcoders News Logo"/>
            <Route path="*" component={Nav}/>
            <Route exact path="/" render={(props) => {
              return <Home {...props} articles={articles} />
              }} /> 
            <Route path="/topics" render={(props) => {
              return <Topics {...props} articles={articles} />
              }} />
            <Route path="/topics/:topic" render={(props) => {
              return <Topic {...props} articles={articles} />
              }} />
            <Route exact path="/articles" render={(props) => {
              return <Articles {...props} articles={articles}  />
              }} />
            <Route path="/articles/:articleId" render={(props) => { 
              return <Article {...props} articles={articles} userProfile={userProfile} login={this.login}/>
              }} />
            <Route exact path="/users" render={(props) => {
              return <Profile {...props} articles={articles} userProfile={userProfile} login={this.login} logout={this.logout}/>
              }} />    
            <Route path="/users/:userId" render={(props) => {
            return <User {...props} userProfile={userProfile} logout={this.logout}/>
            }} />  
        </div>
      </Router>
    );
  }

  login = (userProfile) => {
    this.setState({
      userProfile
    })
  }

  logout = () => {
    this.setState({
      userProfile: { _id : ''}
    })
  }

}

export default App;