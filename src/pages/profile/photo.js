import React, {useState} from 'react';
import {Button, Grid, Header} from "semantic-ui-react";
import DropZone from "./dropzone";
import CropperBox from "./cropper";
import {uid} from 'uid';
import {addphototostorage, getfileextension, updateprofilephoto} from "../../firebase/fromfirebase";
import {toast} from "react-toastify";

export default function PhotoTab() {
    const [file, setFile] = useState([]);
    const [image, setImage] = useState(false);
    const [uploading, setUploading] = useState(false);
    const handleCancel = () => {
        setFile([]);
        setImage(null);
    }

    async function handleKeepPhoto() {
        const filename = uid() + '.' + getfileextension(file[0].name);
        setUploading(true)
        const upload = addphototostorage(filename, image);
        upload.on("state_changed",
            snapshot => console.log(snapshot),
            error => {
                toast.error(error.message)
            }, () => {
                upload.snapshot.ref.getDownloadURL().then(url => {
                    updateprofilephoto(url, filename).then(item => {
                        setUploading(false);
                        window.location.reload();
                        handleCancel();
                    })
                })
            })
    }

    return (
        <Grid.Column width={16}>
            <Grid stackable>
                <Grid.Column width={4} textAlign='center'>
                    <Header content='Step1:drop the photo' color='teal'></Header>
                    <DropZone setFile={setFile}/>
                </Grid.Column>
                <Grid.Column width={1}></Grid.Column>
                <Grid.Column width={4} textAlign='center'>
                    <Header content='Step2:resize the photo' color='teal'></Header>
                    {
                        file.length>0 &&  <CropperBox setImage={setImage} file={file}/>
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
                                        onClick={handleCancel}
                                        disabled={uploading}
                                        style={{marginRight: "10px"}}/>
                                <Button content='keep' color='teal'
                                        loading={uploading}
                                        onClick={handleKeepPhoto}/>
                            </Button.Group>
                        </>
                    }
                </Grid.Column>
                <Grid.Column width={1}></Grid.Column>
            </Grid>
        </Grid.Column>
    )
}