import {CLEAR_COMMENT, CLEAR_SELECTED_EVENT, GET_NEW_COMMENT, SELECT_EVENT} from "./actiontype";


const defaultvalue = {
    selectedevent: null,
    comment: null,
}

export const detailreducer = (state = defaultvalue, action) => {
    switch (action.type) {
        case SELECT_EVENT:
            return {
                ...state,
                selectedevent: action.selectedevent
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
                selectedevent:null
            }
    }
    return state;
}