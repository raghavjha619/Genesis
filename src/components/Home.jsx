import React, { useState } from "react";
import { Link } from "react-router-dom";
import bgImage from "../assets/Frame.jpg";
import Heading from "../assets/Group2.svg";
import Play from "../assets/Play.svg";
import Setting from "../assets/Setting.svg";
import RulesIcon from "../assets/Rules.svg";
// import Example1 from "../assets/example1.jpg"; 
// import NewVanarveer from "../assets/new-monkey.jpg"; 
import { Button } from "./ui/Button";
import { ArrowLeft } from "lucide-react";

const Home = () => {
    const [showRules, setShowRules] = useState(false);

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
                <Link className="flex hover:scale-105 transition transform duration-300" to="/game">
                    <img src={Play} alt="Play Button" className="w-96 mb-2" />
                </Link>
                <button 
                    className="flex hover:scale-105 transition transform duration-300" 
                    onClick={() => setShowRules(false)}
                >
                    <img src={Setting} alt="Settings" className="w-96 mb-2" />
                </button>
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
                        <Button 
                            variant="ghost" 
                            size="icon" 
                            className="absolute right-2 top-2" 
                            onClick={() => setShowRules(false)}
                        >
                            <ArrowLeft size={20} />
                        </Button>
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
        </div>
    );
};

export default Home;
