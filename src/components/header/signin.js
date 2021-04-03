import React from 'react';
import {Button, Menu} from "semantic-ui-react";
import {useDispatch} from "react-redux";
import {openModal} from "../login/store/actioncreator";

export default function SignIn() {
    const dispatch = useDispatch()
    return (
        <>
            <Menu.Item position='right'>
                <Button content='Log in' basic size='small' inverted
                        onClick={() => dispatch(openModal("Login"))}
                ></Button>
            </Menu.Item>
            <Menu.Item>
                <Button content='Register' basic size='small' inverted
                        onClick={() => dispatch(openModal("Register"))}
                ></Button>
            </Menu.Item>
        </>
    )
}