import React from 'react';
import EventForm from "./eventform";
import {Container, Grid} from "semantic-ui-react";

export default function FormPage(props) {

    const {selectedId} = props.match.params;
    return (
        <>
            <Container className='formcontainer'>
                <Grid centered>
                    <Grid.Column width={10}>
                        <EventForm selectedId={selectedId}/>
                    </Grid.Column>
                </Grid>
            </Container>
        </>
    )
}