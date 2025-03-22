import React, { useState } from 'react';
import HardGame from "../components/Gameboard.jsx";
import EasyGame from "../components/BaghChal.jsx";
import { Button } from '../components/ui/Button.jsx';
import { RefreshCw, ArrowLeft, Info } from 'lucide-react';
import bgImage from "../assets/Frame.jpg";


const Indexeasy = () => {
  return (
    <>
      <div
        className="fixed inset-0 bg-no-repeat bg-cover bg-center -z-10 blur-md opacity-80 "
        style={{ backgroundImage: `url(${bgImage})` }}
      ></div>
      <div className="min-h-screen  absolute mx-0 px-0 w-full bg-transparent  overflow-hidden scrollbar-hide "

      >
        {/* Background decorative elements */}
        {/* <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-24 h-24 rounded-full bg-white opacity-5 animate-pulse-soft"></div>
        <div className="absolute bottom-40 right-20 w-32 h-32 rounded-full bg-white opacity-5 animate-pulse-soft"></div>
        <div className="absolute top-1/2 left-1/3 w-40 h-40 rounded-full bg-white opacity-5 animate-pulse-soft"></div>
      </div> */}

        {/* Game content */}
        <div className="container px-4 mx-auto relative z-10">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => window.location.reload()}
            className="text-white hover:bg-white/10 transition-colors absolute right-10 top-20  "
          >
            <RefreshCw size={20} />
          </Button>

          {/* Game board */}
          <div className="flex justify-center items-center ">
            <EasyGame />
          </div>
        </div>
      </div>
    </>
  );
};

export default Indexeasy;
