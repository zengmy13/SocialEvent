import React from 'react';
import {Segment, Header, Button} from "semantic-ui-react";
import {useSelector} from "react-redux";
import {Link} from 'react-router-dom';

export default function Errorpage() {
    const {error} = useSelector(state => state.asyn);
    return (
        <Segment placeholder>
            <Header textAlign='center' content={error?.message || "We have an error"}/>
            <Button as={Link} to='/events'
                    primary
                    style={{marginTop: 20}}
                    content='Return to events page'
            ></Button>
        </Segment>
    )
}