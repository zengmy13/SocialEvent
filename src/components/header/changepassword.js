import React from 'react';
import {Segment, Header, Button, Container, Grid, Label, Divider, Icon} from "semantic-ui-react";
import {Formik, Form} from "formik";
import * as Yup from 'yup';
import TextInput from "../../common/textinput";
import {changepassword} from "../../firebase/fromfirebase";
import {Link, useHistory} from 'react-router-dom';
import {useSelector} from "react-redux";

export default function Changepassword() {
    const history = useHistory();
    const {currentuser} = useSelector(state => state.login);
    const initialValues = {
        password: "",
        confirm: ""
    }
    const validationSchema = Yup.object({
        password: Yup.string().required(),
        confirm: Yup.string().required().oneOf([Yup.ref("password"), null], 'password should be the same')
    })
    return (
        <Container style={{marginTop: "15vh"}}>
            <Grid centered>
                <Grid.Column width={10}>
                    <Segment>
                        <Header as='h2' content='Account'></Header>
                        <Divider/>
                        {
                            currentuser?.providerId === "google.com" &&
                            <>
                                <p>Please visit Google to change password</p>
                                <Button color='google plus' as="a" href='http://google.com'>
                                    <Icon name='google plus'></Icon>
                                    Go to Google
                                </Button>
                            </>
                        }
                        {
                            currentuser?.providerId === "facebook.com" &&
                            <>
                                <p>Please visit Facebook to change password</p>
                                <Button color='facebook' as='a' href='http://facebook.com'>
                                    <Icon name='facebook'></Icon>
                                    Go to facebook
                                </Button>
                            </>
                        }
                        {
                            currentuser?.providerId === "password" &&
                            <>
                                <Header sub content='CHANGE PASSWORD' color='teal'></Header>
                                <p>Please use the form to change password</p>
                                <Formik initialValues={initialValues}
                                        onSubmit={async (values, {setSubmitting, setErrors}) => {
                                            try {
                                                await changepassword(values.confirm);
                                                setSubmitting(false);
                                                history.push('/events');
                                            } catch (error) {
                                                setErrors({
                                                    auth: error.message
                                                })
                                                setSubmitting(false)
                                            }
                                        }}
                                        validationSchema={validationSchema}>
                                    {({isSubmitting, isValid, dirty, errors}) => (
                                        <Form className='ui form'>
                                            <TextInput name='password' type='password' placeholder='password'/>
                                            <TextInput name='confirm' type='password' placeholder='confirm'/>
                                            {errors.auth &&
                                            <Label style={{marginBottom: "5px"}} color='red'
                                                   pointing>{errors.auth}</Label>}
                                                   <br/>
                                            <Button type='submit'
                                                    color='green'
                                                    content='Update password'
                                                    loading={isSubmitting}
                                                    disabled={isSubmitting || !isValid || !dirty}
                                            />
                                        </Form>
                                    )}
                                </Formik>
                            </>
                        }
                    </Segment>
                </Grid.Column>
            </Grid>
        </Container>
    )
}