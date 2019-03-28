const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const ProfileSchema = new Schema({
    name: {
        type: String,
        required: true,
        max: 40
    },
    email: {
        type: String,
        required: true
    },
    address: {
        type: String
    },
    company: {
        type: String
    },
    website: {
        type: String
    },
    status: {
        type: String
    },
    bio: {
        type: String
    }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);