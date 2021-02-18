import React from 'react';
import {Menu, Image, Dropdown} from "semantic-ui-react";
import userpic from '../../assets/user.png';
import {useSelector, useDispatch} from "react-redux";
import {Link} from 'react-router-dom';
import {signout} from "../../firebase/fromfirebase";
import {clearcurrentuser} from "../login/store/actioncreator";
import {useHistory} from 'react-router-dom';
import {toast} from "react-toastify";

export default function Logout() {
    const history = useHistory();
    const {currentuser} = useSelector(state => state.login);
    const dispatch = useDispatch()
    async function handlelogout() {
        try{
            history.push("/")
            await signout();
            await dispatch(clearcurrentuser());
        }catch(error){
            toast.error(error.message)
        }
    }
    return (
        <Menu.Item position='right'>
            <Image avatar src={currentuser?.photoURL || userpic}/>
            <Dropdown pointing='top left' text={currentuser?.displayName}>
                <Dropdown.Menu>
                    <Dropdown.Item as={Link} to='/create' icon='plus' text='Create events'/>
                    <Dropdown.Item icon='user' text='My profile' as={Link} to={`/profile/${currentuser.uid}`}/>
                    <Dropdown.Item as={Link} to='/account' icon='settings' text='Settings'/>
                    <Dropdown.Item icon='power' text='Log out' onClick={() => handlelogout()}/>
                </Dropdown.Menu>
            </Dropdown>
        </Menu.Item>
    )
}