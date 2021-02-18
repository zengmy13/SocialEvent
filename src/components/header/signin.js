import React from 'react';
import {Button, Menu} from "semantic-ui-react";
import {useDispatch} from "react-redux";
import {openmodal} from "../login/store/actioncreator";

export default function Signin() {
    const dispatch = useDispatch()
    return (
        <>
            <Menu.Item position='right'>
                <Button content='Log in' basic size='small' inverted
                        onClick={() => dispatch(openmodal("Login"))}
                ></Button>
            </Menu.Item>
            <Menu.Item>
                <Button content='Register' basic size='small' inverted
                        onClick={() => dispatch(openmodal("Register"))}
                ></Button>
            </Menu.Item>
        </>
    )
}