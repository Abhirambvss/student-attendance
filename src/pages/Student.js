import React, { useState } from 'react'
import { faceApiForUpload } from '../services/FaceAPI';

const Student = () => {
    const [data, setData] = useState([])
    const [file, setFile] = useState({});
    const [outputImage, setOutputImage] = useState(false);
    const handleUpload = (event) => {
        setFile(event.target.files[0]);
    }
    const handleSubmit = async () => {
        const renderSwitch = (length) => {
            switch (length) {
                case 0:
                    return alert("No faces detected")
                case 1:
                    return alert("Sucessfully Uploaded")
                default:
                    return alert("Mutliple faces detected.Please Upload an image with one Student")
            }
        }
        try {
            const response = await faceApiForUpload.post(
                `/face/v1.0/detect`,
                file
            );
            setData(response.data.length);
            console.log(response.data);
            setOutputImage(true);
            renderSwitch(response.data.length);
        }
        catch (err) {
            console.log(err.response.data);
            window.alert("An error occured");
        }
    }

    return (
        <div>
            <div>
                <span className="text-gray-700">Roll Number</span>
                <input type="text" className="mt-1 block rounded text-blue-500" placeholder="Roll Number" />
                <span className="text-gray-700">Image of Student</span>
            </div>
            <div>
                <input type="file" accept="image/png,image/jpg,image/jpeg" className="mt-1 block rounded text-blue-500" onChange={handleUpload} />
                <button className=" bg-sky-500 hover:bg-sky-600 text-white border-2 rounded-lg border-black-500/100 p-2 m-2 justify-center" onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    )
}
export default Student