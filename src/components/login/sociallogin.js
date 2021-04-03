import React from "react";
import {Button, Icon} from "semantic-ui-react";
import {loginwithproviders} from "../../firebase/fromfirebase";
import {closeModal} from "./store/actioncreator";
import {useDispatch} from "react-redux";

export default function SocialLogin() {

    const dispatch = useDispatch()

    function handleSocialLogin(provider) {
        loginwithproviders(provider)
        dispatch(closeModal())
    }
    return (
        <>
            <Button color='facebook' fluid style={{margin: "5px 0"}}
                    onClick={() => handleSocialLogin("facebook")}>
                <Icon name='facebook'/> Facebook
            </Button>
            <Button color='google plus' fluid onClick={() => handleSocialLogin("google")}>
                <Icon name='google plus'/> Google
            </Button>
        </>
    )
}
