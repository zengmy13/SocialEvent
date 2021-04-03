import React, {useCallback} from "react";
import {useDropzone} from 'react-dropzone';
import {Icon, Header} from "semantic-ui-react";

export default function DropZone(props) {
    const {setFile} = props;
    const onDrop = useCallback(acceptedFiles => {
        setFile(acceptedFiles.map(item => {
            return Object.assign(item, {preview: URL.createObjectURL(item)})
        }))
    }, [setFile])
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop});
    const cls = {
        border: "3px dashed #eee",
        textAlign: "center",
        paddingTop: "30px"
    }
    const activeCls = {
        border: "3px dashed green",
    }
    return (
        <div {...getRootProps()} style={isDragActive ? {...cls, ...activeCls} : {...cls}}>
            <input {...getInputProps()} />
            <Icon name='upload' size='huge'/>
            <Header as='h3' content='drop the image here'></Header>
        </div>
    )
}




