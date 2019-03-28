const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

//Load Validation
const validateProfileInput = require('../../validation/profile');

//Load Model
const Profile = require('../../models/Profile');

router.get('/', (req, res) => {
    Profile.find().then(profile => res.json(profile)).catch(err => res.status(404).json({
        noprofile: 'No Profile found'
    }));
})

router.get('/:id', (req, res) => {
    const errors = {};

    Profile.findOne({ _id: req.params.id })
        .then(profile => {
            if(!profile){
                errors.noprofile = 'There is no profile for this user';
                res.status(404).json(errors);
            }

            res.json(profile);
        })
        .catch(err => res.status(404).json(err));
})

router.delete('/:id', (req, res) => {
    const errors = {};

    Profile.findOne({ _id: req.params.id })
        .then(profile => {
            if(!profile){
                errors.noprofile = 'There is no profile for this user';
                res.status(404).json(errors);
            }else{
                profile.remove().then(() => res.json({ success: true }));
            }
        })
        .catch(err => res.status(404).json(err))
})

router.post('/', (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);

    //check validation
    if(!isValid){
        //return any errors with 400 status
        return res.status(400).json(errors);
    }

    //Get Fields
    const profileFields = {};
    if(req.body.id) profileFields.id = req.body.id;
    if(req.body.name) profileFields.name = req.body.name;
    if(req.body.email) profileFields.email = req.body.email;
    if(req.body.address) profileFields.address = req.body.address;
    if(req.body.company) profileFields.company = req.body.company;
    if(req.body.website) profileFields.website = req.body.website;
    if(req.body.status) profileFields.status = req.body.status;
    if(req.body.bio) profileFields.bio = req.body.bio;

    Profile.findOne({ _id: req.body.id })
        .then(profile => {
            if(profile){
                //Update
                Profile.findOneAndUpdate({ _id: req.body.id }, { $set: profileFields }, { new: true })
                    .then(profile => res.json(profile));
            }else{
                //Save Profile
                new Profile(profileFields).save().then(profile => res.json(profile));
            }
        })
})

module.exports = router;