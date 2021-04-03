import React,{useState} from "react";
import {Segment, Button, Image, Item} from "semantic-ui-react";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {cancelPlace, joinEvent} from "../../firebase/fromfirebase";
import {toast} from "react-toastify";
import Anauthmodal from "../../components/login/unauthmodal";

export default function Detailheader(props) {

    const {selectedevent} = props;
    const [loading,setloading]=useState(false);
    const {currentuser} = useSelector(state => state.login);
    const [modalopen,setmodalopen]=useState(false);

    async function handlecancel() {
        setloading(true);
        try {
            await cancelPlace(selectedevent);
            setloading(false);
        } catch (error) {
            toast.error(error.message)
            setloading(false);
        }
    }

    async function handlejoin() {
        setloading(true)
        try {
            await joinEvent(selectedevent);
            setloading(false);
        } catch (error) {
            toast.error(error.message)
            setloading(false);
        }
    }
    function returnbuttons() {
        if ( selectedevent?.hostUid !== currentuser?.uid && selectedevent?.isCancel !== true) {
            if (selectedevent?.attendeesId?.includes(currentuser?.uid)) {
                return <Button content='Cancel the place'
                               basic onClick={ () => handlecancel()}
                ></Button>
            } else {
                return <Button content='Join the event' color='teal' onClick={currentuser?() => handlejoin():()=>setmodalopen(true)}></Button>
            }
        } else {
            return null;
        }
    }
    return (
        <>
            {modalopen && <Anauthmodal setmodalopen={setmodalopen}/>}
        <Segment.Group>
            <Segment style={{position: "relative", padding: 0}}>
                <Image src={`/assets/categoryImages/${selectedevent?.category}.jpg`} fluid/>
                <Segment basic style={{
                    position: "absolute",
                    left: 0, bottom: 0, color: "white"
                }}>
                    <Item>
                        <Item.Header as='h2'>
                            {selectedevent?.title}
                        </Item.Header>
                        <Item.Content>
                            <Item.Extra>Hosted by
                                <Link to={`/profile/${selectedevent.hostUid}`} style={{marginLeft:3}}>
                                    {selectedevent?.hostname}
                                </Link>
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                </Segment>
            </Segment>
            <Segment clearing>
                {returnbuttons()}
                {
                    selectedevent?.hostUid === currentuser?.uid ?
                        <Button as={Link} to={`/manage/${selectedevent?.id}`} content='Manage the event' color='orange'
                                floated='right'
                        /> : null
                }
            </Segment>
        </Segment.Group>
            </>
                )
}