import React, {useState} from 'react';
import {Button, Tab} from "semantic-ui-react";
import {Grid, Header} from "semantic-ui-react";
import AboutForm from "./Aboutform";
import {format} from 'date-fns';
import formPage from "../mainpage/events/formpage";


export default function AboutTab(props) {
    const {currentUser, profile} = props;
    const [edit, setEdit] = useState(false);
    return (
        <Tab.Pane>
            <Grid>
                <Grid.Column width={16} clearing>
                    <Header size='small' floated='left' icon='user' content={`ABOUT ${profile?.displayName}`}/>
                    {
                        currentUser?.uid===profile?.id?  <Button basic floated='right' onClick={() => setEdit(!edit)}>
                            {edit ? "Cancel" : "Edit"}
                        </Button>:null
                    }

                </Grid.Column>
                <Grid.Column width={16}>
                    {
                        edit ? <AboutForm currentUser={currentUser} profile={profile} setEdit={setEdit}/> :
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