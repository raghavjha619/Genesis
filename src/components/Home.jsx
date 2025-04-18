import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import bgImage from "../assets/Frame.jpg";
import Heading from "../assets/Group2.svg";
import Play from "../assets/Play.svg";
import easy from "../assets/easy.svg";
import med from "../assets/Medium.svg";
import hard from "../assets/hard.svg";
import RulesIcon from "../assets/Rules.svg";
import { Button } from "./ui/Button.jsx";
import { ArrowLeft } from "lucide-react";
import asset1 from "../assets/ravancap.svg";
import asset2 from "../assets/vanarveerwin.svg";
import bgscroll from "../assets/scroll.png";
import map1 from "../assets/map1.png";
import map2 from "../assets/map2.png";
import map3 from "../assets/map3.png";

const Home = () => {
  const [showRules, setShowRules] = useState(false);
  const [showDifficulty, setShowDifficulty] = useState(false);
  const [showMapSelection, setShowMapSelection] = useState(false);
  const [selectedMap, setSelectedMap] = useState(null);

  const rulesRef = useRef(null);
  const difficultyRef = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (rulesRef.current && !rulesRef.current.contains(event.target)) {
        setShowRules(false);
      }
      if (
        difficultyRef.current &&
        !difficultyRef.current.contains(event.target)
      ) {
        setShowDifficulty(false);
      }
      if (mapRef.current && !mapRef.current.contains(event.target)) {
        setShowMapSelection(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className="h-screen w-screen bg-cover bg-center bg-no-repeat z-10 flex flex-col items-center justify-center text-white"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Link className="flex">
        <img src={Heading} alt="Game Heading" className="w-96 mb-12" />
      </Link>
      <div className="flex flex-col">
        <Link
          className="flex hover:scale-105 transition transform duration-300"
          onClick={() => setShowMapSelection(true)}
        >
          <img src={Play} alt="Play Button" className="w-96 mb-2" />
        </Link>
        <button
          className="flex hover:scale-105 transition transform duration-300"
          onClick={() => setShowRules(true)}
        >
          <img src={RulesIcon} alt="Rules" className="w-96 mb-2" />
        </button>
      </div>

      {/* Difficulty Pop-up */}
      {showDifficulty && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div
            ref={difficultyRef}
            className="relative max-w-lg min-w-[40%] mx-auto rounded-lg p-4 sm:p-8 md:p-12 flex flex-col items-center shadow-lg bg-[#f5e1c0] border-4 border-[#b08968] text-[#5a4631] font-[Cinzel Decorative] rules-popup"
          >
            {/* Title Section */}
            <div className="md:mb-16 my-8 text-2xl xs:text-3xl md:text-4xl font-bold uppercase text-center w-full font-Inter">
              Select Difficulty
            </div>

            {/* Difficulty Options in a Row */}
            <div className="flex flex-col justify-center gap-4">
              <Link
                className="flex hover:scale-105 transition-transform duration-300"
                to={`/${selectedMap}/easygame`}
              >
                <img src={easy} alt="Easy" className="w-96 mb-2" />
              </Link>
              <Link
                className="flex hover:scale-105 transition-transform duration-300"
                to={`/${selectedMap}/mediumgame`}
              >
                <img src={med} alt="Medium" className="w-96 mb-2" />
              </Link>
              <Link
                className="flex hover:scale-105 transition-transform duration-300"
                to={`/${selectedMap}/hardgame`}
              >
                <img src={hard} alt="Hard" className="w-96 mb-2" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {showMapSelection && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div
            ref={mapRef}
            className="relative max-w-4xl min-w-[60%] mx-auto rounded-lg p-8 flex flex-col items-center shadow-lg bg-[#f5e1c0] border-4 border-[#b08968] text-[#5a4631] font-[Cinzel Decorative] rules-popup"
          >
            {/* Title Section */}
            <div className="text-2xl xs:text-3xl md:text-4xl font-bold uppercase text-center w-full mb-8 font-Inter">
              Select Map
            </div>

            {/* Map Selection Options */}
            <div className="flex md:flex-row flex-col justify-around w-full items-center  ">
              <button
                className="w-40 h-40 border-4 border-[#b08968] rounded-lg flex items-center justify-center cursor-pointer hover:scale-105 transition-transform duration-300 mb-10 mx-10 "
                onClick={() => {
                  setSelectedMap("map1");
                  setShowMapSelection(false);
                  setShowDifficulty(true);
                }}
              >
                <img
                  src={map1}
                  alt="Map 1"
                  className="w-full h-full object-cover rounded-lg"
                />
              </button>

              <button
                className="w-40 h-40 border-4 border-[#b08968] rounded-lg flex items-center justify-center cursor-pointer hover:scale-105 transition-transform duration-300 mb-10 mx-10"
                onClick={() => {
                  setSelectedMap("map2");
                  setShowMapSelection(false);
                  setShowDifficulty(true);
                }}
              >
                <img
                  src={map2}
                  alt="Map 2"
                  className="w-full h-full object-cover rounded-lg"
                />
              </button>

              <button
                className="w-40 h-40 border-4 border-[#b08968] rounded-lg flex items-center justify-center cursor-pointer hover:scale-105 transition-transform duration-300 mb-10 mx-10"
                onClick={() => {
                  setSelectedMap("map3");
                  setShowMapSelection(false);
                  setShowDifficulty(true);
                }}
              >
                <img
                  src={map3}
                  alt="Map 3"
                  className="w-full h-full object-cover rounded-lg"
                />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Rules Pop-up */}
      {showRules && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="h-[90%] w-[80%] relative">
            {/* Background Image (Stretched without Cropping) */}
            <img
              src={bgscroll}
              alt="Background"
              className="h-full w-full object-fill absolute -z-10"
            />

            {/* Rules Popup (Centered, Scrollable, Hidden Scrollbar) */}
            <div
              ref={rulesRef}
              className=" absolute top-1/2 left-1/2 h-[80%] w-[65%] transform -translate-x-1/2 -translate-y-1/2 p-1 overflow-y-auto max-h-full custom-scrollbar"
            >
              {/* Title */}
              <h2 className="text-xl sm:text-2xl lg:text-4xl font-bold mb-6 text-center text-[#4a321f] ">
                How to Play Vijaypath
              </h2>

              {/* Game Rules Content */}
              <div className="space-y-6 sm:text-xl text-[#1c3d0a] font-medium ">
                <p className="">
                  Vijaypath is a strategic board game played on a grid, where
                  two sides compete with distinct roles and objectives.
                </p>

                <h3 className="font-bold text-xl sm:text-xl lg:text-3xl text-[#4a321f]">
                  Objective
                </h3>
                <p>
                  <strong>Ravan</strong>: Capture <strong>Vanarveers</strong> by
                  jumping over them.
                </p>
                <p>
                  <strong>Vanarveer</strong>: Block all Ravans so they cannot
                  move.
                </p>

                <h3 className="font-bold text-xl sm:text-xl lg:text-3xl text-[#4a321f]">
                  Game Play
                </h3>
                <ul className="list-disc pl-8 space-y-4">
                  <li>
                    You play as <strong>Vanarveer</strong> and the computer
                    plays as <strong>Ravan.</strong>
                  </li>
                  <li>
                    Start by placing all your <strong>Vanarveers</strong> on any
                    empty intersection.
                  </li>
                  <li>
                    Ravans can move to adjacent empty intersections or{" "}
                    <strong>jump over a Vanarveer</strong> to capture it.
                  </li>
                  <li>
                    Once all Vanarveers are placed, you can move them to
                    adjacent empty intersections.
                  </li>
                  <li>
                    <strong>Ravans win</strong> if they capture{" "}
                    <strong>sufficient Vanarveers.</strong>
                  </li>
                  <li>
                    <strong>Vanarveers win</strong> if they block all Ravans
                    from moving.
                  </li>
                </ul>
                <h3 className="font-bold text-xl sm:text-xl lg:text-3xl mt-6 text-[#4a321f] ">
                  Examples
                </h3>
                <p className="text-lg sm:text-xl">
                  <strong>Example 1:</strong> Pictorial representation of
                  possible moves for Ravan
                </p>
                <div className="flex sm:flex-row flex-col gap-4 mt-4 w-full justify-around">
                  <div className="flex flex-col text-center">
                    <img
                      src={asset1}
                      alt="Example 1 Image"
                      className="rounded-lg shadow-md max-h-[400px] object-contain mx-auto"
                    />
                  </div>
                </div>

                <p className="text-lg sm:text-xl mt-6">
                  <strong>Example 2:</strong> Vanarveers blocking a Ravan, this
                  is an example of a victory for Vanarveers.
                </p>
                <div className="flex sm:flex-row flex-col gap-4 mt-4 w-full justify-around">
                  <div className="flex flex-col text-center">
                    <img
                      src={asset2}
                      alt="Example 2 Image"
                      className="rounded-lg shadow-md max-h-[400px] object-contain mx-auto"
                    />
                  </div>
                </div>
              </div>

              {/* Start Playing Button */}
              <Button
                className="w-full mt-8 py-4 bg-brown-700 text-brown-800 text-4xl font-bold hover:text-brown-900 rounded-xl text-[#4a321f] "
                onClick={() => setShowRules(false)}
              >
                Start Playing
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
