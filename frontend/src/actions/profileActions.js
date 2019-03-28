import axios from 'axios';
import { GET_PROFILES, PROFILE_LOADING, GET_ERRORS, GET_PROFILE, DELETE_PROFILE } from './types';

//GET All Profile
export const getProfiles = () => dispatch => {
    axios.get('http://localhost:7000/api/profile')
        .then(res => 
            dispatch({
                type: GET_PROFILES,
                payload: res.data
            })
        )
        .catch(err => 
            dispatch({
                type: GET_PROFILES,
                payload: null
            })    
        )
}

export const getProfileById = (id) => dispatch => {
    axios.get(`http://localhost:7000/api/profile/${id}`)
        .then(res => 
            dispatch({
                type: GET_PROFILE,
                payload: res.data
            })    
        )
        .catch(err => 
            dispatch({
                type: GET_PROFILE,
                payload: null
            })    
        )
}

export const createProfile = (profileData, history) => dispatch => {
    axios.post('http://localhost:7000/api/profile', profileData)
        .then(res => history.push('/'))
        .catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })    
        )
}

export const deleteProfile = id => dispatch => {
    axios.delete(`http://localhost:7000/api/profile/${id}`)
        .then(res =>
            dispatch({
                type: DELETE_PROFILE,
                payload: id
            }) 
        )
        .catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })    
        )
}

export const setProfileLoading = () => {
    return{
        type: PROFILE_LOADING
    }
}