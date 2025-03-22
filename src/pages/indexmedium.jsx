import React, { useState } from 'react';
import MedGame from "../components/Medium.jsx";
import { Button } from '../components/ui/Button.jsx';
import { RefreshCw, ArrowLeft, Info } from 'lucide-react';
import bgImage from "../assets/Frame.jpg";
import { Link } from "react-router-dom";



const Indexmedium = () => {
  return (
    <>
            {/* Background Blur Image */}
            <div
                className="fixed inset-0 bg-no-repeat bg-cover bg-center -z-10 blur-md opacity-80"
                style={{ backgroundImage: `url(${bgImage})` }}
            ></div>

            <div className="min-h-screen absolute w-full bg-transparent overflow-hidden scrollbar-hide">
                {/* Navigation Buttons */}
                <div className="flex justify-between items-center px-10 pt-10 absolute top-0 w-full">
                    
                    <Link to="/">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="text-white border-2 border-[#BE6500] bg-[#E5B84B] shadow-lg rounded-lg p-5 px-8 hover:bg-[#e4d035] transition-colors"
                        >
                            Back
                        </Button>
                    </Link>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => window.location.reload()}
                        className="text-white border-2 border-[#BE6500] bg-[#E5B84B] shadow-lg rounded-lg p-5 px-8 hover:bg-[#e4d035] transition-colors"
                    >
                        Retry
                    </Button>
                </div>

                {/* Game Board Section */}
                <div className="container px-4 mx-auto relative z-10 flex justify-center items-center h-full">
                    <MedGame />
                </div>
            </div>
        </>
  );
};

export default Indexmedium;
