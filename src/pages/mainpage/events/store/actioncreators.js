import {CHANGE_DATE, CHANGE_FILTER, CLEAR_EVENTS, GET_EVENTS, GET_FEEDS, SET_MESSAGE} from "./actiontype";
import {aynscserror, aynscsfinish, aynscstart} from "../../../../store/asyn/actioncreators";
import {dealwithdata, geteventsfromfirestore} from "../../../../firebase/fromfirebase";

export  function fetchData(filter, startDate,limit,last){
    return async (dispatch)=>{
        dispatch(aynscstart());
        try{
            const result= await geteventsfromfirestore(filter,startDate,limit,last).get();
            const lastVisible=result.docs[result.docs.length-1];
            const moreEvents=result.docs.length>=limit;
            const events=result.docs.map(item=>dealwithdata(item));
            dispatch(getEvents(events,moreEvents))
            dispatch(aynscsfinish());
            return lastVisible;
        }catch(error){
            dispatch(aynscserror(error))
        }

    }
}

export const getEvents = (events,moreEvents) => {
    return {
        type: GET_EVENTS,
        events,
        moreEvents
    }
}

export const changeFilter = (filter) => {
    return {
        type: CHANGE_FILTER,
        filter
    }
}

export const changeTime = (date) => {
    return {
        type: CHANGE_DATE,
        date
    }
}

export const getFeeds = (feed) => {
    return {
        type: GET_FEEDS,
        feed
    }
}

export const clearEvents=()=>{
    return {
        type:CLEAR_EVENTS
    }
}
