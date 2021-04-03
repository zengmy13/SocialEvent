import {CLEAR_CURRENT_USER, CLOSE_MODAL, OPEN_MODAL, SET_CURRENT_USER, UPDATE_USER_INFO} from "./actiontype";
import {LOCATION_CHANGE} from "connected-react-router";

const defaultValue = {
    modalType: null,
    currentUser: null,
    openModal: false,
    prevLocation:null,
    currentLocation:null
}

export const loginReducer = (state = defaultValue, action) => {
    switch (action.type) {
        case OPEN_MODAL:
            return {
                ...state,
                openModal: true,
                modalType: action.modalType
            }
        case CLOSE_MODAL:
            return {
                ...state,
                openModal: false
            }
        case CLEAR_CURRENT_USER:
            return {
                ...state,
                currentUser: null
            }
        case SET_CURRENT_USER:
            return {
                ...state,
                currentUser: {
                    displayName: action.user.displayName,
                    email: action.user.email,
                    photoURL: action.user.photoURL,
                    uid: action.user.uid,
                    providerId: action.user.providerData[0].providerId,
                    description:action.user.description
                }
            }
        case UPDATE_USER_INFO:
            return {
                ...state,
                currentUser: {
                    ...state.currentUser,
                    ...action.values
                }
            }
        case LOCATION_CHANGE:
        return {
            ...state,
            prevLocation:state.currentLocation,
            currentLocation:action.payload.location
        }
    }
    return state;
}