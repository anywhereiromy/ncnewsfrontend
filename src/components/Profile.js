import React from 'react';
import PT from 'prop-types';
import Login from './Login';
import { Redirect } from "react-router-dom";


class Profile extends React.Component {

    render () {
        const { login, logout, userProfile } = this.props;
        return (
        <div className="profile">
            {userProfile._id ? 
            <Redirect logout={logout} to={`users/${userProfile._id}`}/> 
            : <Login userProfile ={userProfile} login={login}/>}
        </div>
        );
    }

    static propTypes = {
        userProfile: PT.object.isRequired,
        login: PT.func.isRequired,
        logout: PT.func.isRequired
    }
}

export default Profile;