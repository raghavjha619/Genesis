import React from "react";
import { useNavigate, Link } from "react-router-dom";
import bgImage from "../assets/Frame.jpg"
import HomeButton from "./ui/HomeButton";
import Heading from "../assets/Group2.svg"
import Play from "../assets/Play.svg"
import Setting from "../assets/Setting.svg"
import Rules from "../assets/Rules.svg"

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="h-screen w-screen bg-cover bg-center  bg-no-repeat z-10" style={{ backgroundImage: `url(${bgImage})` }}>
            <div className="flex flex-col items-center justify-center min-h-screen text-white"
            >
                <Link className="flex ">
                    <img src={Heading} alt="Game Heading" className="w-96 mb-12 " />
                </Link>
                <div className="flex flex-col ">

                    {/* <HomeButton  to = '/game' text = "Play" /> */}
                    <Link className="flex hover:scale-105 transition transform duration-300 " to="/game">
                        <img src={Play} alt="Game Heading" className="w-96 mb-2 " />
                    </Link>
                    <Link className="flex hover:scale-105 transition transform duration-300 " to="">
                        <img src={Setting} alt="Game Heading" className="w-96 mb-2 " />
                    </Link>
                    <Link className="flex hover:scale-105 transition transform duration-300 " to="">
                        <img src={Rules} alt="Game Heading" className="w-96 mb-2 " />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Home;
