import {ALREADY_FOLLOWING, ALREADY_UNFOLLOWING, SET_EVENTSTAB, SET_FOLLOWERS, SET_FOLLOWINGS, SET_PHOTOS, SET_PROFILE} from "./actiontype";

const defaultvalue = {
    photos: [],
    eventstab: [],
    profile: null,
    followstatus: false,
    followings: [],
    followers: []
}

export const profilereducer = (state = defaultvalue, action) => {
    switch (action.type) {
        case SET_PHOTOS:
            return {
                ...state,
                photos: action.photos
            }
        case SET_EVENTSTAB:
            return {
                ...state,
                eventstab: action.eventstab
            }
        case SET_PROFILE:
            return {
                ...state,
                profile: action.profile
            }
        case ALREADY_FOLLOWING:
            return {
                ...state,
                followstatus: true
            }
        case ALREADY_UNFOLLOWING:
            return {
                ...state,
                followstatus: false
            }
        case SET_FOLLOWINGS:
            return {
                ...state,
                followings: action.data
            }
        case SET_FOLLOWERS:
            return {
                ...state,
                followers: action.data
            }
    }

    return state;
}