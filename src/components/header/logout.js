import React from 'react';
import {Menu, Image, Dropdown} from "semantic-ui-react";
import userPic from '../../assets/user.png';
import {useSelector, useDispatch} from "react-redux";
import {Link} from 'react-router-dom';
import {signout} from "../../firebase/fromfirebase";
import {clearCurrentUser} from "../login/store/actioncreator";
import {useHistory} from 'react-router-dom';
import {toast} from "react-toastify";

export default function Logout() {
    const history = useHistory();
    const {currentUser} = useSelector(state => state.login);
    const dispatch = useDispatch()
    async function handleLogout() {
        try{
            history.push("/")
            await signout();
            await dispatch(clearCurrentUser());
        }catch(error){
            toast.error(error.message)
        }
    }
    return (
        <Menu.Item position='right'>
            <Image avatar src={currentUser?.photoURL || userPic}/>
            <Dropdown pointing='top left' text={currentUser?.displayName}>
                <Dropdown.Menu>
                    <Dropdown.Item as={Link} to='/create' icon='plus' text='Create events'/>
                    <Dropdown.Item icon='user' text='My profile' as={Link} to={`/profile/${currentUser.uid}`}/>
                    <Dropdown.Item as={Link} to='/account' icon='settings' text='Settings'/>
                    <Dropdown.Item icon='power' text='Log out' onClick={() => handleLogout()}/>
                </Dropdown.Menu>
            </Dropdown>
        </Menu.Item>
    )
}