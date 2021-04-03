import React from 'react';
import {Image, List} from "semantic-ui-react";
import userLogo from "../../../assets/user.png";
import {Link} from "react-router-dom";

export default function Attendees(props) {
    const {attendee} = props;
    return (
        <>
            <List.Item>
                <Link to={`/profile/${attendee.id}`}>
                    <Image src={attendee.photoURL || userLogo} size='mini' circular/>
                </Link>
            </List.Item>
        </>
    )
}