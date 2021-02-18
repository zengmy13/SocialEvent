import React from 'react';
import {Placeholder, Segment, Button} from "semantic-ui-react";


export default function Placeholderimage() {
    return (
        <>
            <Segment.Group>
                <Segment>
                    <Placeholder fluid>
                        <Placeholder.Header image>
                            <Placeholder.Line/>
                            <Placeholder.Line/>
                        </Placeholder.Header>
                        <Placeholder.Paragraph>
                            <Placeholder.Line/>
                            <Placeholder.Line/>
                            <Placeholder.Line/>
                            <Placeholder.Line/>
                        </Placeholder.Paragraph>
                    </Placeholder>
                </Segment>
                <Segment secondary style={{minHeight: 70}}>
                </Segment>
                <Segment clearing="true">
                    <Button content='view' floated='right' color='blue' disabled></Button>
                </Segment>
            </Segment.Group>
            <Segment.Group>
                <Segment>
                    <Placeholder fluid>
                        <Placeholder.Header image>
                            <Placeholder.Line/>
                            <Placeholder.Line/>
                        </Placeholder.Header>
                        <Placeholder.Paragraph>
                            <Placeholder.Line/>
                            <Placeholder.Line/>
                            <Placeholder.Line/>
                            <Placeholder.Line/>
                        </Placeholder.Paragraph>
                    </Placeholder>
                </Segment>
                <Segment secondary style={{minHeight: 70}}>
                </Segment>
                <Segment clearing="true">
                    <Button content='view' floated='right' color='blue' disabled></Button>
                </Segment>
            </Segment.Group>
        </>
    )
}