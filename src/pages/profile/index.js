import React from 'react';
import {Container, Grid, Segment} from "semantic-ui-react";
import ProfileHeader from "./profileheader";
import ProfileTab from "./profiletab";
import {useSelector, useDispatch} from "react-redux";
import {Usesingaldochook} from "../../hook/firestorehook";
import {getprofile} from "../../firebase/fromfirebase";
import {getProfiles} from "./store/actioncreator";

export default function Profile(props) {
    const {currentUser} = useSelector(state => state.login);
    const {id} = props.match.params;
    const dispatch = useDispatch();
    const {profile} = useSelector(state => state.profile);
    const {loading,error}=useSelector(state=>state.asyn)

    Usesingaldochook({
        query: getprofile(id),
        data: (data) => dispatch(getProfiles(data)),
        deps: [dispatch,id]
    })
    return (
        <Container style={{marginTop: "5vh"}}>
            <Segment>
                <Grid>
                    <Grid.Column width={16}>
                        <ProfileHeader currentUser={currentUser} profile={profile} id={id}/>
                    </Grid.Column>
                </Grid>
            </Segment>
            <Grid>
                <Grid.Column width={16}>
                    <ProfileTab currentUser={currentUser} profile={profile}/>
                </Grid.Column>
            </Grid>
        </Container>
    )
}