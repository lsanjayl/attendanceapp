import Webcam from "react-webcam";
import React, { useState } from 'react';
import { storage } from "../../Server/Fireconfig";
import { ref, uploadString } from "firebase/storage";
import Navbar from '../Navbar/Navbar';
import { Navigate } from "react-router-dom"
const Samplecollection = () => {
    const webcamRef = React.useRef(null);
    const [image, setImage] = useState('');
    const [radial,setRadial]=useState(25);
    const [count,setCount]=useState(1);
    const videoConstraints = {
        width: 320,
        height: 350,
        facingMode: "user"
    };
    const rad=()=>{setRadial(radial+25);setCount(count+1)}
    const capture = React.useCallback(
        async () => {
            const imageSrc = webcamRef.current.getScreenshot();
            setImage(imageSrc)
            console.log(imageSrc)
            const storageRef = ref(storage, 'images/');
            uploadString(storageRef, imageSrc, 'data_url').then((snapshot) => {
                console.log('Uploaded a base64 string!');
            });
            setImage('');
        },

        [webcamRef]
    );
    if(radial==100){
        return <Navigate to="/" />
    }
    return (
        <div className="samplecollection">
            <Navbar className="navbar" />
            <div className="webcam-container">
                <div className="flex items-center px-1.5">
                    <h1 className="text-xl text-white px-0.5">Recognition image</h1>
                    <div className="radial-progress text-white" style={{ "--value": `${radial}`, "--size": "8rem" }}>{count}/4</div>

                </div>
                <div className="webcam-img">

                    {image == '' ? <Webcam className="rounded-lg"
                        audio={false}
                        height={350}
                        ref={webcamRef}
                        screenshotFormat="image/jpeg"
                        width={320}
                        videoConstraints={videoConstraints}
                    /> : <img id="op" className="rounded-lg" src={image} />}
                </div>
                <button className="btn btn-secondary btn-lg" onClick={(e) => { e.preventDefault(); capture();rad(); }}>
                    Capture</button>
            </div>
        </div>
    )
}
export default Samplecollection