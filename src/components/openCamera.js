import React, { useState } from "react";
import Webcam from "react-webcam";
import StudentDetails from "./StudentDetails"

export default function OpenCamera() {

  // const [deviceId, setDeviceId] = useState({});
  // const [url, setUrl] = useState(null)
  const url = "https://firebasestorage.googleapis.com/v0/b/test-project-406cd.appspot.com/o/users%2FLWz9G4l6QyW4R5JZVSS7C0aiK7g2%2Fdp%2FMital%20Kamani.jpg_dp?alt=media&token=093bff59-f72a-470d-9f1d-fc48882ac6bb"
  const [devices, setDevices] = useState([]);
  const [imgSrc, setImgSrc] = useState(null);
  const [isShowVideo, setIsShowVideo] = useState(false);
  const KEY = process.env.REACT_APP_FACE_API_KEY
  const face_api_url = process.env.REACT_APP_FACE_API_ENDPOINT
  console.log(face_api_url);
  const handleDevices = React.useCallback(
    mediaDevices =>
      setDevices(mediaDevices.filter(({ kind }) => kind === "videoinput")),
    [setDevices]
  );




  React.useEffect(
    () => {
      navigator.mediaDevices.enumerateDevices().then(handleDevices);
    },
    [handleDevices]
  );
  const webcamRef = React.useRef(null);
  const startCam = () => {
    setIsShowVideo(true);
    const imageSrc = webcamRef.current.getScreenshot()
    setImgSrc(imageSrc)
    console.log(imageSrc);
  }



  const ReStartCam = () => {
    setIsShowVideo(false);
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc)
  }

  // const stopCam = () => {
  //   let stream = webcamRef.current.stream;
  //   const tracks = stream.getTracks();
  //   tracks.forEach(track => track.stop());
  //   setIsShowVideo(false);
  // }

  const a = localStorage.getItem('localImage')
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Ocp-Apim-Subscription-Key': KEY,
    },
    body: JSON.stringify({
      "url": "https://abhiramstudentattendance.blob.core.windows.net/student-attendance/201901266.jpg"
      , "returnFaceId": 'true',
    })
  };

  return (
    <div className="justify-center">
      {devices.map((device, key) => (
        <div className="justify-center">
          {device.label || `Device ${key + 1}`}
          {(!isShowVideo)
            ? (<> <Webcam
              audio={false}
              height={500}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              width={500}
              videoConstraints={{ deviceId: device.deviceId }}
              className="m-2 p-2"
            />
              <button className=" bg-sky-500 hover:bg-sky-600 text-white border-2 rounded-lg border-black-500/100 p-2 m-2" onClick={startCam}>Capture photo</button>
            </>
            ) :
            <button className=" bg-sky-500 hover:bg-sky-600 text-white border-2 rounded-lg border-black-500/100 p-2 m-2 justify-center" onClick={ReStartCam}>Re Capture</button>
          }
        </div>

      ))}

      {imgSrc && (
        // eslint-disable-next-line jsx-a11y/img-redundant-alt
        <><img className="m-2 p-2 flex justify-center" height={500} width={500} src={imgSrc} alt="captured image" />
          <a href={imgSrc} >Link</a></>)}
      <StudentDetails />
      <button className=" bg-sky-500 hover:bg-sky-600 text-white border-2 rounded-lg border-black-500/100 p-2 m-2 " onClick={() => {
        fetch(face_api_url, requestOptions)
          .then(async response => {
            const data = await response.json();
            console.log(data);


          })
      }}>Submit</button>
      {a && <img className="h-24 w-24" src={URL.createObjectURL(a)} alt="image" />}

    </div>
  )
}
