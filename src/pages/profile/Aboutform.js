import React from 'react';
import {Formik, Form} from "formik";
import TextArea from "../../common/textarea";
import TextInput from "../../common/textinput";
import * as Yup from 'yup'
import {Button} from "semantic-ui-react";
import {updateuserinfo} from "../../firebase/fromfirebase";
import {useDispatch} from "react-redux";
import {updateUser} from "../../components/login/store/actioncreator";
import {toast} from "react-toastify";

export default function AboutForm(props) {
    const {currentUser,setEdit} = props;
    const dispatch = useDispatch()
    const initialValues = {
        displayName: currentUser?.displayName || "",
        description: currentUser?.description || ""
    }
    const validationSchema = Yup.object({
        displayName: Yup.string().required()
    })
    return (
        <Formik initialValues={initialValues} onSubmit={async (values, {setSubmitting}) => {
            try {
                setSubmitting(true)
                await updateuserinfo(values);
                await dispatch(updateUser(values));
                setSubmitting(false);
                setEdit(false);
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