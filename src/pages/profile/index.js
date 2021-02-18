import React from 'react';
import {Container, Grid, Segment} from "semantic-ui-react";
import Profileheader from "./profileheader";
import Profiletab from "./profiletab";
import {useSelector, useDispatch} from "react-redux";
import {Usesingaldochook} from "../../hook/firestorehook";
import {getprofile} from "../../firebase/fromfirebase";
import {getprofiles} from "./store/actioncreator";
import Loadingpage from "../loading";

export default function Profile(props) {
    const {currentuser} = useSelector(state => state.login);
    const {id} = props.match.params;
    const dispatch = useDispatch();
    const {profile} = useSelector(state => state.profile);
    const {loading,error}=useSelector(state=>state.asyn)

    Usesingaldochook({
        query: getprofile(id),
        data: (data) => dispatch(getprofiles(data)),
        deps: [dispatch, id]
    })
    return (
        <Container style={{marginTop: "5vh"}}>
            <Segment>
                <Grid>
                    <Grid.Column width={16}>
                        <Profileheader currentuser={currentuser} profile={profile}/>
                    </Grid.Column>
                </Grid>
            </Segment>
            <Grid>
                <Grid.Column width={16}>
                    <Profiletab currentuser={currentuser} profile={profile}/>
                </Grid.Column>
            </Grid>
        </Container>
    )
}