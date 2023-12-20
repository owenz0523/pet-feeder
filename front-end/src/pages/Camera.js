import React, { useState, useEffect } from 'react';
// import { UserAuth } from '../context/AuthContext'
import {useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import image from '../assets/image.jpg'

// import { db } from "../firebase";
// import { doc, getDoc, updateDoc, onSnapshot, } from "firebase/firestore";
// import { format } from "date-fns"
import "./account.css";
const Camera = () => {
    const navigate = useNavigate();
    // Replace with Raspberry Pi's IP address
    //IDK IF IT WILL WORK
    const streamUrl = 'http://<RASPBERRY_PI_IP>:8000/stream.mjpg'; 


    // const signOutClicked = async () => {
    //     try {
    //         signOut(auth);
    //         navigate('/');
    //     } catch (error) {
    //         console.error('Error signing out:', error.message);
    //     }
    // }

    return (
        <div className="Camera">
             <section className="py-28 h-screen" style={{ background: "linear-gradient(152.92deg, rgba(255, 255, 150, 0.2) 4.54%, rgba(255, 255, 150, 0.17) 34.2%, rgba(255, 255, 150, 0.1) 77.55%)" }}>
            <div className="max-w-screen-xl mx-auto px-4 md:text-center md:px-8">
                <div className="flex flex-col items-center mt-8">
                    <h3 className="text-yellow-500 font-bold text-6xl">
                        Camera
                    </h3>
                    <img src={image} alt="Camera Image" width="640" height="480" className="mt-4" />
                </div>

                <div className="mt-4">
                  
                        <button
                            onClick={() => navigate('/Account')}
                            className="inline-block py-2 px-4 text-white font-medium bg-gray-800 duration-150 hover:bg-gray-700 active:bg-gray-900 rounded-lg shadow-md hover:shadow-none"
                      >
                            Back to Dashboard
                        </button>
                    
                </div>
            </div>

         </section>
         </div>
    );
}

export default Camera;