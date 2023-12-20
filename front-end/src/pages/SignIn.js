import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { GoogleButton } from 'react-google-button';
import { UserAuth } from '../context/AuthContext'
import { db } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import backgroundImage from "../assets/signin-background.jpg"

const SignIn = () => {
    const [userInDatabase, setUserInDatabase] = useState(null); // boolean

    const checkUserInDatabase = async (userid) => {
        try {
            const docRef = doc(db, "users", userid);
            const documentSnapshot = await getDoc(docRef);
            setUserInDatabase(documentSnapshot.exists());
        } catch (error) {
            console.error('Error checking document existence:', error);
        }
    }

    const addUserToDatabase = async (userid) => {
        try {
            const docRef = doc(db, "users", userid);
            await setDoc(docRef, {
                feedingTimes: [],
                feedingVolumes: []
            });
            console.log("New user added to firestore");
            setUserInDatabase(true);
        } catch (error) {
            console.error('Error adding user to database:', error);
        }
    }

    const { googleSignIn, user } = UserAuth();
    const navigate = useNavigate();

    const handleGoogleSignIn = async () => {
        try {
            await googleSignIn();
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (user != null) {
            checkUserInDatabase(user?.uid);
        }

        if (userInDatabase != null && !userInDatabase) {
            console.log("user not in database");
            addUserToDatabase(user?.uid);
        }
        else if (userInDatabase != null && userInDatabase) {
            console.log("user in database");
        }

        if (user != null && userInDatabase) {
            setUserInDatabase(null);
            navigate('/account');
        }
    }, [user, userInDatabase])

    return (
        <div style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            minHeight: '100vh',  // Ensures the background covers the full height of the viewport
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
        <div className="flex items-center justify-center h-screen">
            <div className="SignIn text-gray-600 text-4xl font-extrabold">
                <h1 className="text-center mb-8">Sign in</h1>
                <div className="GoogleButton">
                    <GoogleButton
                        onClick={handleGoogleSignIn}
                        style={{
                        background: '#fff176',
                        color: "gray",
                        border: '1px double',
                        borderRadius: '5px',
                        height: '70px'
                        }}
                        className="py-2 px-4 rounded-md shadow-md hover:shadow-lg focus:outline-none focus:ring focus:border-blue-300"
                    />
                </div>
            </div>
        </div>
        </div>
    );
}

export default SignIn;