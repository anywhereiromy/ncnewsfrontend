import React from 'react';
import PT from 'prop-types';
import Button from './Button';
import { Redirect } from "react-router-dom";

const axios = require('axios');

class NewUser extends React.Component {

    state = {      
        username: '',
        name: '',
        password: '',
        avatar_url: '',
        message: ''
    }

    componentDidMount () {
        this.setState({
            loggedIn: this.props.loggedIn
        })
    }

    render () {
        const { message } = this.state;
        const { toggleHasAccount, userProfile } = this.props;
        return (
            <div>
                {userProfile._id.length > 0 && <Redirect userProfile={userProfile} to={`users/${userProfile._id}`} />}
                        <form onSubmit={this.checkCredentials}>
                        <h2 className="pageTitle">New User</h2>
                        {Object.keys(this.state).map((key) => {
                            return key !== 'message' && key !== 'loggedIn' && key !== 'newUserId' && <p key={key} >{`${key[0].toUpperCase()}${key.slice(1)}`} : <input name={key} onChange={this.handleChange} key={key} placeholder={`Type ${key} here...`} type={key === 'password' ? 'password' : ''} value={this.state[key]}/></p>
                        })}                
                        </form>
                        {message.length > 0 && <p>{message}</p>}
                        <Button text="Create Account" clickFunc={this.checkCredentials} />
                        <Button text="Already have an account?" clickFunc={toggleHasAccount} />
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
            const userAlreadyExists = res.data.userDocs.filter((user) => {
                return user.username === this.state.username;
            });
            let message = 'Creating user...'
            userAlreadyExists.length !== 0 ? message = 'That username already exists, please try another username' && this.setState({
                message
            }) 
            : this.createUser(this.state);
        });
    }

    createUser = (newUser) => {
        axios.post(`https://ncnewsromy.herokuapp.com/api/users`, newUser)
        .then(res => {
            let message = '';
            res.status !== 201? message = 'Account creation was not successful, please try again' &&
            this.setState({
                message
            })
            : this.props.login({
                username: res.data.newUser.username,
                name: res.data.newUser.name,
                _id: res.data.newUser._id,
                avatar_url: res.data.newUser.avatar_url
            }) 
        })
    }

    static propTypes = {
        toggleHasAccount: PT.func.isRequired,
        login: PT.func.isRequired,
        userProfile: PT.object.isRequired
    }
}

export default NewUser;