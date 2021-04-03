/*global google*/
import React, {useState} from 'react';
import {Segment, Icon, Grid, Button} from 'semantic-ui-react';
import Map from "./map";
import {format} from 'date-fns';


export default function DetailItemInfo(props) {
    const {selectedEvent} = props;
    const [openMap, setopenMap] = useState(false);
    return (
        <Segment.Group>
            <Segment>
                <Grid>
                    <Grid.Column width={1}>
                        <Icon name='info' color='teal'></Icon>
                    </Grid.Column>
                    <Grid.Column width={14}>
                        {selectedEvent?.description}
                    </Grid.Column>
                </Grid>
            </Segment>
            <Segment>
                <Grid>
                    <Grid.Column width={1}>
                        <Icon name='calendar' color='teal'></Icon>
                    </Grid.Column>
                    <Grid.Column width={14}>
                        {selectedEvent?.date && format(selectedEvent?.date, "dd/MM/yyyy HH:mm a")}
                    </Grid.Column>
                </Grid>
            </Segment>
            <Segment>
                <Grid>
                    <Grid.Column width={1} verticalAlign='middle'>
                        <Icon name='marker' color='teal'></Icon>
                    </Grid.Column>
                    <Grid.Column width={7}>
                        {`${selectedEvent?.city.address}/${selectedEvent?.venue.address}`}
                    </Grid.Column>
                    <Grid.Column width={7} verticalAlign='middle'>
                        <Button color='teal' onClick={() => setopenMap(!openMap)}
                                size='small'
                                disabled={selectedEvent?.isCancel === true} floated='right'>
                            {openMap ? "Close map" : "Open map"}
                        </Button>
                    </Grid.Column>
                </Grid>
            </Segment>
            {
                openMap && <Segment>
                    <Grid>
                        <Grid.Column width={16}>
                            <Map selectedEvent={selectedEvent}/>
                        </Grid.Column>
                    </Grid>
                </Segment>
            }
        </Segment.Group>
    )
}