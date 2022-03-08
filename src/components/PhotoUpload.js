import React, { useState, useEffect } from "react";
import { faceApiForUpload } from "../services/FaceAPI";

const PhotoUpload = () => {

    const [data, setData] = useState([])
    const [file, setFile] = useState({});
    const [outputImage, setOutputImage] = useState(false);



    useEffect(() => {
        console.log(data);
    }, [data])

    const handleUpload = (event) => {
        setFile(event.target.files[0]);
    }
    const renderSwitch = (length) => {
        switch (length) {
            case 0:
                return <div>No faces detected</div>
            case 1:
                return <img src={URL.createObjectURL(file)} alt="output from azure" />
            default:
                return <div>Mutliple faces detected</div>


        }
    }

    const handleSubmit = async () => {
        try {
            const response = await faceApiForUpload.post(
                `/face/v1.0/detect`,
                file
            );
            setData(response.data);
            setOutputImage(true);
        }
        catch (err) {
            console.log(err.response.data);
            window.alert("An error occured");
        }
    }

    const handleBack = () => {
        setOutputImage(false);
        setFile({});
    }

    return (
        <div>
            {(!outputImage) ?
                <div className='center'>
                    <div>
                        <div className='file-input'>
                            <input type="file" id="file" name="file" className='file' accept=".jpg,.jpeg,.png" onChange={handleUpload} />
                            <label htmlFor="file">Select file</label>
                        </div>
                        <button className={file.name ? 'submit-btn' : 'disabled-submit-btn'} type="button" onClick={handleSubmit}>SUBMIT</button>
                    </div>
                </div>
                :
                <div className='output-container'>
                    <div className="center">
                        <div className="center-output-image">
                            {
                                renderSwitch(data.length)
                            }

                        </div>
                    </div>
                    <div className='center'>
                        <button className='back-btn' type="button" onClick={handleBack}>BACK</button>
                    </div>
                </div>
            }
        </div>
    );
}

export default PhotoUpload;