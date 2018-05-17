import React from 'react';
import PT from 'prop-types';
import Button from './Button';
import NewUser from './NewUser';
import { withRouter, Redirect } from "react-router-dom";

const axios = require('axios');

class Login extends React.Component {

    state = {
        hasAccount: true,
        username: '',
        password: '',
        message: ''
    }

    render () {
        const { hasAccount, message } = this.state;
        const { login, userProfile } = this.props;
        return (
            <div>
                {hasAccount ? 
                    <div>
                        <form onSubmit={login}>
                        <h2 className="pageTitle">Enter User Details</h2>
                        {Object.keys(this.state).map((key) => {
                            return key !== 'hasAccount' && key !== 'message' && <p key={key} >{`${key[0].toUpperCase()}${key.slice(1)} :`} <input onChange={this.handleChange} className="input" key={key} name={key} type={key === 'password' ? 'password' : ''} placeholder={`Type ${key} here...`} value={this.state[key]}/></p>
                        })}                
                        </form>
                        {message.length > 0 && <p>{message}</p>}
                        <Button text="Sign In" clickFunc={this.checkCredentials} />
                        <Button text="Sign up for an Account" clickFunc={this.toggleHasAccount} />
                    </div> : 
                    <NewUser userProfile={userProfile} login={login} toggleHasAccount={this.toggleHasAccount}/>
                }
                
            </div>
        );
    }

    handleChange = (event) => {
        this.setState({
            message: '',
            [event.target.name]: event.target.value.toLowerCase()
        })
    }

    checkCredentials = () => {
        axios.get(`https://ncnewsromy.herokuapp.com/api/users`)
        .then(res => {
            let message = 'Logging in...'
            const [ userToCheck ] = res.data.userDocs.filter((user) => {
                return user.username === this.state.username;
            });
            return userToCheck.length === 0 ? message = 'That username does not exist, please try again or sign up for a new account' && this.setState({
                message
            })
            : userToCheck.password !== this.state.password ? message = 'Your password is incorrect, please try again' && this.setState({
                    message
                })
            : this.props.login({ 
                username: userToCheck.username, name: userToCheck.name, 
                avatar_url: userToCheck.avatar_url,
                _id : userToCheck._id
            }) && <Redirect to={`users/${userToCheck._id}`} userProfile={userToCheck}/>
        });
    }

    toggleHasAccount = () => {
       this.setState({
            hasAccount: !this.state.hasAccount
        })
    }

    static propTypes = {  
        login: PT.func.isRequired,
        userProfile: PT.object.isRequired     
    }
}

export default withRouter(Login);