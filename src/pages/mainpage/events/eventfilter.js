import React, {useEffect,Fragment} from "react";
import {Segment, Icon, Header, Menu, Feed} from 'semantic-ui-react';
import {Calendar} from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import {useSelector, useDispatch} from "react-redux";
import {changefilter, changetime, getfeeds} from "./store/actioncreators";
import img from '../../../assets/user.png'
import {getfeedsfromdatabase, toarray} from "../../../firebase/fromfirebase";
import {formatDistanceToNow} from 'date-fns';

export default function Eventfilter(props) {
    const {filter, startdate} = useSelector(state => state.event);
    const dispatch = useDispatch();
    const {feed} = useSelector(state => state.event);
    const {currentuser}=useSelector(state=>state.login);

    useEffect(() => {
        getfeedsfromdatabase().on("value", snapshot => {
            if (!snapshot.exists()) {
                return
            } else {
                const feed = toarray(snapshot.val()).reverse()
                dispatch(getfeeds(feed))
            }
        })
    }, [dispatch])

    return (
         currentuser &&
        <Fragment>
            <Header color='teal' attached>
                <Icon color='teal' name='newspaper'></Icon>
                News
            </Header>
            {
                feed.length>0
                    ? <Segment attached='bottom'>
                        {
                            feed.map((feed, index) => {
                                return <Feed key={feed.id}>
                                    <Feed.Event>
                                        <Feed.Label image={feed.photoURL || img}/>
                                        <Feed.Content>
                                            <Feed.Date>{formatDistanceToNow(feed.time)} ago</Feed.Date>
                                            <Feed.Summary>
                                                <a>{feed.displayName}</a> {feed.code} <a>{feed.title}</a>.
                                            </Feed.Summary>
                                        </Feed.Content>
                                    </Feed.Event>
                                </Feed>
                            })
                        }
                    </Segment>
                    :<Segment attached='bottom' textAlign='center' >
                       <Header as='h4' color='teal'>No news</Header>
                    </Segment>
            }

            <Segment style={{padding: 0}}>
                <Menu vertical fluid>
                    <Header color='teal' attached>
                        <Icon color='teal' name='filter'></Icon>
                        Filter
                    </Header>
                    <Menu.Item
                        active={filter == "all"}
                        onClick={() => dispatch(changefilter("all"))}>
                        All events
                    </Menu.Item>
                    <Menu.Item active={filter == "going"}
                               onClick={() => dispatch(changefilter("going"))}>
                        I'm going
                    </Menu.Item>
                    <Menu.Item active={filter == "hosting"}
                               onClick={() => dispatch(changefilter("hosting"))}>
                        I'm hosting
                    </Menu.Item>
                </Menu>
            </Segment>
        <Segment style={{padding: 0}}>
            <Header as='h4' color='teal' attached>
                <Icon name='calendar' color='teal'></Icon>
                Choose date
            </Header>
            <Calendar
                onChange={(date) => dispatch(changetime(date))}
                value={new Date() || startdate}/>
        </Segment>
        </Fragment>
    )
}

