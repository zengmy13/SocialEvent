import React, {useState} from 'react';
import {Grid, Header, Tab, Card, Image} from "semantic-ui-react";
import {Usedocshook} from "../../hook/firestorehook";
import {getusereventstab} from "../../firebase/fromfirebase";
import {useDispatch, useSelector} from "react-redux";
import {geteventstab} from "./store/actioncreator";
import logodrinks from '../../assets/categoryImages/drinks.jpg';
import {format} from 'date-fns';
import Loadingpage from "../loading";


export default function Events(props) {
    const [key, setkey] = useState(0);
    const {profile}=props;
    const dispatch = useDispatch();
    const {eventstab} = useSelector(state => state.profile);
    const {loading} = useSelector(state => state.asyn);
    const panes = [
        {menuItem: 'Future events', pane: {key: "future"}},
        {menuItem: 'Past events', pane: {key: "past"}},
        {menuItem: 'Hosting', pane: {key: "host"}}
    ]

    Usedocshook({
        query: getusereventstab(key,profile),
        data: (data) => dispatch(geteventstab(data)),
        deps: [key, dispatch]
    })

    return (
        <Tab.Pane>
            <Grid>
                <Grid.Column width={16}>
                    <Header size='small' icon='calendar' content={`Events`}/>
                </Grid.Column>
                <Grid.Column width={16}>
                    <Tab
                        activeIndex={key}
                        onTabChange={(e, data) =>
                            setkey(data.activeIndex)}
                        menu={{secondary: true, pointing: true, stackable: true}} panes={panes}/>
                    {
                        loading ? <Loadingpage content='loading....'/> :
                            <Card.Group itemsPerRow={5} style={{marginTop: "20PX"}} stackable>
                                {
                                    eventstab.map((eventtab, index) => {
                                        return <Card key={eventtab.id}>
                                            <Image src={logodrinks}
                                                   style={{minHeight: 100, objectFit: "cover"}}/>
                                            <Card.Content textAlign='center'>
                                                <Header as='h6'>{eventtab.title}</Header>
                                                <p>{format(eventtab.date, "dd-MM-yyyy")}</p>
                                                <p>{format(eventtab.date, "HH:mm")}</p>
                                            </Card.Content>
                                        </Card>
                                    })
                                }
                            </Card.Group>
                    }
                </Grid.Column>
            </Grid>
        </Tab.Pane>
    )
}