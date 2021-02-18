import React from "react";
import {useSelector} from "react-redux";
import Signinform from "./signform";
import Registerform from "./registerform";

export default function Modalmanage() {
    const {modalType} = useSelector(state => state.login);
    let finalmodal;
    if (modalType && modalType === "Login") {
        finalmodal = <Signinform/>
    } else if (modalType && modalType === "Register") {
        finalmodal = <Registerform/>
    }
    return (
        <span>{finalmodal}</span>
    )
}