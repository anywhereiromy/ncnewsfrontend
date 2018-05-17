import React from 'react';
import PT from 'prop-types';
import { Link } from "react-router-dom";
import { getAllUsers } from '../API';


class Search extends React.Component {

    state = {
        searchInput: '',
        users:[]
    }

    componentDidMount() {
        getAllUsers()
        .then(userDocs => {        
            this.setState({
                users: userDocs
            })
        })
    }

    render () {
        const { users, searchInput } = this.state;
        const { type, data } = this.props;
        let searchKey = '';
        let filterKey = '';    
        let dataArray = [];
        if(type === 'user') {
            searchKey = 'username';
            filterKey = 'username';
            dataArray = users;
        } else {
            searchKey = 'article';
            filterKey = 'title';   
            dataArray = data;                           
        }
        const filteredData = dataArray.filter((object) => {
            return object[filterKey].toLowerCase().includes(searchInput)
        });
        return (
            <div>
                <h3> Search for {type} <input className="input" onChange={this.handleChange} placeholder={`Type ${searchKey} here...`} value={searchInput}/></h3>
                {searchInput.length !== 0 && filteredData.map((object) => {
                    return object.title ? <div key={object._id}><Link to={`/articles/${object._id}`} key={object._id} >{object[filterKey]}</Link><br/></div> : <div key={object._id}><Link to={`/users/${object._id}`} userToDisplay={object} key={object._id} >{object[filterKey]}</Link><br/></div>
                })}
            </div>
        );
    }

    handleChange = (event) => {
        this.setState({
            searchInput: event.target.value
        });
    }

    static propTypes = {
        type: PT.string.isRequired,
        data: PT.array.isRequired
    }
}

export default Search;