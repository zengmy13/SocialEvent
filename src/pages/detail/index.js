import React from "react";
import {Container, Grid} from "semantic-ui-react";
import DetailItem from "./detailitem";
import AttendeeList from "./attendeelist";
import {selectevent} from "../../firebase/fromfirebase";
import {Usesingaldochook} from "../../hook/firestorehook";
import {getSelectEvent} from "./store/actioncreators";
import {useDispatch, useSelector} from "react-redux";
import LoadingPage from "../loading";
import {Redirect} from 'react-router-dom';

export default function DetailPage(props) {
    const {id} = props.match.params;
    const dispatch = useDispatch();
    const {selectedEvent} = useSelector(state => state.detail);
    const {loading, error} = useSelector(state => state.asyn)
    Usesingaldochook({
        query: selectevent(id),
        data: (data) => dispatch(getSelectEvent(data)),
        deps: [dispatch, id]
    })
    if (loading || (!error && !selectedEvent)) {
        return <LoadingPage></LoadingPage>
    }
    if (error) {
        return <Redirect to='/error'/>
    }
    return (
        <Container style={{marginTop: "5vh"}}>
            <Grid stackable>
                <Grid.Column width={10}>
                    <DetailItem selectedEvent={selectedEvent}/>
                </Grid.Column>
                <Grid.Column width={6}>
                    <AttendeeList selectedEvent={selectedEvent}/>
                </Grid.Column>
            </Grid>
        </Container>
    )
}