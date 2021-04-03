import React from 'react';
import {FormField, Label} from "semantic-ui-react";
import {useField} from "formik";

export default function TextInput(props) {
    const [field, meta] = useField(props);
    return (
        <FormField>
            <input {...props} {...field} />
            {meta.error && meta.touched ? (<Label color='red' basic pointing>
                {meta.error}
            </Label>) : null
            }
        </FormField>
    )
}