import {FormField, Label, Select} from "semantic-ui-react";
import {useField} from "formik";
import {categoryData} from "../assets/categoryoption";

const options = categoryData;

export default function SelectInput(props) {
    const [field, meta, helpers] = useField(props);
    return (
        <FormField>
            <Select {...props} options={options}
                    clearable
                    value={field.value || null}
                    onChange={(e, d) => helpers.setValue(d.value)}
                    onBlur={() => helpers.setTouched(true)}
            />
            {meta.error && meta.touched ? (<Label color='red' basic pointing>
                {meta.error}
            </Label>) : null
            }
        </FormField>
    )
}