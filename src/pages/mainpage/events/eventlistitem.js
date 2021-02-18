import React from 'react';
import {Segment, Item, Button, List, Icon, Label} from "semantic-ui-react";
import userlogo from '../../../assets/user.png';
import Attendees from "./attendees";
import {format} from 'date-fns';
import {Link} from 'react-router-dom';

export default function Eventlistitem(props) {
    const {event} = props;
    return (
        <>
            <Segment.Group>
                <Segment>
                    <Item.Group>
                        {
                            event.isCancel
                                ? <Label style={{position:"absolute"}} color='red' ribbon='right'>Cancelled</Label>
                                : null
                        }
                        <Item style={{position:"relative"}}>
                            <Item.Image as={Link} to={`/profile/${event.hostUid}`} size='tiny' avatar
                                        src={event.hostURL || userlogo} circular>
                            </Item.Image>
                            <Item.Content>
                                <Item.Header>{event.title}</Item.Header>
                                <Item.Description>Hosted by
                                    <Link to={`/profile/${event.hostUid}`} style={{marginLeft:2}}>
                                        {event.hostname}
                                    </Link>
                                </Item.Description>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>
                <Segment>
                    <Icon name='clock'/>{format(event.date, "dd-MM-yyyy")}
                    <Icon name='marker'/>{event.city.address}
                </Segment>
                <Segment secondary>
                    <List horizontal>
                        {event.attendees.map((attendee) => {
                            return <Attendees key={attendee.id} attendee={attendee}/>
                        })}

                    </List>
                </Segment>
                <Segment clearing>
                    <Item>
                        <Item.Description>
                            {event.description}
                        </Item.Description>
                    </Item>
                    <Button
                        as={Link} to={`/eventdetail/${event.id}`}
                        color='teal' floated='right'>View</Button>
                </Segment>
            </Segment.Group>
        </>
    )
}
