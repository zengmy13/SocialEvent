import {CLEAR_CURRENT_USER, CLOSE_MODAL, OPEN_MODAL, SET_CURRENT_USER, UPDATE_USER_INFO} from "./actiontype";
import firebase from '../../../config/firebase';
import {APP_LOADED} from "../../../store/asyn/actiontype";

export const openmodal = (modalType) => {
    return {
        type: OPEN_MODAL,
        modalType
    }
}
export const closemodal = () => {
    return {
        type: CLOSE_MODAL
    }
}
export const clearcurrentuser = () => {
    return {
        type: CLEAR_CURRENT_USER
    }
}
export const verifyauth = () => {
    return (dispatch) => {
        return firebase.auth().onAuthStateChanged(user => {
            if (user) {
                dispatch(setcurrentuser(user));
                dispatch({
                    type:APP_LOADED
                })
            } else {
                dispatch(clearcurrentuser())
                dispatch({
                    type:APP_LOADED
                })
            }
        })
    }
}
export const setcurrentuser = (user) => {
    return {
        type: SET_CURRENT_USER,
        user
    }
}
export const updateuser = (values) => {
    return {
        type: UPDATE_USER_INFO,
        values
    }
}