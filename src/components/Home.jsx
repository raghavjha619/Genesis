import React from "react";
import { useNavigate, Link } from "react-router-dom";
import bgImage from "../assets/homepagebg.webp"
import HomeButton from "./ui/HomeButton";

const Home = () => {
    const navigate = useNavigate();

    return (
        <div   className="h-screen w-screen bg-cover bg-center  bg-no-repeat z-10" style={{ backgroundImage: `url(${bgImage})` }}>
            <div className="flex flex-col items-center justify-center min-h-screen text-white"
            >
                <h1 className="text-4xl font-bold mb-8">Bagh-Chal Game</h1>
                <div className="flex flex-col gap-4">
                    <HomeButton  to = '/game' text = "Play" />
                    <button
                        className="px-6 py-3 bg-gray-700 hover:bg-gray-800 rounded-lg text-lg"
                        onClick={() => navigate("/settings")}
                    >
                        Settings
                    </button>
                    <button
                        className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 rounded-lg text-lg"
                        onClick={() => navigate("/rules")}
                    >
                        Rules
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Home;
