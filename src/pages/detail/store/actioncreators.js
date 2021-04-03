import {CLEAR_COMMENT, CLEAR_SELECTED_EVENT, GET_NEW_COMMENT, SELECT_EVENT} from "./actiontype";

export const getSelectEvent = (selectedevent) => {
    return {
        type: SELECT_EVENT,
        selectedevent
    }
}
export const getNewComment = (comment) => {
    return {
        type: GET_NEW_COMMENT,
        comment
    }
}

export const clearComment = () => {
    return {
        type: CLEAR_COMMENT
    }
}

export const clearSelectedEvent=()=>{
    return {
        type:CLEAR_SELECTED_EVENT
    }
}

