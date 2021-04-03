import React from 'react';
import {Modal} from "semantic-ui-react";
import {useSelector, useDispatch} from "react-redux";
import {closeModal} from "./store/actioncreator";

export default function ModalWrap(props) {
    const {header, size, children} = props;
    const dispatch = useDispatch()
    const {openModal} = useSelector(state => state.login)
    return (
        <Modal
            size={size}
            open={openModal}
            onClose={() => dispatch(closeModal())}
            onOpen={() => dispatch(openModal())}
        >
            <Modal.Header>{header}</Modal.Header>
            <Modal.Content>
                {children}
            </Modal.Content>
        </Modal>
    )
}