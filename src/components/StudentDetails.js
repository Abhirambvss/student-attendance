import React, { useState, useCallback } from 'react'
import { db } from '../firebase'
import uuid from 'react-uuid'



const StudentDetails = () => {
    const [name, setName] = useState("")
    const [postImage, setAttachments] = useState(undefined)
    const uploadImageInDirectory = async (directory, id, picture) => {
        if (!picture) return undefined
        const nameOfPicture = picture.name + '_' + id
        await db.push(`${directory}/${nameOfPicture}`, picture)
        return await db.ref(directory).child(nameOfPicture).getDownloadURL()
    }
    // const uploadStudentDetails = () => {
    //     storageRef("teacher").push({
    //         name: name,
    //         complete: false,
    //     }).catch(alert);
    // };
    const onUploadImage = (async () => {
        const postID = uuid()
        console.log("hello");
        const imageURL = await uploadImageInDirectory('posts', postID, postImage)
        console.log(imageURL);
        console.log("bye");

    })


    const onAttachmentUpload = useCallback(
        (event) => {
            const image = event.target.files[0]
            localStorage.setItem('localImage', event.target.files[0])
            setAttachments(image)
        },
        [setAttachments]
    )
    const handleOnChange = (e) => {
        setName(e.target.value);
    }

    return (

        <div>
            <span className="text-gray-700" >Student name</span>
            <input type="text" className="mt-1 block rounded text-blue-500" placeholder="Student Name" onChange={handleOnChange} />
            <span className="text-gray-700">Roll Number</span>
            <input type="text" className="mt-1 block rounded text-blue-500" placeholder="Roll Number" />
            <span className="text-gray-700">Image of Student</span>
            <input type="file" accept="image/png,image/jpg,image/jpeg" className="mt-1 block rounded text-blue-500" onChange={onAttachmentUpload} />
            <button className=" bg-sky-500 hover:bg-sky-600 text-white border-2 rounded-lg border-black-500/100 p-2 m-2 justify-center" onClick={onUploadImage}>Submit</button>
            {/* {postImage && <img className="h-24 w-24" src={URL.createObjectURL(postImage)} alt="image" />} */}
        </div>
    )
}
export default StudentDetails