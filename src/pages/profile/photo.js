import React, {useState} from 'react';
import {Button, Grid, Header} from "semantic-ui-react";
import Dropzone from "./dropzone";
import Cropperbox from "./cropper";
import {uid} from 'uid';
import {addPhotoToStorage, getFileExtension, updateProfilePhoto} from "../../firebase/fromfirebase";
import {toast} from "react-toastify";

export default function Phototab() {
    const [file, setfile] = useState([]);
    const [image, setimage] = useState(false);
    const [uploading, setuploading] = useState(false);
    const handlecancel = () => {
        setfile([]);
        setimage(null);
    }

    async function handlekeepphoto() {
        const filename = uid() + '.' + getFileExtension(file[0].name);
        setuploading(true)
        const upload = addPhotoToStorage(filename, image);
        upload.on("state_changed",
            snapshot => console.log(snapshot),
            error => {
                toast.error(error.message)
            }, () => {
                upload.snapshot.ref.getDownloadURL().then(url => {
                    updateProfilePhoto(url, filename).then(item => {
                        setuploading(false);
                        handlecancel();
                    })
                })
            })
    }

    return (
        <Grid.Column width={16}>
            <Grid stackable>
                <Grid.Column width={4} textAlign='center'>
                    <Header content='Step1:drop the photo' color='teal'></Header>
                    <Dropzone setfile={setfile}/>
                </Grid.Column>
                <Grid.Column width={1}></Grid.Column>
                <Grid.Column width={4} textAlign='center'>
                    <Header content='Step2:resize the photo' color='teal'></Header>
                    {
                        file.length>0 &&  <Cropperbox setimage={setimage} file={file}/>
                    }

                </Grid.Column>
                <Grid.Column width={1}></Grid.Column>
                <Grid.Column width={4} textAlign='center'>
                    <Header content='Step3:keep the photo' color='teal'></Header>
                    {
                        file.length > 0 &&
                        <>
                            <div className='image-preview'
                                 style={{
                                     display: "inline-block",
                                     minWidth: 200,
                                     minHeight: 200,
                                     overflow: "hidden"
                                 }}></div>
                            <Button.Group style={{marginTop: "10px"}}>
                                <Button content='cancel' color='blue'
                                        onClick={handlecancel}
                                        disabled={uploading}
                                        style={{marginRight: "10px"}}/>
                                <Button content='keep' color='teal'
                                        loading={uploading}
                                        onClick={handlekeepphoto}/>
                            </Button.Group>
                        </>
                    }
                </Grid.Column>
                <Grid.Column width={1}></Grid.Column>
            </Grid>
        </Grid.Column>
    )
}