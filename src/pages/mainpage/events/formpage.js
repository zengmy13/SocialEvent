import React from 'react';
import Eventform from "./eventform";
import {Container, Grid} from "semantic-ui-react";

export default function Formpage(props) {

    const {selectedid} = props.match.params;
    return (
        <>
            <Container className='formcontainer'>
                <Grid centered>
                    <Grid.Column width={10}>
                        <Eventform selectedid={selectedid}/>
                    </Grid.Column>
                </Grid>
            </Container>
        </>
    )
}