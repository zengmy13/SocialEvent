import React from 'react';
import {Container, Menu, Button} from "semantic-ui-react";
import logo from '../../assets/logo.png';
import './style.css';
import Signin from "./signin";
import {NavLink} from "react-router-dom";
import {useSelector} from "react-redux";
import Logout from "./logout";

export default function Header() {
    const {currentuser} = useSelector(state => state.login)
    return (
        <Menu  inverted attached='top' stackable>
            <Container>
                <Menu.Item as={NavLink} to='/events'>
                    <img src={logo} alt='logo' style={{marginRight: 3}}/>
                    First project
                </Menu.Item>
                <Menu.Item as={NavLink} to='/events'>
                    Events
                </Menu.Item>
                {currentuser ? <Menu.Item as={NavLink} to='/create'>
                    <Button color='green'>Create events</Button>
                </Menu.Item> : null}
                {currentuser ? <Logout/> : <Signin/>}
            </Container>
        </Menu>
    );
}