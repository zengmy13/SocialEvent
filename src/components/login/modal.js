import React from 'react';
import {Modal} from "semantic-ui-react";
import {useSelector, useDispatch} from "react-redux";
import {closemodal} from "./store/actioncreator";

export default function ModalWrap(props) {
    const {header, size, children} = props;
    const dispatch = useDispatch()
    const {openmodal} = useSelector(state => state.login)
    return (
        <Modal
            size={size}
            open={openmodal}
            onClose={() => dispatch(closemodal())}
            onOpen={() => dispatch(openmodal())}
        >
            <Modal.Header>{header}</Modal.Header>
            <Modal.Content>
                {children}
            </Modal.Content>
        </Modal>
    )
}