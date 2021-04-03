import {CLEAR_CURRENT_USER, CLOSE_MODAL, OPEN_MODAL, SET_CURRENT_USER, UPDATE_USER_INFO} from "./actiontype";
import firebase from '../../../config/firebase';
import {APP_LOADED} from "../../../store/asyn/actiontype";

export const openModal = (modalType) => {
    return {
        type: OPEN_MODAL,
        modalType
    }
}
export const closeModal = () => {
    return {
        type: CLOSE_MODAL
    }
}
export const clearCurrentUser = () => {
    return {
        type: CLEAR_CURRENT_USER
    }
}
export const verifyAuth = () => {
    return (dispatch) => {
        return firebase.auth().onAuthStateChanged(user => {
            if (user) {
                dispatch(setCurrentUser(user));
                dispatch({
                    type:APP_LOADED
                })
            } else {
                dispatch(clearCurrentUser())
                dispatch({
                    type:APP_LOADED
                })
            }
        })
    }
}
export const setCurrentUser = (user) => {
    return {
        type: SET_CURRENT_USER,
        user
    }
}
export const updateUser = (values) => {
    return {
        type: UPDATE_USER_INFO,
        values
    }
}