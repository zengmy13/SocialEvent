import React from 'react';
import ModalWrap from "./modal";
import {Formik, Form} from "formik";
import {Button, Label, Divider} from "semantic-ui-react";
import TextInput from "../../common/textinput";
import * as Yup from 'yup';
import {createNewUserInFirebase} from "../../firebase/fromfirebase";
import {useDispatch} from "react-redux";
import {closemodal} from "./store/actioncreator";
import Sociallogin from "./sociallogin";


export default function Registerform() {
    const dispatch = useDispatch()
    const validationSchema = Yup.object({
        displayName: Yup.string().required(),
        email: Yup.string().required().email(),
        password: Yup.string().required()
    })
    const initialValues = {
        email: "",
        password: "",
        displayName: ""
    }
    return (
        <ModalWrap size='mini' header='Register'>
            <Formik initialValues={initialValues}
                    onSubmit={async (values, {setSubmitting, setErrors}) => {
                        try {
                            await createNewUserInFirebase(values);
                            await dispatch(closemodal())
                            setSubmitting(false);
                        } catch (error) {
                            setErrors({
                                auth: "something wrong with Register"
                            })
                            setSubmitting(false)
                        }
                    }} validationSchema={validationSchema}>
                {
                    ({isValid, isSubmitting, dirty, errors}) => (
                        <Form className='ui form'>
                            <TextInput name='displayName' placeholder='name'/>
                            <TextInput name='email' placeholder='email'/>
                            <TextInput type='password' name='password' placeholder='password'/>
                            {errors.auth ? <Label color='red' pointing style={{
                                marginTop: "-5px",
                                marginBottom: "10px"
                            }}>{errors.auth}</Label> : null}
                            <Button content='Register' color='teal'
                                    type='submit'
                                    fluid
                                    loading={isSubmitting}
                                    disabled={!dirty || isSubmitting || !isValid}
                            ></Button>
                        </Form>
                    )
                }
            </Formik>
            <Divider horizontal>Or</Divider>
            <Sociallogin/>
        </ModalWrap>
    )
}