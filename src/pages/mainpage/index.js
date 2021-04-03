import React,{useEffect,useState} from 'react';
import {Container, Grid,Loader} from "semantic-ui-react";
import EventList from "./events/eventlist";
import './main.css';
import {useDispatch, useSelector} from "react-redux";
import {clearEvents, fetchData} from "./events/store/actioncreators";
import EventFilter from "./events/eventfilter";
import PlaceholderImage from "./events/eventsplaceholder";


export default function MainPage(props) {
    const dispatch = useDispatch();
    const {loading} = useSelector(state => state.asyn);
    const [loadingInitial,setloadingInitial]=useState(false);
    const {events,filter,startDate,moreEvents} = useSelector(state => state.event);
    const [last,setLast]=useState(null)
    const limit=6;
    useEffect(()=>{
        dispatch(clearEvents())
        setloadingInitial(true)
        dispatch(fetchData(filter,startDate,limit,null)).then((last)=>{
           setLast(last);
           setloadingInitial(false)
       })
        return ()=>dispatch(clearEvents());
   },[dispatch,filter,startDate])

    function loadMore(){
       if(!moreEvents) return;
        dispatch(fetchData(filter,startDate,limit,last)).then((last)=>{
            setLast(last)
        })
    }
    return (
        <>
            <Container className='main' attached='bottom'>
                <Grid stackable>
                    <Grid.Column width={10}>
                        {loadingInitial ? <PlaceholderImage/> :
                            <EventList events={events}
                                       loadmore={loadMore}
                                       loading={loading}
                                       moreevents={moreEvents}
                            />
                        }
                    </Grid.Column>
                    <Grid.Column width={6}>
                        <EventFilter/>
                    </Grid.Column>
                    <Grid.Column width={10}>
                        <Loader active={loading}/>
                    </Grid.Column>
                </Grid>
            </Container>
        </>
    )
}