import React, {useState} from 'react';
import {Button, Tab} from "semantic-ui-react";
import {Grid, Header} from "semantic-ui-react";
import Aboutform from "./Aboutform";
import {format,parseISO} from 'date-fns';
import formpage from "../mainpage/events/formpage";


export default function Abouttab(props) {
    const {currentuser, profile} = props;
    const [edit, setedit] = useState(false);
    return (
        <Tab.Pane>
            <Grid>
                <Grid.Column width={16} clearing>
                    <Header size='small' floated='left' icon='user' content={`ABOUT ${profile?.displayName}`}/>
                    {
                        currentuser?.uid===profile?.id?  <Button basic floated='right' onClick={() => setedit(!edit)}>
                            {edit ? "Cancel" : "Edit"}
                        </Button>:null
                    }

                </Grid.Column>
                <Grid.Column width={16}>
                    {
                        edit ? <Aboutform currentuser={currentuser} profile={profile} setedit={setedit}/> :
                            (<div>
                                {profile?.createdAt && <strong>Member since: {format(profile?.createdAt,"dd-MM-yyyy")}
                                </strong>}
                                <p style={{marginTop: 20}}>{profile?.description || null}</p>
                            </div>)
                    }
                </Grid.Column>
            </Grid>
        </Tab.Pane>
    )
}