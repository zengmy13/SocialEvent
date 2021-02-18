import React, {useCallback} from "react";
import {useDropzone} from 'react-dropzone';
import {Icon, Header} from "semantic-ui-react";

export default function Dropzone(props) {
    const {setfile} = props;
    const onDrop = useCallback(acceptedFiles => {
        setfile(acceptedFiles.map(item => {
            return Object.assign(item, {preview: URL.createObjectURL(item)})
        }))
    }, [setfile])
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop});
    const cls = {
        border: "3px dashed #eee",
        textAlign: "center",
        paddingTop: "30px"
    }
    const activecls = {
        border: "3px dashed green",
    }
    return (
        <div {...getRootProps()} style={isDragActive ? {...cls, ...activecls} : {...cls}}>
            <input {...getInputProps()} />
            <Icon name='upload' size='huge'/>
            <Header as='h3' content='drop the image here'></Header>
        </div>
    )
}




