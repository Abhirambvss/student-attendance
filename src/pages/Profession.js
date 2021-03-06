import React, { useState } from 'react'
import { GoogleLogout } from 'react-google-login';
import { Link } from "react-router-dom";

const Profession = () => {
    const [showLogoutButton, setShowlogoutButton] = useState(false)
    const login = localStorage.getItem('login')
    const name = localStorage.getItem('name')
    const imageUrl = localStorage.getItem('imageUrl')
    const Logout = () => {
        localStorage.removeItem('login')
        localStorage.removeItem('name')
        localStorage.removeItem('imageUrl')
        console.clear()
        alert("You have been logged out successfully");


    }
    // const checkStudent = () => {
    //     localStorage.setItem('login', 0)
    // }
    // const checkTeacher = () => {
    //     localStorage.setItem('login', 1)
    // }
    return (
        <div>
            {/* <NavBar /> */}

            <div className="flex flex-row justify-between items-center" >
                <div>
                    {login && "Hello " + name}
                </div>
                <div onClick={() => { setShowlogoutButton(!showLogoutButton) }}>
                    {login && <img className="rounded-full h-24 w-24 m-2 p-2" src={imageUrl} alt="profilePicture" />}
                </div>
                {showLogoutButton && <GoogleLogout
                    clientId="858497450675-u1qu337nrih4h9bouobiq1dktdpaisce.apps.googleusercontent.com"
                    buttonText="Logout"
                    onLogoutSuccess={Logout}
                >
                </GoogleLogout>}

            </div>
            <div className="flex justify-center items-center align-items-center">
                <Link to="/student">
                    <button className=" bg-sky-500 hover:bg-sky-600 text-white border-2 rounded-lg border-black-500/100 p-2 m-2" onClick={() => { console.log("hello Student") }}>Student</button>
                </Link>
                <Link to="/teacher">
                    <button className=" bg-sky-500 hover:bg-sky-600 text-white border-2 rounded-lg border-black-500/100 p-2 m-2" onClick={() => { console.log("hello Teacher") }}>Teacher</button>
                </Link>
            </div>
        </div>
    )
}
export default Profession