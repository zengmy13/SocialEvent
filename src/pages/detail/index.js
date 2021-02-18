import React from "react";
import {Container, Grid} from "semantic-ui-react";
import Detailitem from "./detailitem";
import Attendeelist from "./attendeelist";
import {selectevent} from "../../firebase/fromfirebase";
import {Usesingaldochook} from "../../hook/firestorehook";
import {getselectevent} from "./store/actioncreators";
import {useDispatch, useSelector} from "react-redux";
import Loadingpage from "../loading";
import {Redirect} from 'react-router-dom';

export default function Detailpage(props) {
    const {id} = props.match.params;
    const dispatch = useDispatch();
    const {selectedevent} = useSelector(state => state.detail);
    const {loading, error} = useSelector(state => state.asyn)
    Usesingaldochook({
        query: selectevent(id),
        data: (data) => dispatch(getselectevent(data)),
        deps: [dispatch, id]
    })
    if (loading || (!error && !selectedevent)) {
        return <Loadingpage></Loadingpage>
    }
    if (error) {
        return <Redirect to='/error'/>
    }
    return (
        <Container style={{marginTop: "5vh"}}>
            <Grid stackable>
                <Grid.Column width={10}>
                    <Detailitem selectedevent={selectedevent}/>
                </Grid.Column>
                <Grid.Column width={6}>
                    <Attendeelist selectedevent={selectedevent}/>
                </Grid.Column>
            </Grid>
        </Container>
    )
}