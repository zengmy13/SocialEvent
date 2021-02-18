import React,{useEffect,useState} from 'react';
import {Container, Grid,Button,Loader} from "semantic-ui-react";
import Eventlist from "./events/eventlist";
import './main.css';
import {useDispatch, useSelector} from "react-redux";
import {clearevents, fetchdata} from "./events/store/actioncreators";
import Eventfilter from "./events/eventfilter";
import Placeholderimage from "./events/eventsplaceholder";


export default function Mainpage(props) {
    const dispatch = useDispatch();
    const {loading} = useSelector(state => state.asyn);
    const [loadinginitial,setloadinginitial]=useState(false);
    const {events,filter,startdate,moreevents} = useSelector(state => state.event);
    const [last,setlast]=useState(null)
    const limit=3;
    useEffect(()=>{
        dispatch(clearevents())
        setloadinginitial(true)
        dispatch(fetchdata(filter,startdate,limit,null)).then((last)=>{
           setlast(last);
           setloadinginitial(false)
       })
        return ()=>dispatch(clearevents());
   },[dispatch,filter,startdate])

    function loadmore(){
       if(!moreevents) return;
        dispatch(fetchdata(filter,startdate,limit,last)).then((last)=>{
            setlast(last)
        })
    }
    return (
        <>
            <Container className='main' attached='bottom'>
                <Grid stackable>
                    <Grid.Column width={10}>
                        {loadinginitial ? <Placeholderimage/> :
                            <Eventlist events={events}
                                       loadmore={loadmore}
                                       loading={loading}
                                       moreevents={moreevents}
                            />
                        }
                    </Grid.Column>
                    <Grid.Column width={6}>
                        <Eventfilter/>
                    </Grid.Column>
                    <Grid.Column width={10}>
                        <Loader active={loading}/>
                    </Grid.Column>
                </Grid>
            </Container>
        </>
    )
}