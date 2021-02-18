import {CLEAR_COMMENT, CLEAR_SELECTED_EVENT, GET_NEW_COMMENT, SELECT_EVENT} from "./actiontype";

export const getselectevent = (selectedevent) => {
    return {
        type: SELECT_EVENT,
        selectedevent
    }
}
export const getnewcomment = (comment) => {
    return {
        type: GET_NEW_COMMENT,
        comment
    }
}

export const clearcomment = () => {
    return {
        type: CLEAR_COMMENT
    }
}

export const clearselectedevent=()=>{
    return {
        type:CLEAR_SELECTED_EVENT
    }
}

