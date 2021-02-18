import {ALREADY_FOLLOWING, ALREADY_UNFOLLOWING, SET_EVENTSTAB, SET_FOLLOWERS, SET_FOLLOWINGS, SET_PHOTOS, SET_PROFILE} from "./actiontype";

export const setphotos = (photos) => {
    return {
        type: SET_PHOTOS,
        photos
    }
}

export const geteventstab = (events) => {
    return {
        type: SET_EVENTSTAB,
        eventstab: events
    }
}

export const getprofiles = (profile) => {
    return {
        type: SET_PROFILE,
        profile
    }
}

export const setfollowstatus = () => {
    return {
        type: ALREADY_FOLLOWING
    }
}

export const setunfollowstatus = () => {
    return {
        type: ALREADY_UNFOLLOWING
    }
}
export const followingprofile = (data) => {
    return {
        type: SET_FOLLOWINGS,
        data
    }
}

export const followerprofile = (data) => {
    return {
        type: SET_FOLLOWERS,
        data
    }
}