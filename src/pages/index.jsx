import React, { useState } from 'react';
import GameBoard from  "../components/BaghChal";
import { Button } from '../components/ui/button';
import { RefreshCw, ArrowLeft, Info } from 'lucide-react';

const Index = () => {
  const [showRules, setShowRules] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-900 to-indigo-700 overflow-hidden absolute mx-0 px-0 w-full ">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-24 h-24 rounded-full bg-white opacity-5 animate-pulse-soft"></div>
        <div className="absolute bottom-40 right-20 w-32 h-32 rounded-full bg-white opacity-5 animate-pulse-soft"></div>
        <div className="absolute top-1/2 left-1/3 w-40 h-40 rounded-full bg-white opacity-5 animate-pulse-soft"></div>
      </div>

      {/* Game content */}
      <div className="container px-4 mx-auto relative z-10">
        {/* Header */}
        <header className="flex justify-between items-center pt-4 pb-2">
          <h1 className="text-white font-light text-2xl">Baghchal <span className="text-sm opacity-70">Tiger-Goat Game</span></h1>
          <div className="flex gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setShowRules(!showRules)}
              className="text-white hover:bg-white/10 transition-colors"
            >
              <Info size={20} />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => window.location.reload()}
              className="text-white hover:bg-white/10 transition-colors"
            >
              <RefreshCw size={20} />
            </Button>
          </div>
        </header>
        
        {/* Game board */}
        <div className="flex justify-center items-center pt-4">
          <GameBoard />
        </div>

        {/* Rules overlay */}
        {showRules && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
            <div className="bg-white max-w-lg rounded-lg p-6 relative">
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
                <p><strong>Tigers (🐯)</strong>: Capture 5 goats by jumping over them.</p>
                <p><strong>Goats (🐐)</strong>: Block all tigers so they cannot move.</p>
                
                <h3 className="font-semibold text-lg">Game Play</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>You play as Goats and the computer plays as Tigers.</li>
                  <li>Start by placing your 20 goats one by one on any empty intersection.</li>
                  <li>Tigers can move to adjacent empty intersections or jump over a goat to capture it.</li>
                  <li>After all 20 goats are placed, you can move existing goats to adjacent empty intersections.</li>
                  <li>Tigers win if they capture 5 goats.</li>
                  <li>Goats win if they block all tigers from moving.</li>
                </ul>
              </div>
              <Button 
                className="w-full mt-4" 
                onClick={() => setShowRules(false)}
              >
                Start Playing
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;