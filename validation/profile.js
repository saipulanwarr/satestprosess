const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateProfileInput(data){
    let errors = {};

    data.name = !isEmpty(data.name) ? data.name : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.address = !isEmpty(data.address) ? data.address : '';
    data.company = !isEmpty(data.company) ? data.company : '';
    data.website = !isEmpty(data.website) ? data.website : '';
    data.status = !isEmpty(data.status) ? data.status : '';
    data.bio = !isEmpty(data.bio) ? data.bio : '';

    if(!Validator.isLength(data.name, { min: 2, max: 40 })){
        errors.name = 'Name needs to between 2 and 4 characters';
    }

    if(Validator.isEmpty(data.email)){
        errors.email = 'Email field is required';
    }

    if(!Validator.isEmail(data.email)){
        errors.email = 'Email is invalid';
    }

    if(Validator.isEmpty(data.address)){
        errors.address = 'Address is required';
    }

    if(Validator.isEmpty(data.company)){
        errors.company = 'Company is required';
    }

    if(!isEmpty(data.website)){
        if(!Validator.isURL(data.website)){
            errors.website = 'Not a valid URL';
        }
    }

    if(Validator.isEmpty(data.status)){
        errors.status = 'Status is required';
    }

    if(Validator.isEmpty(data.bio)){
        errors.bio = 'Bio is required';
    }

    return{
        errors,
        isValid: isEmpty(errors)
    }
}