import React from 'react';
import PT from 'prop-types';
import Button from './Button';
import Comments from './Comments';
import Search from './Search';
import { Link, Redirect } from "react-router-dom";
// import { getUserById } from '../API';

class User extends React.Component {

    render () {
        const { userProfile, userToDisplay } = this.props;
        return (
            <div key="loggedInUser">
                {/* { userProfile._id > 0 && 
                <div key="loggedInUser"> */}
                    <h2>My Profile</h2>
                    <img height='50px' width='50px' src={userProfile.avatar_url} alt="avatar" />
                    <br />
                    {Object.keys(userProfile).map((key) => {
                    return key!== '_id' && key !== 'avatar_url' && <p key={key}>{`${key[0].toUpperCase() + key.slice(1)} : `}<Link to={`users/${userProfile._id}`}>{userProfile[key]}</Link></p>
                    })}
                    {<Comments userProfile={userProfile} type='user'/>}
                    <br />
                    <Button text={'Log Out'} clickFunc={() => {this.handleClick()}}/>
                    <Search type="user" data={[]} />
                {/* </div>} */}
                {userToDisplay && <div>
                    <h2>{userToDisplay.username}'s Profile</h2>
                    <img height='50px' width='50px' src={userToDisplay.avatar_url} alt="avatar" />
                    <br />
                    {Object.keys(userToDisplay).map((key) => {
                    return key!== '_id' && key !== 'avatar_url' && <p key={key}>{`${key[0].toUpperCase() + key.slice(1)} : `}<Link to={`users/${userToDisplay._id}`}>{userToDisplay.username}</Link></p>
                    })}
                    {<Comments userProfile={userToDisplay} type='user'/>}
                    <br />
                </div>}
            </div>
        );
    }

    handleClick = () => {
        this.props.logout();
        console.log(this.props.match);
        return <Redirect to={`users/`}/>
    }

    static propTypes = {
        userProfile: PT.object.isRequired,
        logout: PT.func.isRequired,
        userToDisplay: PT.object
    }
}

export default User;