import React, { createContext, useState, useContext } from "react";

// Create Context
const SoundContext = createContext();

// Custom Hook to use the sound context
export const useSound = () => useContext(SoundContext);

// Provider Component
export const SoundProvider = ({ children }) => {
    const [isMuted, setIsMuted] = useState(false);

    const toggleMute = () => {
        setIsMuted(prev => !prev);
    };

    return (
        <SoundContext.Provider value={{ isMuted, toggleMute }}>
            {children}
        </SoundContext.Provider>
    );
};
