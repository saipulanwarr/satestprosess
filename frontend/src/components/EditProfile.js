import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getProfileById, createProfile } from '../actions/profileActions';
import isEmpty from '../validation/is-empty';
import TextFieldGroup from '../components/common/TextFieldGroup';
import TextAreaFieldGroup from '../components/common/TextAreaFieldGroup';

class EditProfile extends Component{
    constructor(){
        super();

        this.state = {
            id: "",
            name: "",
            email: "",
            address: "",
            company: "",
            website: "",
            status: "",
            bio: "",
            errors: {}
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount(){
        if(this.props.match.params.id){
            this.props.getProfileById(this.props.match.params.id);
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.errors){
            this.setState({ errors: nextProps.errors });
        }

        if(nextProps.profile.profile){
            const profile = nextProps.profile.profile;

            //If profile field doesnt exists, make empty string
            profile._id = !isEmpty(profile._id) ? profile._id : '';
            profile.name = !isEmpty(profile.name) ? profile.name : '';
            profile.email = !isEmpty(profile.email) ? profile.email : '';
            profile.address = !isEmpty(profile.address) ? profile.address : '';
            profile.company = !isEmpty(profile.company) ? profile.company : '';
            profile.website = !isEmpty(profile.website) ? profile.website : '';
            profile.status = !isEmpty(profile.status) ? profile.status : '';
            profile.bio = !isEmpty(profile.bio) ? profile.bio : '';

            //Set component fields state
            this.setState({
                id: profile._id,
                name: profile.name,
                email: profile.email,
                address: profile.address,
                company: profile.company,
                website: profile.website,
                status: profile.status,
                bio: profile.bio
            })
        }
    }

    onChange(e){
        this.setState({[e.target.name]: e.target.value});
    }

    onSubmit(e){
        e.preventDefault();

        const profileData = {
            id: this.state.id,
            name: this.state.name,
            company: this.state.company,
            website: this.state.website,
            email: this.state.email,
            address: this.state.address,
            status: this.state.status,
            bio: this.state.bio
        }

        this.props.createProfile(profileData, this.props.history);
    }

    render(){
        const { errors } = this.state;

        return(
            <div className="container" style={{ marginTop: 20 }}>
                <h4>Edit Profile</h4>
                <form noValidate> 
                    <div className="row">
                        <div className="col">
                            <TextFieldGroup 
                                label="Name"
                                placeholder="Name"
                                name="name"
                                value={this.state.name}
                                onChange={this.onChange}
                                error={errors.name}
                            />
                        </div>
                        <div className="col">
                            <TextFieldGroup 
                                label="Email"
                                placeholder="Email"
                                name="email"
                                value={this.state.email}
                                onChange={this.onChange}
                                error={errors.email}
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col">
                            <TextFieldGroup 
                                label="Company"
                                placeholder="Company"
                                name="company"
                                value={this.state.company}
                                onChange={this.onChange}
                                error={errors.company}
                            />
                        </div>
                        <div className="col">
                            <TextFieldGroup 
                                label="Website"
                                placeholder="Website"
                                name="website"
                                value={this.state.website}
                                onChange={this.onChange}
                                error={errors.website}
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col">
                            <TextFieldGroup 
                                label="Status"
                                placeholder="Status"
                                name="status"
                                value={this.state.status}
                                onChange={this.onChange}
                                error={errors.status}
                            />
                        </div>
                        <div className="col">
                            <TextFieldGroup 
                                label="Bio"
                                placeholder="Bio"
                                name="bio"
                                value={this.state.bio}
                                onChange={this.onChange}
                                error={errors.bio}
                            />
                        </div>
                    </div>
                    
                    
                    <TextAreaFieldGroup 
                        label="Address"
                        placeholder="Address"
                        name="address"
                        value={this.state.address}
                        onChange={this.onChange}
                        error={errors.address}
                    />

                    <button className="btn btn-success btn-sm btn-block" style={{ marginBottom: 20 }} onClick={this.onSubmit}>Update Profile</button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors
})

export default connect(mapStateToProps, { getProfileById, createProfile })(EditProfile);