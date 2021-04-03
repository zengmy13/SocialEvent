import {ALREADY_FOLLOWING, ALREADY_UNFOLLOWING, SET_EVENTSTAB, SET_FOLLOWERS, SET_FOLLOWINGS, SET_PHOTOS, SET_PROFILE} from "./actiontype";

export const setPhotos = (photos) => {
    return {
        type: SET_PHOTOS,
        photos
    }
}

export const getEventsTab = (events) => {
    return {
        type: SET_EVENTSTAB,
        eventstab: events
    }
}

export const getProfiles = (profile) => {
    return {
        type: SET_PROFILE,
        profile
    }
}

export const setFollowStatus = () => {
    return {
        type: ALREADY_FOLLOWING
    }
}

export const setUnfollowStatus = () => {
    return {
        type: ALREADY_UNFOLLOWING
    }
}
export const followingProfile = (data) => {
    return {
        type: SET_FOLLOWINGS,
        data
    }
}

export const followerProfile = (data) => {
    return {
        type: SET_FOLLOWERS,
        data
    }
}