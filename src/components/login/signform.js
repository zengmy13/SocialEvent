import React from 'react';
import ModalWrap from "./modal";
import {Formik, Form} from "formik";
import {Button, Label, Divider} from "semantic-ui-react";
import TextInput from "../../common/textinput";
import * as Yup from 'yup';
import {signInWithEmailAndPassword} from "../../firebase/fromfirebase";
import {useDispatch} from "react-redux";
import {closemodal} from "./store/actioncreator";
import Sociallogin from "./sociallogin";


export default function Signinform() {
    const dispatch = useDispatch()
    const validationSchema = Yup.object({
        email: Yup.string().required().email(),
        password: Yup.string().required()
    })
    const initialValues = {
        email: "",
        password: ""
    }
    return (
        <ModalWrap size='mini' header='Log in'>
            <Formik initialValues={initialValues} onSubmit={async (values, {setSubmitting, setErrors}) => {
                try {
                    await signInWithEmailAndPassword(values);
                    await dispatch(closemodal())
                    setSubmitting(false);
                } catch (error) {
                    setErrors({
                        auth: "something wrong with email or password"
                    })
                    setSubmitting(false)
                }
            }} validationSchema={validationSchema}>
                {
                    ({isValid, isSubmitting, dirty, errors}) => (
                        <Form className='ui form'>
                            <TextInput name='email' placeholder='email'/>
                            <TextInput type='password' name='password' placeholder='password'/>
                            {errors.auth ? <Label color='red' pointing style={{
                                marginTop: "-5px",
                                marginBottom: "10px"
                            }}>{errors.auth}</Label> : null}
                            <Button content='Log in' color='teal'
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