import React,{useState} from 'react';
import {useDispatch,useSelector} from "react-redux";
import {Modal, Button, Divider} from "semantic-ui-react";
import {openmodal} from "./store/actioncreator";
import {useHistory} from 'react-router-dom';

export default function Anauthmodal(props){
    const {setmodalopen,history}=props;
    const [open,setopen]=useState(true);
    const dispatch=useDispatch();
    const {prevlocation}=useSelector(state=>state.login)
    function handleclose(){
        if(!history){
            setopen(false);
            setmodalopen(false);
            return;
        }
        if(history && prevlocation){
            history.push(prevlocation.pathname)
        }else{
            history.push("/events")
        }
        setopen(false);
    }
    function handleopenmodal(modalType){
        dispatch(openmodal(modalType));
        setopen(false);
        setmodalopen(false);

    }
    return (
        <Modal open={open} size='mini' onClose={handleclose}>
           <Modal.Header>
               You need to sign in to do that
           </Modal.Header>
            <Modal.Content>
                <p>Please either login or register to see the content</p>
                <Button.Group widths={2}>
                    <Button fluid color='teal' content='Login' onClick={()=>handleopenmodal("Login")}></Button>
                    <Button.Or/>
                    <Button fluid color='green' content='Register' onClick={()=>handleopenmodal("Register")}></Button>
                </Button.Group>
                <Divider/>
                <div style={{textAlign:"center"}}>
                    <p>Or click cancel to continue as a guest</p>
                    <Button  content='Cancel' onClick={handleclose}></Button>
                </div>
            </Modal.Content>
        </Modal>
    )
}