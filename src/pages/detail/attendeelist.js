import React from 'react';
import {Segment, Item} from "semantic-ui-react";
import userPic from "../../assets/user.png";
import {Label} from "semantic-ui-react";
import {Link} from 'react-router-dom';

export default function Attendeelist(props) {
    const {selectedEvent} = props;
    return (
        <>
            <Segment color='teal' textAlign='center' inverted>
                {selectedEvent?.attendees.length && selectedEvent?.attendees.length + " People Going"}
            </Segment>
            <Segment>
                <Item.Group divided>
                    {selectedEvent?.attendees && selectedEvent.attendees.map((attendee, index) => {
                        return <Item as={Link} to={`/profile/${attendee.id}`} key={attendee.id}
                                     style={{color: "black"}}>
                            {
                                selectedEvent?.hostUid === attendee.id
                                    ? <Label ribbon='right' color='blue'
                                             style={{position: "absolute"}}
                                             content='Host'/>
                                    : null
                            }
                            <Item.Image src={attendee.photoURL || userPic} size='mini'/>
                            <Item.Content verticalAlign='middle'>{attendee.name}</Item.Content>
                        </Item>
                    })}
                </Item.Group>
            </Segment>
        </>
    )
}