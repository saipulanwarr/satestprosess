import React, { Component } from 'react';
import { connect } from 'react-redux';

import TextFieldGroup from '../components/common/TextFieldGroup';
import TextAreaFieldGroup from '../components/common/TextAreaFieldGroup';
import { createProfile } from '../actions/profileActions';

class AddProfile extends Component{

    constructor(){
        super();

        this.state = {
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

    componentWillReceiveProps(nextProps){
        if(nextProps.errors){
            this.setState({ errors: nextProps.errors });
        }
    }

    onSubmit(e){
        e.preventDefault();

        const profileData = {
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

    onChange(e){
        this.setState({[e.target.name]: e.target.value})
    }

    render(){
        const { errors } = this.state;
        
        return(
            <div className="container" style={{ marginTop: 20 }}>
                <h4>Add Profile</h4>
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

                    <button className="btn btn-success btn-sm btn-block" style={{ marginBottom: 20 }} onClick={this.onSubmit}>Save Profile</button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    errors: state.errors
})

export default connect(mapStateToProps, { createProfile })(AddProfile);