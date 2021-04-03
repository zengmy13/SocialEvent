import {CHANGE_DATE, CHANGE_FILTER, CLEAR_EVENTS, GET_EVENTS, GET_FEEDS, SET_MESSAGE} from "./actiontype";

const defaultValue = {
    events: [],
    filter: "all",
    startDate: new Date(),
    feed: [],
    moreEvents:true,
}

export const eventReducer = (state = defaultValue, action) => {
    switch (action.type) {
        case GET_EVENTS:
            return {
                ...state,
                events: [...state.events,...action.events],
                moreEvents: action.moreevents
            }
        case CHANGE_FILTER:
            return {
                ...state,
                filter: action.filter
            }
        case CHANGE_DATE:
            return {
                ...state,
                startDate: action.date
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
                moreEvents: true
            }
    }
    return state;
}

