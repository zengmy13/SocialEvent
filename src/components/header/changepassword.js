import React from 'react';
import {Segment, Header, Button, Container, Grid, Label, Divider, Icon} from "semantic-ui-react";
import {Formik, Form} from "formik";
import * as Yup from 'yup';
import TextInput from "../../common/textinput";
import {changepassword} from "../../firebase/fromfirebase";
import { useHistory} from 'react-router-dom';
import {useSelector} from "react-redux";

export default function ChangePassword() {
    const history = useHistory();
    const {currentUser} = useSelector(state => state.login);
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
                            currentUser?.providerId === "google.com" &&
                            <>
                                <p>Please visit Google to change password</p>
                                <Button color='google plus' as="a" href='http://google.com'>
                                    <Icon name='google plus'></Icon>
                                    Go to Google
                                </Button>
                            </>
                        }
                        {
                            currentUser?.providerId === "facebook.com" &&
                            <>
                                <p>Please visit Facebook to change password</p>
                                <Button color='facebook' as='a' href='http://facebook.com'>
                                    <Icon name='facebook'></Icon>
                                    Go to facebook
                                </Button>
                            </>
                        }
                        {
                            currentUser?.providerId === "password" &&
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