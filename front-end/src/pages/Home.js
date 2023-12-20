import React from "react";
import { Link } from 'react-router-dom';
//import { GoogleButton } from 'react-google-button';
// import {auth} from "../config.js";
// import { signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';

const Home = () => {
    // const navigate = useNavigate();
     const { user } = UserAuth(); // Uncomment this line if you need user information

    // const signOutClicked = async () => {
    //     try {
    //         signOut(auth);
    //         navigate('/');
    //     } catch (error) {
    //         console.error('Error signing out:', error.message);
    //     }
    // }

    return (
        <div className="Home">
        <section className="flex items-center justify-center mt-60 mx-auto max-w-screen-xl pb-4 px-4 lg:flex md:px-8">
          <div className="space-y-4 flex-1 text-center lg:text-left">
            <h1 className="text-gray-800 font-mono font-bold text-4xl xl:text-5xl">
              Welcome to <span className="text-yellow-500">PiPaws</span>
            </h1>
            <p className="text-gray-600 max-w-xl leading-relaxed mx-auto text-xl font-mono lg:ml-0">
              Feed your pet away from home!
            </p>
            <div>
              {!user && (
                <Link to="/SignIn">
                  <button
                    className="font-bold w-32 h-15 text-center px-6 py-3.5 text-white bg-yellow-400 rounded-full duration-150 hover:bg-yellow-300 active:bg-yellow-700"
                  >
                    Log in
                  </button>
                </Link>
              )}
            </div>
          </div>
          <div className="flex-1 mt-4 lg:mt-0 lg:ml-3">
            <img
              src="https://images.squarespace-cdn.com/content/v1/5d5208bebb45570001e085c7/1593551648023-92MQ00KEBJUQ0JC9JXEV/RVC_Pet-Nutrition.jpg"
              className="w-full mx-auto sm:w-10/12 lg:w-full rounded-lg border-double border-4 border-yellow-500"
              alt="Pet Feeder"
            />
          </div>
        </section>
      </div>
      );
      
}

export default Home;
