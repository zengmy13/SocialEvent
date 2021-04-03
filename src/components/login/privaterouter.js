import React from 'react';
import {useSelector} from "react-redux";
import {Route} from 'react-router-dom';
import AnauthModal from "./unauthmodal";

export default function PrivateRouter(props){
    const {component:Component,prevLocation,...rest}=props;
    const {currentUser}=useSelector(state=>state.login);
    return (
      <Route {...rest} render={(props)=>{
       return  currentUser? <Component {...props}/>:<AnauthModal {...props}/>}}/>
    )
}