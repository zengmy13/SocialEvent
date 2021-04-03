import React,{useState} from 'react';
import {useDispatch,useSelector} from "react-redux";
import {Modal, Button, Divider} from "semantic-ui-react";
import {openModal} from "./store/actioncreator";
import {useHistory} from 'react-router-dom';

export default function AnauthModal(props){
    const {setmodalOpen,history}=props;
    const [open,setOpen]=useState(true);
    const dispatch=useDispatch();
    const {prevLocation}=useSelector(state=>state.login)
    function handleClose(){
        if(!history){
            setOpen(false);
            setmodalOpen(false);
            return;
        }
        if(history && prevLocation){
            history.push(prevLocation.pathname)
        }else{
            history.push("/events")
        }
        setOpen(false);
    }
    function handleOpenModal(modalType){
        dispatch(openModal(modalType));
        setOpen(false);
        // setmodalopen(false);
    }
    return (
        <Modal open={open} size='mini' onClose={handleClose}>
           <Modal.Header>
               You need to sign in to do that
           </Modal.Header>
            <Modal.Content>
                <p>Please either login or register to see the content</p>
                <Button.Group widths={2}>
                    <Button fluid color='teal' content='Login' onClick={()=>handleOpenModal("Login")}></Button>
                    <Button.Or/>
                    <Button fluid color='green' content='Register' onClick={()=>handleOpenModal("Register")}></Button>
                </Button.Group>
                <Divider/>
                <div style={{textAlign:"center"}}>
                    <p>Or click cancel to continue as a guest</p>
                    <Button  content='Cancel' onClick={handleClose}></Button>
                </div>
            </Modal.Content>
        </Modal>
    )
}