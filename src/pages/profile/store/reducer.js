import {
    ALREADY_FOLLOWING,
    ALREADY_UNFOLLOWING,
    RESET_STATUS,
    SET_EVENTSTAB,
    SET_FOLLOWERS,
    SET_FOLLOWINGS,
    SET_PHOTOS,
    SET_PROFILE
} from "./actiontype";

const defaultValue = {
    photos: [],
    eventsTab: [],
    profile: null,
    followStatus: false,
    followings: [],
    followers: []
}

export const profileReducer = (state = defaultValue, action) => {
    switch (action.type) {

        case SET_PHOTOS:
            return {
                ...state,
                photos: action.photos
            }
        case SET_EVENTSTAB:
            return {
                ...state,
                eventsTab: action.eventstab
            }
        case SET_PROFILE:
            return {
                ...state,
                profile: action.profile
            }
        case ALREADY_FOLLOWING:
            return {
                ...state,
                followStatus: true
            }
        case ALREADY_UNFOLLOWING:
            return {
                ...state,
                followStatus: false
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
        case RESET_STATUS:{
            return {
                ...state,
                followStatus: false
            }
        }

    }

    return state;
}