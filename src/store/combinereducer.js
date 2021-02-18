import React from 'react';
import {combineReducers} from "redux";
import {connectRouter} from "connected-react-router";
import {asynreducer} from "./asyn/reducer";
import {eventreducer} from "../pages/mainpage/events/store/reducer";
import {detailreducer} from "../pages/detail/store/reducer";
import {loginreducer} from "../components/login/store/reducer";
import {profilereducer} from "../pages/profile/store/reducer";


export const reducer =(history)=> combineReducers({
    router: connectRouter(history),
    asyn: asynreducer,
    event: eventreducer,
    detail: detailreducer,
    login: loginreducer,
    profile: profilereducer
})