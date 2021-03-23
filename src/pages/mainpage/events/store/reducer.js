import {CHANGE_DATE, CHANGE_FILTER, CLEAR_EVENTS, GET_EVENTS, GET_FEEDS, SET_MESSAGE} from "./actiontype";

const defaultvalue = {
    events: [],
    filter: "all",
    startdate: new Date(),
    feed: [],
    moreevents:true,
}

export const eventreducer = (state = defaultvalue, action) => {
    switch (action.type) {
        case GET_EVENTS:
            return {
                ...state,
                events: [...state.events,...action.events],
                moreevents: action.moreevents
            }
        case CHANGE_FILTER:
            return {
                ...state,
                filter: action.filter
            }
        case CHANGE_DATE:
            return {
                ...state,
                startdate: action.date
            }
        case GET_FEEDS:
            return {
                ...state,
                feed: action.feed
            }
        case CLEAR_EVENTS:
            return {
                ...state,
                events:[],
                moreevents: true
            }
    }
    return state;
}

