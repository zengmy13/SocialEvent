import {CLEAR_COMMENT, CLEAR_SELECTED_EVENT, GET_NEW_COMMENT, SELECT_EVENT} from "./actiontype";


const defaultValue = {
    selectedEvent: null,
    comment: null,
}

export const detailReducer = (state = defaultValue, action) => {
    switch (action.type) {
        case SELECT_EVENT:
            return {
                ...state,
                selectedEvent: action.selectedevent
            }
        case GET_NEW_COMMENT:
            return {
                ...state,
                comment: action.comment
            }
        case CLEAR_COMMENT:
            return {
                ...state,
                comment: []
            }
        case CLEAR_SELECTED_EVENT:
            return {
                ...state,
                selectedEvent:null
            }
    }
    return state;
}