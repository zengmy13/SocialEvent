import React, {useRef} from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

export default function Cropperbox(props) {
    const {file} = props;
    const {setimage} = props;
    const cropperRef = useRef(null);
    const onCrop = () => {
        const imageElement = cropperRef?.current;
        const cropper = imageElement?.cropper;
        cropper.getCroppedCanvas().toBlob(item => {
            setimage(item)
        })
    }
    return (

         <Cropper
            src={file[0]?.preview}
            initialAspectRatio={1}
            style={{height: 200, width: "100%"}}
            guides={false}
            crop={onCrop}
            preview='.image-preview'
            ref={cropperRef}
            dragMode='move'
            viewMode={1}
            movable={true}
            scalable={true}
            cropBoxResizable={true}
            cropBoxMovable={true}
        />
    );
}