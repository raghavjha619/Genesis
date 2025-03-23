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
            if (difficultyRef.current && !difficultyRef.current.contains(event.target)) {
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
                <Link className="flex hover:scale-105 transition transform duration-300" onClick={() => (setShowDifficulty(true))}>
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
                        className="max-w-lg rounded-lg p-6 relative shadow-lg rules-popup"
                        style={{
                            backgroundColor: "#f5e1c0", // Warm parchment color
                            backgroundImage: "url('/path-to-texture.jpg')", // Texture image
                            backgroundSize: "cover",
                            border: "4px solid #b08968", // Aged brownish border
                            fontFamily: "'Cinzel Decorative', serif", // Ancient-looking font
                            color: "#5a4631" // Dark brown text for readability
                        }}
                    >
                        <h2 className="text-2xl font-bold mb-4">How to Play Baghchal</h2>
                        <div className="space-y-3 text-sm">
                            <p>Baghchal is a traditional board game from Nepal, played on a 5×5 grid.</p>
                            <h3 className="font-semibold text-lg">Objective</h3>
                            <p><strong>Ravan (👹)</strong>: Capture 5 Vanarveers by jumping over them.</p>
                            <p><strong>Vanarveer (🐵)</strong>: Block all Ravans so they cannot move.</p>
                            <h3 className="font-semibold text-lg">Game Play</h3>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>You play as Vanarveer and the computer plays as Ravan.</li>
                                <li>Start by placing your 20 Vanarveers one by one on any empty intersection.</li>
                                <li>Ravans can move to adjacent empty intersections or jump over a Vanarveer to capture it.</li>
                                <li>After all 20 Vanarveers are placed, you can move existing Vanarveers to adjacent empty intersections.</li>
                                <li>Ravans win if they capture 5 Vanarveers.</li>
                                <li>Vanarveers win if they block all Ravans from moving.</li>
                            </ul>
                            <div className="mt-4">
                                <h3 className="font-semibold text-lg">Examples</h3>
                                <p>Example 1: A Ravan capturing a Vanarveer</p>
                                {/* <img src={Example1} alt="Example 1" className="w-full my-2 rounded" /> */}
                                <p>Example 2: Vanarveers blocking a Ravan</p>
                                {/* <img src={NewVanarveer} alt="Updated Vanarveer" className="w-full my-2 rounded" /> */}
                            </div>
                        </div>
                        <Button
                            className="w-full mt-4 bg-brown-700 text-white hover:bg-brown-800"
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
                            <Link className="flex hover:scale-105 transition-transform duration-300" to="/easygame">
                                <img src={easy} alt="Easy" className="w-96 mb-2" />
                            </Link>
                            <Link className="flex hover:scale-105 transition-transform duration-300" to="/mediumgame">
                                <img src={med} alt="Medium" className="w-96 mb-2" />
                            </Link>
                            <Link className="flex hover:scale-105 transition-transform duration-300" to="/hardgame">
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
