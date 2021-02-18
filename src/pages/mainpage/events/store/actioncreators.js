import {CHANGE_DATE, CHANGE_FILTER, CLEAR_EVENTS, GET_EVENTS, GET_FEEDS} from "./actiontype";
import {aynscserror, aynscsfinish, aynscstart} from "../../../../store/asyn/actioncreators";
import {dealwithdata, geteventsfromfirestore} from "../../../../firebase/fromfirebase";

export  function fetchdata(filter, startdate,limit,last){
    return async (dispatch)=>{
        dispatch(aynscstart());
        try{
            const result= await geteventsfromfirestore(filter,startdate,limit,last).get();
            const lastvisible=result.docs[result.docs.length-1];
            const moreevents=result.docs.length>=limit;
            const events=result.docs.map(item=>dealwithdata(item));
            dispatch(getevents(events,moreevents))
            dispatch(aynscsfinish());
            return lastvisible;
        }catch(error){
            dispatch(aynscserror(error))
        }

    }
}

export const getevents = (events,moreevents) => {
    return {
        type: GET_EVENTS,
        events,
        moreevents
    }
}

export const changefilter = (filter) => {
    return {
        type: CHANGE_FILTER,
        filter
    }
}

export const changetime = (date) => {
    return {
        type: CHANGE_DATE,
        date
    }
}

export const getfeeds = (feed) => {
    return {
        type: GET_FEEDS,
        feed
    }
}

export const clearevents=()=>{
    return {
        type:CLEAR_EVENTS
    }
}
