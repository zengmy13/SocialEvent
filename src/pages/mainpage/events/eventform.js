/*global google*/
import React, {useState,useEffect} from 'react';
import {Formik, Form} from 'formik';
import * as Yup from 'yup';
import {Button, Header, Segment, Grid} from "semantic-ui-react";
import TextInput from "../../../common/textinput";
import TextArea from "../../../common/textarea";
import {useHistory} from 'react-router-dom';
import SelectInput from "../../../common/selectinput";
import DateInput from "../../../common/dateinput";
import {Link,useLocation,Redirect} from 'react-router-dom';
import {Confirm} from "semantic-ui-react";
import {addneweventtofirestore, deleteeventfromfirestore, getspecificeventfromfirestore, updateselectedevent} from "../../../firebase/fromfirebase";
import {useDispatch, useSelector} from "react-redux";
import {Usesingaldochook} from "../../../hook/firestorehook";
import {clearSelectedEvent, getSelectEvent} from "../../detail/store/actioncreators";
import PlaceInput from "../../../common/placeInput";
import LoadingPage from "../../loading";
import {toast} from "react-toastify";


export default function EventForm(props) {
    const history = useHistory();
    const {selectedId} = props;
    const location=useLocation();
    const dispatch = useDispatch();
    const {selectedEvent} = useSelector(state => state.detail)
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const {loading,error}=useSelector(state=>state.asyn);

    useEffect(()=>{
        if(location.pathname!=="/create") return;
        dispatch(clearSelectedEvent());
    },[location.pathname,dispatch]);

    Usesingaldochook({
        shouldExecute: selectedId!==selectedEvent?.id && location.pathname!=='/create',
        query: getspecificeventfromfirestore(selectedId),
        data: (data) => dispatch(getSelectEvent(data)),
        deps: [dispatch, selectedId]
    })
    if(loading) return <LoadingPage/>;
    if(error) {
        return <Redirect to='/events'></Redirect>
    }
    const initialValues = selectedEvent || {
        title: '',
        description: "",
        date: "",
        city: {
            address: "",
            latLng: null
        },
        venue: {
            address: "",
            latLng: null
        },
        category: ""
    }
    const validationSchema = Yup.object({
        title: Yup.string().required(),
        description: Yup.string().required(),
        date: Yup.string().required(),
        city: Yup.object().shape({
            address: Yup.string().required("city is required")
        }),
        venue: Yup.object().shape({
            address: Yup.string().required("venue is required")
        }),
        category: Yup.string().required()
    })

    async function handleConfirm(selectedEvent) {
        try {
            setConfirmOpen(false);
            setConfirmLoading(true);
            await deleteeventfromfirestore(selectedEvent);
            setConfirmLoading(false);
        } catch (error) {
            toast.error(error.message)
            setConfirmOpen(false);
            setConfirmLoading(false);
        }
        setConfirmOpen(false);
    }

    return (
        <Segment clearing>
            <Formik
                enableReinitialize
                initialValues={initialValues} onSubmit={async (values, {setSubmitting}) => {
                try {
                    selectedEvent ? updateselectedevent(values)
                        : await addneweventtofirestore(values)
                    setSubmitting(false);
                    history.push("/events");
                } catch (error) {
                    setSubmitting(false);
                }
            }} validationSchema={validationSchema}>
                {
                    ({dirty, isSubmitting, isValid, values}) => (
                        <Form className='ui form' clearing>
                            <Header content={selectedEvent ? selectedEvent.title : "Create events"}></Header>
                            <TextInput name='title' placeholder='title'/>
                            <SelectInput name='category' placeholder='category'/>
                            <TextArea name='description' placeholder='description' rows={3}/>
                            <PlaceInput name='city' placeholder='city'/>
                            <PlaceInput name='venue' placeholder='venue'
                                        disabled={!values.city.address}
                                        options={{
                                            location: new google.maps.LatLng(values.city.latLng),
                                            radius: 1000,
                                            types: ['address']
                                        }}/>
                            <DateInput name='date' placeholder='date'/>
                            <Grid stackable>
                                <Grid.Column width={8}>
                                    {
                                        selectedEvent && <Button
                                            size='small'
                                            loading={confirmLoading}
                                            type='button'
                                            floated='left'
                                            color={selectedEvent?.isCancel ? "orange" : "red"}
                                            content={selectedEvent?.isCancel ? "Reorganize the event" : "Cancel the event"}
                                            onClick={() => setConfirmOpen(true)}/>
                                    }
                                </Grid.Column>
                                <Grid.Column width={8} textAlign='center'>
                                    <Button size='small'
                                            basic
                                            type='submit'
                                            content='Cancel'
                                            as={Link} to='/events'/>
                                    <Button size='small' color='green'
                                            type='submit' content='Submit'
                                            style={{marginBottom: 4}}
                                            loading={isSubmitting}
                                            disabled={!isValid || !dirty || isSubmitting}/>
                                </Grid.Column>
                            </Grid>
                        </Form>
                    )
                }
            </Formik>
            <Confirm
                open={confirmOpen}
                onCancel={() => setConfirmOpen(false)}
                content={selectedEvent?.isCancel ?  "Are you sure to reorganize":"Are you sure to cancel"}
                onConfirm={() => handleConfirm(selectedEvent)}/>
        </Segment>
    )
}