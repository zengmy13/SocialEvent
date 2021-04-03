import React from "react";
import {Button, Icon} from "semantic-ui-react";
import {loginwithproviders} from "../../firebase/fromfirebase";
import {closemodal} from "./store/actioncreator";
import {useDispatch} from "react-redux";

export default function Sociallogin() {

    const dispatch = useDispatch()

    function handlesociallogin(provider) {
        loginwithproviders(provider)
        dispatch(closemodal())
    }
    return (
        <>
            <Button color='facebook' fluid style={{margin: "5px 0"}}
                    onClick={() => handlesociallogin("facebook")}>
                <Icon name='facebook'/> Facebook
            </Button>
            <Button color='google plus' fluid onClick={() => handlesociallogin("google")}>
                <Icon name='google plus'/> Google
            </Button>
        </>
    )
}
