import React,{useState} from "react";
import {Segment, Button, Image, Item} from "semantic-ui-react";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {cancelplace, jointheevent} from "../../firebase/fromfirebase";
import {toast} from "react-toastify";
import AnauthModal from "../../components/login/unauthmodal";

export default function DetailHeader(props) {

    const {selectedEvent} = props;
    const [loading,setLoading]=useState(false);
    const {currentUser} = useSelector(state => state.login);
    const [modalOpen,setmodalOpen]=useState(false);

    async function handleCancel() {
        setLoading(true);
        try {
            await cancelplace(selectedEvent);
            setLoading(false);
        } catch (error) {
            toast.error(error.message)
            setLoading(false);
        }
    }

    async function handleJoin() {
        setLoading(true)
        try {
            await jointheevent(selectedEvent);
            setLoading(false);
        } catch (error) {
            toast.error(error.message)
            setLoading(false);
        }
    }
    function returnButtons() {
        if ( selectedEvent?.hostUid !== currentUser?.uid && selectedEvent?.isCancel !== true) {
            if (selectedEvent?.attendeesId?.includes(currentUser?.uid)) {
                return <Button content='Cancel the place'
                               basic onClick={ () => handleCancel()}
                ></Button>
            } else {
                return <Button content='Join the event' color='teal' onClick={currentUser?() => handleJoin():()=>setmodalOpen(true)}></Button>
            }
        } else {
            return null;
        }
    }
    return (
        <>
            {modalOpen && <AnauthModal setmodalOpen={setmodalOpen}/>}
        <Segment.Group>
            <Segment style={{position: "relative", padding: 0}}>
                <Image src={`/assets/categoryImages/${selectedEvent?.category}.jpg`} fluid/>
                <Segment basic style={{
                    position: "absolute",
                    left: 0, bottom: 0, color: "white"
                }}>
                    <Item>
                        <Item.Header as='h2'>
                            {selectedEvent?.title}
                        </Item.Header>
                        <Item.Content>
                            <Item.Extra>Hosted by
                                <Link to={`/profile/${selectedEvent.hostUid}`} style={{marginLeft:3}}>
                                    {selectedEvent?.hostname}
                                </Link>
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                </Segment>
            </Segment>
            <Segment clearing>
                {returnButtons()}
                {
                    selectedEvent?.hostUid === currentUser?.uid ?
                        <Button as={Link} to={`/manage/${selectedEvent?.id}`} content='Manage the event' color='orange'
                                floated='right'
                        /> : null
                }
            </Segment>
        </Segment.Group>
            </>
                )
}