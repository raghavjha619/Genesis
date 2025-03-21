import React from 'react'
import { Link } from 'react-router-dom'
function HomeButton({to, text}) {
    return (
        <>
            <Link
                to={to}
                className={`relative px-6 py-3 text-lg font-bold text-white
                        bg-gradient-to-b from-yellow-700 to-yellow-900
                        border-4 border-yellow-500 rounded-lg shadow-md 
                        hover:shadow-xl hover:scale-105 transition 
                        duration-300 ease-in-out 
                        before:absolute before:inset-0 before:bg-yellow-400 
                        before:opacity-10 before:rounded-lg 
                        active:scale-95 `}
            >
                {text}
            </Link>
        </>
    )
}

export default HomeButton
