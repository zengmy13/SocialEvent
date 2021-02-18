import React from 'react';
import {Tab} from 'semantic-ui-react';
import Abouttab from "./About";
import Displayphoto from "./displayphoto";
import Events from "./events";
import Followtab from "./followtab";


export default function Profiletab(props) {
    const {currentuser, profile} = props;
    const panes = [
        {menuItem: 'About', render: () => <Abouttab currentuser={currentuser} profile={profile}/>},
        {menuItem: 'Photos', render: () => <Displayphoto profile={profile} currentuser={currentuser}/>},
        {menuItem: 'Events', render: () => <Events profile={profile}/>},
        {menuItem: 'Followings', render: () => <Followtab activeIndex={3} profile={profile}/>},
        {menuItem: 'Followers', render: () => <Followtab activeIndex={4} profile={profile}/>},
    ]
    return (
        <Tab menu={{fluid: true, stackable: true}}
             menuPosition='right'
             panes={panes}/>
    )
}