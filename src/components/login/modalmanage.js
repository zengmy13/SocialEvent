import React from "react";
import {useSelector} from "react-redux";
import SignInForm from "./signform";
import RegisterForm from "./registerform";

export default function ModalManage() {
    const {modalType} = useSelector(state => state.login);
    let finalModal;
    if (modalType && modalType === "Login") {
        finalModal = <SignInForm/>
    } else if (modalType && modalType === "Register") {
        finalModal = <RegisterForm/>
    }
    return (
        <span>{finalModal}</span>
    )
}