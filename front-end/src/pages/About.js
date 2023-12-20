import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Vina Sans:400,700&display=swap" />

const About = () => {
    const { user } = UserAuth();
    const navigate = useNavigate();

    return (
        
        <section className="py-40 h-screen" style={{ background: "linear-gradient(152.92deg, rgba(255, 255, 150, 0.2) 4.54%, rgba(255, 255, 150, 0.17) 34.2%, rgba(255, 255, 150, 0.1) 77.55%)" }}>
            <div className="max-w-screen-xl mx-auto px-4 md:text-center md:px-8">
                <div className="max-w-xl space-y-3 md:mx-auto">
                    <h3 className="text-yellow-500 font-bold text-6xl">
                        Our Project
                    </h3>
                    <p className="text-gray-800 text-3xl font-semibold sm:text-4xl">
                        About Us
                    </p>
                    <p className="text-gray-700 font-mono text-center">
                        Empowering pet owners with convenience, our project ensures that feeding your pets is effortless, even when you're on the go or caught up in a busy schedule. 
                        With just a click on our website, you can provide nourishment to your pets from anywhere, making it a seamless experience for those with hectic routines or a commitment 
                        to timely care. We keep track of the amount fed and a live feed of the pet to track their eating habits.
                    </p>
                </div>
                <div className="mt-10">
                    {user && (
                        <button
                            onClick={() => navigate('/')}
                            className="inline-block py-2 px-4 text-white font-medium bg-gray-800 duration-150 hover:bg-gray-700 active:bg-gray-900 rounded-lg shadow-md hover:shadow-none"
                        >
                            Back to Home Page
                        </button>
                    )}
                </div>
            </div>
         </section>

    );
}

export default About;