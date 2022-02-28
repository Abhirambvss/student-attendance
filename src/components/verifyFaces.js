import React, { useState } from 'react'


const VerifyFaces = () => {
    const [error, setError] = useState(null);

    const KEY = "81fb7354ae5f46dfa3e4697a1978c1a2"
    const face_api_url = 'https://centralindia.api.cognitive.microsoft.com/face/v1.0/detect'
    const url = "https://firebasestorage.googleapis.com/v0/b/test-project-406cd.appspot.com/o/users%2FLWz9G4l6QyW4R5JZVSS7C0aiK7g2%2Fdp%2FMital%20Kamani.jpg_dp?alt=media&token=093bff59-f72a-470d-9f1d-fc48882ac6bb";




    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/octet-stream',
            'Ocp-Apim-Subscription-Key': KEY,
        },
        body: JSON.stringify({
            "url": url, "returnFaceId": 'true',
        })
    };


    return (
        <div >
            <button className=" bg-sky-500 hover:bg-sky-600 text-white border-2 rounded-lg border-black-500/100 p-2 m-2 "
            >Submit</button>

        </div>

    )
}
export default VerifyFaces