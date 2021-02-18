import React from 'react';
import {useSelector} from "react-redux";
import {Route} from 'react-router-dom';
import Anauthmodal from "./unauthmodal";

export default function Privaterouter(props){
    const {component:Component,prevlocation,...rest}=props;
    const {currentuser}=useSelector(state=>state.login);
    return (
      <Route {...rest} render={(props)=>{
       return  currentuser? <Component {...props}/>:<Anauthmodal {...props}/>}}/>
    )
}