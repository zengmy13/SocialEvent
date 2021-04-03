import React from "react";
import {FormField, Label} from "semantic-ui-react";
import {useField, useFormikContext} from "formik";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"

export default function DateInput(props) {
    const [field, meta] = useField(props);
    const {setFieldValue} = useFormikContext();
    return (
        <FormField>
            <DatePicker
                {...props}
                {...field}
                showTimeSelect
                selected={field.value}
                dateFormat="Pp"
                onChange={date => setFieldValue(field.name, date)}
                autoComplete="off"
            />
            {meta.error && meta.touched ? (
                <Label color='red' basic pointing>
                    {meta.error}
                </Label>) : null
            }
        </FormField>
    )
}