import React, { useState, useEffect } from 'react';
import { UserAuth } from '../context/AuthContext'
import { db } from "../firebase";
import { doc, getDoc, updateDoc, onSnapshot, } from "firebase/firestore";
import { format } from "date-fns"
import {useNavigate } from 'react-router-dom';
import "./account.css";

const Account = () => {

    const [feedAmount, setFeedAmount] = useState("");
    const [feedingTimesArr, setFeedingTimesArr] = useState([]);
    const [feedingVolumesArr, setFeedingVolumesArr] = useState([]);
    const { user } = UserAuth();
    const navigate = useNavigate();
    const [profilePicture, setProfilePicture] = useState('');

    const handleLoginSuccess = (response) => {
        const profile = response.profileObj;
        setProfilePicture(profile.imageUrl);
      };
    
    const handleFeedButtonClick = () => {
        feed();
    }

    const handleFeedKeyPress = (event) => {
        if (event.key === "Enter") {
            feed();
        }
    }

    const feed = async () => {
        console.log("Feeding amount:", feedAmount);
        try {
            const response = await fetch('http://172.20.10.2:5000/runProgram', { // CHANGE ACCORDING TO IP OF RASPBERRY PI (ACCESSED USING hostname -I)
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ feedAmount })
            });

            if (!response.ok) {
                throw new Error('Failed to run program');
            }

            // Handle success
            console.log('Program executed successfully');
        } catch (error) {
            // Handle errors
            console.error('Error:', error.message);
        }
        addFeedingData(feedAmount)
        
    }

    const addFeedingData = async (feedingVolume) => {
        try {
            const docRef = doc(db, "users", user?.uid);

            const newFeedingTimes = (await getDoc(docRef)).get("feedingTimes");
            newFeedingTimes.push(Date.now())
            await updateDoc(docRef, {
                feedingTimes: newFeedingTimes
            });

            const newFeedingVolumes = (await getDoc(docRef)).get("feedingVolumes");
            newFeedingVolumes.push(parseFloat(feedingVolume));
            await updateDoc(docRef, {
                feedingVolumes: newFeedingVolumes
            });
        } catch (error) {
            console.error("Feeding data couldn't be added to Firestore", error);
        }
    }

    const generateTableRows = () => {
        // Make sure both arrays have the same length
        if (feedingTimesArr.length !== feedingVolumesArr.length) {
            console.error('Feeding times and feeding volumes arrays do not have the same length');
            return;
        }
        else if (feedingTimesArr.length === 0 || feedingVolumesArr.length === 0) {
            return;
        }

        // Create an array of table rows
        const tableRows = feedingTimesArr.map((date, index) => (
            <tr key={index}>
                <td>{format(new Date(Number(date)), 'MMM. d, yyyy')}</td>
                <td>{format(new Date(Number(date)), 'h:mm a')}</td>
                <td>{feedingVolumesArr[index]}</td>
            </tr>
        ));

        return tableRows;
    };

    // const getFeedingData = async () => {
    //     try {
    //         const docRef = doc(db, "users", user?.uid);
    //         const documentSnapshot = await getDoc(docRef);
    //         console.log(documentSnapshot.get("feedingTimes"));
    //         console.log(documentSnapshot.get("feedingVolumes"));
    //     } catch (error) {
    //         console.error("Feeding data couldn't be retrieved from Firestore", error);
    //     }
    // }

    useEffect(() => {
        if (user?.uid) {
            onSnapshot(doc(db, "users", user?.uid), (snapshot) => {
                setFeedingTimesArr(snapshot.get("feedingTimes"));
                setFeedingVolumesArr(snapshot.get("feedingVolumes"));
            })
        }     
    }, [user]);

    useEffect(() => {
        console.log(feedingTimesArr);
    }, [feedingTimesArr]);

    useEffect(() => {
        console.log(feedingVolumesArr);
    }, [feedingVolumesArr]);

    /*const onSignIn = (googleUser) => {
        // Get user profile information
        var profile = googleUser.getBasicProfile();
      
        // Access the profile picture URL
        var profilePictureUrl = profile.getImageUrl();
      
        // Display the profile picture
        document.getElementById('profilePicture').src = profilePictureUrl;
    }*/

    return (
        <div className="bg-yellow-100 mt-24 p-24">
            <div className="Welcome flex items-center justify-center" style={{ fontSize: '20px' }}>
                <p>Welcome, <strong>{user?.displayName}</strong></p>
                {/*<img src = {profilePictureUrl}
                 alt="Profile Picture" className="p-4"
                  
    width = "120"      />*/}

            </div>  

            <div className="Feeding mt-26 p-24">
                <div className="flex items-center ">
                    <div className='flex items-center mr-6'>
                        <input
                            className='px-2 mx-2 border border-solid border-yellow-200 border-t-4 border-r-4 border-b-4 border-l-4 rounded-lg'
                            type="text"
                            value={feedAmount}
                            onChange={(e) => setFeedAmount(e.target.value)}
                            onKeyPress={handleFeedKeyPress}
                            placeholder='Enter amount of food'
                            
                        />
                        cm<sup>3</sup>
                    </div>
                    <button 
                        className="text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:focus:ring-yellow-900"
                        onClick={handleFeedButtonClick}>
                        Feed
                    </button>
                    <button 
                        onClick={() => navigate('/Camera')}
                        className="text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:focus:ring-yellow-900"
                    >
                        Camera
                    </button>    
                </div> 
                <table>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Volume (cm<sup>3</sup>)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {generateTableRows()}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Account;