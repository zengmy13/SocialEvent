import {CLEAR_CURRENT_USER, CLOSE_MODAL, OPEN_MODAL, SET_CURRENT_USER, UPDATE_USER_INFO} from "./actiontype";
import {LOCATION_CHANGE} from "connected-react-router";

const defaultvalue = {
    modalType: null,
    currentuser: null,
    openmodal: false,
    prevlocation:null,
    currentlocation:null
}

export const loginreducer = (state = defaultvalue, action) => {
    switch (action.type) {
        case OPEN_MODAL:
            return {
                ...state,
                openmodal: true,
                modalType: action.modalType
            }
        case CLOSE_MODAL:
            return {
                ...state,
                openmodal: false
            }
        case CLEAR_CURRENT_USER:
            return {
                ...state,
                currentuser: null
            }
        case SET_CURRENT_USER:
            return {
                ...state,
                currentuser: {
                    displayName: action.user.displayName,
                    email: action.user.email,
                    photoURL: action.user.photoURL,
                    uid: action.user.uid,
                    providerId: action.user.providerData[0].providerId,
                }
            }
        case UPDATE_USER_INFO:
            return {
                ...state,
                currentuser: {
                    ...state.currentuser,
                    ...action.values
                }
            }
        case LOCATION_CHANGE:
        return {
            ...state,
            prevlocation:state.currentlocation,
            currentlocation:action.location
        }
    }
    return state;
}