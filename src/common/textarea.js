import {useField} from "formik";
import {FormField, Label} from "semantic-ui-react";

export default function TextArea(props) {
    const [field, meta] = useField(props);
    return (
        <FormField>
            <textarea {...props} {...field} />
            {meta.error && meta.touched ? (<Label color='red' basic pointing>
                {meta.error}
            </Label>) : null
            }
        </FormField>


    )
}