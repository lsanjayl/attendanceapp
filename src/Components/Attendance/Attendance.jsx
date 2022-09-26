import React, { useState, useEffect } from 'react';
import Navbar from "../Navbar/Navbar";
import Webcam from "react-webcam";
import * as faceapi from 'face-api.js';
const WebcamComponent = () => <Webcam />;
const videoConstraints = {
    width: 320,
    height: 350,
    facingMode: "user"
};

const Attendance = () => {
    const webcamRef = React.useRef(null);
    const [image, setImage] = useState('');
    async function loadModels() {
        console.log("enterd");
        await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
        await faceapi.nets.ssdMobilenetv1.loadFromUri("/models");
        await faceapi.nets.faceLandmark68Net.loadFromUri("/models");
        await faceapi.nets.faceRecognitionNet.loadFromUri("/models");
        await faceapi.nets.faceExpressionNet.loadFromUri("/models");
        console.log("models loaded")

    }


    const loadLabeledImages = async () => {
        const descriptions = []
        for (let i = 1; i <= 2; i++) {
            const img = await faceapi.fetchImage(`https://raw.githubusercontent.com/lsanjayl/Face-Recognition-JavaScript-master/master/labeled_images/Sanjay/${i}.jpg`)
            const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor()
            descriptions.push(detections.descriptor)
        }
        console.log(descriptions)
        return new faceapi.LabeledFaceDescriptors('Sanjay', descriptions)
    }


    const capture = React.useCallback(
        async () => {
            const imageSrc = webcamRef.current.getScreenshot();
            setImage(imageSrc)
            console.log(imageSrc)
            loadModels();
        },

        [webcamRef]
    );
    const displaySize = { width: image.width, height: image.height }
    const detect = async () => {
        const labeledFaceDescriptors = await loadLabeledImages()
        const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.6)

        const input = document.getElementById('op')
        const detections = await faceapi.detectSingleFace(input).withFaceLandmarks().withFaceDescriptor()
        // const resizedDetections = faceapi.resizeResults(detections, displaySize)
        console.log(detections)
        const results = faceMatcher.findBestMatch(detections.descriptor)
        console.log(results.label)
        // console.log(detections.descriptor)
    }

    return (
        <div className='samplecollection'>
            <Navbar />
            <div className="webcam-container">
                <div className="webcam-container">
                    <div className="webcam-img">
                        {image == '' ? <Webcam className="rounded-lg"
                            audio={false}
                            height={350}
                            ref={webcamRef}
                            screenshotFormat="image/jpeg"
                            width={320}
                            videoConstraints={videoConstraints}
                        /> : <img id="op" src={image} className="rounded-lg" />}
                    </div>
                </div>
                <button onClick={(e) => { e.preventDefault(); capture(); }}>
                    Capture</button>
                <button onClick={(e) => { e.preventDefault(); detect(); }}>
                    Detect</button>
            </div>
        </div>
    );
};



export default Attendance;