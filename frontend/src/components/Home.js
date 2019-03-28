import React, { Component } from 'react';
import TextFieldGroup from './common/TextFieldGroup';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Spinner from './common/Spinner';
import { getProfiles, deleteProfile } from  '../actions/profileActions';

class Home extends Component{
    constructor(){
        super();

        this.state = {
            search: '',
            errors: {}
        }

        this.onChange = this.onChange.bind(this);
    }

    componentDidMount(){
        this.props.getProfiles();
    }

    onChange(e){
        this.setState({[e.target.name]: e.target.value});
    }

    onDeleteClick(profileId){
        this.props.deleteProfile(profileId);
    }

    render(){
        const { errors } = this.state;
        const { profiles, loading } = this.props.profile;
        let profileItems;

        if(profiles === null || loading){
            profileItems = <tr><td colSpan="8"><Spinner /></td></tr>
        }else{
            if(profiles.length > 0){
                profileItems = profiles.map(profile => (
                    <tr key={profile._id}>
                        <td>{profile.name}</td>
                        <td>{profile.email}</td>
                        <td>{profile.address}</td>
                        <td>{profile.company}</td>
                        <td>{profile.website}</td>
                        <td>{profile.status}</td>
                        <td>{profile.bio}</td>
                        <td><Link className="btn btn-warning btn-sm" to={`/editprofile/${profile._id}`}>Edit</Link>  <button onClick={this.onDeleteClick.bind(this, profile._id )} className="btn btn-danger btn-sm">Delete</button></td>
                    </tr>
                ))
            }else{
                profileItems = <tr><td colSpan="8">Profile Not Found</td></tr>
            }
        }

        return(
            <div className="container" style={{ marginTop: 20 }}>
                <div className="row justify-content-between">
                    <div className="col-6">
                        <form className="form-inline">
                            <div className="form-group mb-2">
                                <TextFieldGroup 
                                    placeholder="Search Here....."
                                    name="search"
                                    value={this.state.search}
                                    onChange={this.onChange}
                                    error={errors.search}
                                />
                            </div>
                            <button type="button" className="btn btn-success btn-sm mb-2">Search</button>
                        </form>
                    </div>
                    <div className="col-2">
                        <Link className="btn btn-success btn-sm mb-2" to="/addprofile">Add Profile</Link>
                    </div>
                </div>

                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Address</th>
                            <th scope="col">Company</th>
                            <th scope="col">Website</th>
                            <th scope="col">Status</th>
                            <th scope="col">Bio</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {profileItems}
                    </tbody>
                </table>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    profile: state.profile
})

export default connect(mapStateToProps, { getProfiles, deleteProfile })(Home);