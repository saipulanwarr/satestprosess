import { GET_PROFILES, PROFILE_LOADING, GET_PROFILE, DELETE_PROFILE } from '../actions/types';

const initialState = {
    profiles: null,
    profile: null,
    loading: false
}

export default function(state = initialState, action){
    switch(action.type){
        case PROFILE_LOADING:
            return{
                ...state,
                loading: true
            };

        case GET_PROFILES:
            return{
                ...state,
                profiles: action.payload,
                loading: false
            }
        
        case GET_PROFILE:
            return{
                ...state,
                profile: action.payload,
                loading: false
            }

        case DELETE_PROFILE:
            return{
                ...state,
                profiles: state.profiles.filter(profile => profile._id !== action.payload)
            }

        default:
            return state;
    }
}