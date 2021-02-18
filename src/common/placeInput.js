import React from 'react';
import {FormField, Label, Segment} from "semantic-ui-react";
import {useField} from "formik";
import PlacesAutocomplete, {geocodeByAddress, getLatLng,} from 'react-places-autocomplete';
import {List} from "semantic-ui-react";

export default function PlaceInput({options, ...props}) {
    const [field,meta,helpers] = useField(props);
    const handleSelect = address => {
        geocodeByAddress(address)
            .then(results => getLatLng(results[0]))
            .then(latLng => helpers.setValue({address, latLng}))
            .catch(error => helpers.setError(error));
    };

    function handleBlur(e) {
        field.onBlur(e);
        if (!field.value.latLng) {
            helpers.setValue({
                address: "",
                latLng: null
            });
        }
    }

    return (
        <PlacesAutocomplete
            value={field.value["address"]}
            onChange={(address) => helpers.setValue({address: address})}
            onSelect={handleSelect}
            searchOptions={options}
        >
            {({getInputProps, suggestions, getSuggestionItemProps, loading}) => (
                <FormField >
                    <input {...getInputProps({name: field.name, onBlur:(e)=>handleBlur(e), ...props})}/>
                    {
                        meta.touched && meta.error ? (
                            <Label color='red' basic pointing>
                                {meta.error["address"]}
                            </Label>
                        ) : null
                    }
                    {suggestions?.length > 0 && (
                        <Segment loading={loading} style={{position: 'absolute', zIndex: 999, width: "100%"}}>
                            <List selection>
                                {suggestions.map((suggestion, index) => {
                                    return (
                                        <List.Item key={index}
                                                   {...getSuggestionItemProps(suggestion)}>
                                            <List.Header>{suggestion.formattedSuggestion.mainText}</List.Header>
                                            <List.Description>{suggestion.formattedSuggestion.secondaryText}</List.Description>
                                        </List.Item>
                                    );
                                })}
                            </List>
                        </Segment>
                    )}
                </FormField>
            )}
        </PlacesAutocomplete>
    )
}