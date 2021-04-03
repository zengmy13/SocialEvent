import {APP_LOADED, ASYNC_ERROR, ASYNC_FINISH, ASYNC_START} from "./actiontype";

const defaultValue = {
    loading: false,
    error: null,
    initial:false
}

export const asynReducer = (state = defaultValue, action) => {
    switch (action.type) {
        case ASYNC_START:
            return {
                ...state,
                loading: true
            }
        case ASYNC_FINISH:
            return {
                ...state,
                loading: false
            }
        case ASYNC_ERROR:
            return {
                ...state,
                error: action.error
            }
        case APP_LOADED:
            return {
                ...state,
                initial: true
            }
    }
    return state;
}