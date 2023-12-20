// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCtezce9cSAEQ7qqsNTS2Q1LP7qg5DsiHo",
  authDomain: "pet-feeder-eb12f.firebaseapp.com",
  projectId: "pet-feeder-eb12f",
  storageBucket: "pet-feeder-eb12f.appspot.com",
  messagingSenderId: "939893385994",
  appId: "1:939893385994:web:e6ed50f48796943adda8f3",
  measurementId: "G-X4DRH4FQVT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
//const analytics = getAnalytics(app);