import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

//this is the cloudinary upload widget.
// it lets the user send a picutre and sets the url in the state.
const UploadWidget = ({ setPictureUrl, pictureUrl }) => {
    const [uploaded, setUpdloaded] = useState(false);
    const cloudinaryRef = useRef();
    const widgetRef = useRef();

//https://cloudinary.com/documentation/react_image_and_video_upload

    useEffect(() => {
        cloudinaryRef.current = window.cloudinary;
        // console.log(cloudinaryRef.current);
        widgetRef.current = cloudinaryRef.current.createUploadWidget(
        {
            cloudName: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME,
            uploadPreset: process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET,
        },
        function (error, result) {
            // console.log(result);
            // console.log(result.event);
            if (result.event === "success") {
            setUpdloaded(true);
            setPictureUrl(result.info.url);
            pictureUrl.push(result.info.url);
            // console.log(result.info.url);
            // console.log(pictureUrl);
            }
        }
        );
    }, [pictureUrl]);
    // console.log(pictureUrl);

    return (
        <Button
        onClick={(e) => {
            e.preventDefault();
            widgetRef.current.open();
        }}
        disabled={uploaded ? true : false}
        >
        {uploaded ? "uploaded!" : "Upload picture"}
        </Button>
    );
};

const Button =styled.button`

`

export default UploadWidget;
