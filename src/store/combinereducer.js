import React from 'react';
import {combineReducers} from "redux";
import {connectRouter} from "connected-react-router";
import {asynReducer} from "./asyn/reducer";
import {eventReducer} from "../pages/mainpage/events/store/reducer";
import {detailReducer} from "../pages/detail/store/reducer";
import {loginReducer} from "../components/login/store/reducer";
import {profileReducer} from "../pages/profile/store/reducer";


export const reducer =(history)=> combineReducers({
    router: connectRouter(history),
    asyn: asynReducer,
    event: eventReducer,
    detail: detailReducer,
    login: loginReducer,
    profile: profileReducer
})