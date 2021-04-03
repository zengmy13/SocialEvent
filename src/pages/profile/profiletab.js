import React from 'react';
import {Tab} from 'semantic-ui-react';
import AboutTab from "./About";
import DisplayPhoto from "./displayphoto";
import Events from "./events";
import FollowTab from "./followtab";


export default function ProfileTab(props) {
    const {currentUser, profile} = props;
    const panes = [
        {menuItem: 'About', render: () => <AboutTab currentUser={currentUser} profile={profile}/>},
        {menuItem: 'Photos', render: () => <DisplayPhoto profile={profile} currentUser={currentUser}/>},
        {menuItem: 'Events', render: () => <Events profile={profile}/>},
        {menuItem: 'Followings', render: () => <FollowTab activeIndex={3} profile={profile}/>},
        {menuItem: 'Followers', render: () => <FollowTab activeIndex={4} profile={profile}/>},
    ]
    return (
        <Tab menu={{fluid: true, stackable: true}}
             menuPosition='right'
             panes={panes}/>
    )
}