/*global google*/
import React, {useState} from 'react';
import {Segment, Icon, Grid, Button} from 'semantic-ui-react';
import Map from "./map";
import {format} from 'date-fns';


export default function Detailiteminfo(props) {
    const {selectedevent} = props;
    const [openmap, setopenmap] = useState(false);
    return (
        <Segment.Group>
            <Segment>
                <Grid>
                    <Grid.Column width={1}>
                        <Icon name='info' color='teal'></Icon>
                    </Grid.Column>
                    <Grid.Column width={14}>
                        {selectedevent?.description}
                    </Grid.Column>
                </Grid>
            </Segment>
            <Segment>
                <Grid>
                    <Grid.Column width={1}>
                        <Icon name='calendar' color='teal'></Icon>
                    </Grid.Column>
                    <Grid.Column width={14}>
                        {selectedevent?.date && format(selectedevent?.date, "dd/MM/yyyy HH:mm a")}
                    </Grid.Column>
                </Grid>
            </Segment>
            <Segment>
                <Grid>
                    <Grid.Column width={1} verticalAlign='middle'>
                        <Icon name='marker' color='teal'></Icon>
                    </Grid.Column>
                    <Grid.Column width={7}>
                        {`${selectedevent?.city.address}/${selectedevent?.venue.address}`}
                    </Grid.Column>
                    <Grid.Column width={7} verticalAlign='middle'>
                        <Button color='teal' onClick={() => setopenmap(!openmap)}
                                size='small'
                                disabled={selectedevent?.isCancel === true} floated='right'>
                            {openmap ? "Close map" : "Open map"}
                        </Button>
                    </Grid.Column>
                </Grid>
            </Segment>
            {
                openmap && <Segment>
                    <Grid>
                        <Grid.Column width={16}>
                            <Map selectedevent={selectedevent}/>
                        </Grid.Column>
                    </Grid>
                </Segment>
            }
        </Segment.Group>
    )
}