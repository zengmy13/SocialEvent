import React from 'react';
import {Formik, Form} from "formik";
import TextArea from "../../common/textarea";
import TextInput from "../../common/textinput";
import * as Yup from 'yup'
import {Button} from "semantic-ui-react";
import {updateUserInfo} from "../../firebase/fromfirebase";
import {useDispatch} from "react-redux";
import {updateuser} from "../../components/login/store/actioncreator";
import {toast} from "react-toastify";

export default function Aboutform(props) {
    const {currentuser,setedit} = props;
    const dispatch = useDispatch()
    const initialValues = {
        displayName: currentuser?.displayName || "",
        description: currentuser?.description || ""
    }
    const validationSchema = Yup.object({
        displayName: Yup.string().required()
    })
    return (
        <Formik initialValues={initialValues} onSubmit={async (values, {setSubmitting}) => {
            try {
                setSubmitting(true)
                await updateUserInfo(values);
                await dispatch(updateuser(values));
                setSubmitting(false);
                setedit(false);
            } catch (error) {
                toast.error(error.message)
                setSubmitting(false)
            }
        }} validationSchema={validationSchema}>
            {
                ({isSubmitting, isValid, dirty}) => (
                    <Form className='form ui'>
                        <TextInput name='displayName'/>
                        <TextArea name='description' rows={5}/>
                        <Button
                            loading={isSubmitting}
                            disabled={!isValid || !dirty || isSubmitting}
                            floated='right'
                            color='green'
                            type='submit'>
                            Update
                        </Button>
                    </Form>
                )
            }
        </Formik>
    )
}