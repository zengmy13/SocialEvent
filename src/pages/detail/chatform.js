import React from 'react';
import {Formik, Field, Form} from "formik";
import * as Yup from 'yup';
import {addCommentToFirebase} from "../../firebase/fromfirebase";


export default function Chartform(props) {
    const {id, parentId, closeform} = props;
    const initialValues = {
        comment: ""
    }
    const validationSchema = Yup.object({
        comment: Yup.string().required()
    })
    return (
        <Formik initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={async (values, {setSubmitting, resetForm}) => {
                    try {
                        setSubmitting(true);
                        await addCommentToFirebase(id, values, parentId)
                        resetForm();
                        setSubmitting(false);
                        closeform();
                    } catch (error) {
                        setSubmitting(false)
                    }
                }}>
            {
                ({isSubmitting, dirty, isValid, handleSubmit}) => (
                    <Form className='ui form'>
                        <Field name='comment'>
                            {
                                ({field}) => (
                                    <textarea {...field} rows={3} placeholder='comment'
                                              onKeyUp={(e) => {
                                                  if (!e.shiftKey && e.key === 'Enter') {
                                                      e.preventDefault();
                                                      isValid && handleSubmit();
                                                  } else if (e.shiftKey && e.key === 'Enter') {
                                                      return;
                                                  }
                                              }}
                                    />
                                )
                            }
                        </Field>
                    </Form>
                )
            }
        </Formik>
    )
}