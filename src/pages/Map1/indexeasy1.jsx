import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import EasyGame from "../../components/Map1/easy.jsx";
import { Button } from "../../components/ui/Button.jsx";
import bgImage from "../../assets/Frame.jpg";
import { useSound } from "../../components/SoundContext.jsx";
import sample from "../../assets/ravan.svg";

const Indexeasy = () => {
  const { isMuted, toggleMute } = useSound(); // Get global mute state
  const [showPopup, setShowPopup] = useState(false);
  const popupRef = useRef(null);

  // Automatically show the popup after a short delay
  useEffect(() => {
    setTimeout(() => {
      setShowPopup(true);
    }, 300); // Delay for smooth transition
  }, []);

  // Close popup when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowPopup(false);
      }
    };

    if (showPopup) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showPopup]);

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
              className="text-xl text-white border-2 border-[#BE6500] bg-[#E5B84B] shadow-lg rounded-lg p-5 px-8 hover:bg-[#e4d035] transition-colors"
            >
              Back
            </Button>
          </Link>

          <div className="flex flex-col gap-4">
            {/* Mute/Unmute Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMute}
              className="text-xl text-white border-2 border-[#BE6500] bg-[#E5B84B] shadow-lg rounded-lg py-5 px-1 hover:bg-[#e4d035] transition-colors w-auto"
            >
              {isMuted ? "Unmute" : "Mute"}
            </Button>

            {/* Retry Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => window.location.reload()}
              className="text-xl text-white border-2 border-[#BE6500] bg-[#E5B84B] shadow-lg rounded-lg p-5 px-8 hover:bg-[#e4d035] transition-colors"
            >
              Retry
            </Button>
          </div>
        </div>

        {/* Game Board Section */}
        <div className="container px-4 mx-auto relative z-10 flex justify-center items-center h-full">
          <EasyGame />
        </div>

        {/* SVG Popup (Appears from Bottom) */}
        <div
          ref={popupRef}
          className="fixed left-72 transform -translate-x-1/2 transition-all duration-500 ease-in-out z-[999999]"
          style={{
            bottom: showPopup ? "10%" : "-100%", // Pops up from bottom smoothly
            opacity: showPopup ? 1 : 0, // Fade in effect
          }}
        >
          <img
            src={sample}
            alt="Ravan"
            className="w-48 h-48 md:w-64 md:h-64 shadow-lg rounded-lg border-4 border-yellow-400 bg-white"
          />
        </div>
      </div>
    </>
  );
};

export default Indexeasy;
