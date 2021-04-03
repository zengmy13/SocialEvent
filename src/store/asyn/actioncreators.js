import {ASYNC_ERROR, ASYNC_FINISH, ASYNC_START} from "./actiontype";

export const aynscstart = () => {
    return {
        type: ASYNC_START
    }
}

export const aynscsfinish = () => {
    return {
        type: ASYNC_FINISH
    }
}

export const aynscserror = (error) => {
    return {
        type: ASYNC_ERROR,
        error:error
    }
}