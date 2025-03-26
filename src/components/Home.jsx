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

const Home = () => {
  const [showRules, setShowRules] = useState(false);
  const [showDifficulty, setShowDifficulty] = useState(false);

  const rulesRef = useRef(null);
  const difficultyRef = useRef(null);

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
          onClick={() => setShowDifficulty(true)}
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

      {/* Rules Pop-up */}
      {showRules && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div
            ref={rulesRef}
            className="max-w-2xl w-full rounded-lg p-10 relative shadow-lg rules-popup overflow-y-auto max-h-screen custom-scrollbar"
            style={{
              backgroundColor: "#f5e1c0", // Warm parchment color
              backgroundImage: "url('/path-to-texture.jpg')", // Subtle texture
              backgroundSize: "cover",
              border: "8px solid #b08968", // Aged brownish border
              fontFamily: "'Cinzel Decorative', serif", // Ancient-style font
              color: "#4a321f", // Darker brown for readability
              fontSize: "26px", // Large text for elderly users
              lineHeight: "1.8", // Spaced-out text
              maxHeight: "90vh", // Keeps content within screen
              overflowY: "auto", // Enables smooth scrolling
              scrollbarWidth: "thin", // For Firefox
              scrollbarColor: "#b08968 #f5e1c0", // Scroll thumb and track color
            }}
          >
            <h2 className="text-5xl font-bold mb-6 text-center">
              🎲 How to Play Baghchal
            </h2>
            <div className="space-y-6 text-3xl">
              <p>
                Baghchal is a traditional board game from Nepal, played on a{" "}
                <strong>5×5 grid.</strong>
              </p>

              <h3 className="font-semibold text-4xl">🎯 Objective</h3>
              <p>
                <strong>Ravan (👹)</strong>: Capture <strong>Vanarveers</strong>{" "}
                by jumping over them.
              </p>
              <p>
                <strong>Vanarveer (🐵)</strong>: Block all Ravans so they cannot
                move.
              </p>

              <h3 className="font-semibold text-4xl">🕹️ Game Play</h3>
              <ul className="list-disc pl-8 space-y-4">
                <li>
                  You play as <strong>Vanarveer</strong> and the computer plays
                  as <strong>Ravan.</strong>
                </li>
                <li>
                  Start by placing your <strong>all of your Vanarveers</strong>{" "}
                  on any empty intersection.
                </li>
                <li>
                  Ravans can move to adjacent empty intersections or{" "}
                  <strong>jump over a Vanarveer</strong> to capture it.
                </li>
                <li>
                  Once all Vanarveers are placed, you can move them to adjacent
                  empty intersections.
                </li>
                <li>
                  <strong>Ravans win</strong> if they capture{" "}
                  <strong>sufficient Vanarveers.</strong>
                </li>
                <li>
                  <strong>Vanarveers win</strong> if they block all Ravans from
                  moving.
                </li>
              </ul>

              {/* <div className="mt-6">
                <h3 className="font-semibold text-4xl">📌 Examples</h3>
                <p>
                  ✅ <strong>Example 1:</strong> A Ravan capturing a Vanarveer
                </p>

                <p>
                  ✅ <strong>Example 2:</strong> Vanarveers blocking a Ravan
                </p>
              </div> */}
            </div>

            <Button
              className="w-full mt-8 py-4 bg-brown-700 text-brown-800 text-4xl font-bold hover:text-brown-900 rounded-xl"
              onClick={() => setShowRules(false)}
            >
              🎭 Start Playing
            </Button>
          </div>
        </div>
      )}

      {/* Difficulty Pop-up */}
      {showDifficulty && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div
            ref={difficultyRef}
            className="relative max-w-lg  min-w-[40%] mx-auto rounded-lg p-4 sm:p-8 md:p-12 flex flex-col items-center shadow-lg bg-[#f5e1c0] bg-cover border-4 border-[#b08968] text-[#5a4631] font-[Cinzel Decorative] rules-popup"
          >
            {/* Title Section */}
            <div className="md:mb-16 my-8 text-2xl xs:text-3xl md:text-4xl font-bold uppercase text-center w-full font-Inter">
              Select Difficulty
            </div>

            {/* Difficulty Options in a Row */}
            <div className="flex flex-col justify-center gap-4">
              <Link
                className="flex hover:scale-105 transition-transform duration-300"
                to="/easygame"
              >
                <img src={easy} alt="Easy" className="w-96 mb-2" />
              </Link>
              <Link
                className="flex hover:scale-105 transition-transform duration-300"
                to="/mediumgame"
              >
                <img src={med} alt="Medium" className="w-96 mb-2" />
              </Link>
              <Link
                className="flex hover:scale-105 transition-transform duration-300"
                to="/hardgame"
              >
                <img src={hard} alt="Hard" className="w-96 mb-2" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
