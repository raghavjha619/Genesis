import React, { useState, useEffect } from 'react';
import { cn } from '../components/lib/util';
import { toast } from 'sonner';
import { RefreshCw } from 'lucide-react';
import ravan from "../assets/ravan.svg"
import hanuman from "../assets/hanuman.svg"

const BOARD_SIZE = 5;
const MAX_GOATS = 20;
const Ravan_COUNT = 5;
//first commit
const BOARD_LAYOUT = [
    // Top row
    { position: [0, 0], connections: [[0, 1], [1, 0], [1, 1]] },
    { position: [0, 1], connections: [[0, 0], [0, 2], [1, 1]] },
    { position: [0, 2], connections: [[0, 1], [1,1],[0, 3], [1, 2],[1,3]] },
    { position: [0, 3], connections: [[0, 2], [0, 4], [1, 3]] },
    { position: [0, 4], connections: [[0, 3], [1, 4], [1, 3]] },

    // Second row
    { position: [1, 0], connections: [[0, 0], [1, 1], [2, 0]] },
    { position: [1, 1], connections: [[0, 0], [0, 1], [0, 2], [1, 2], [2, 1],[2,2],[1,0],[2,0]] },
    { position: [1, 2], connections: [[0, 2], [1, 1], [1, 3], [2, 2]] },
    { position: [1, 3], connections: [[0, 3], [0, 4], [1, 2], [1, 4],[2,4], [2, 2], [2, 3],[0,2]] },
    { position: [1, 4], connections: [[0, 4], [1, 3], [2, 4]] },

    // Middle row
    { position: [2, 0], connections: [[1, 0], [2, 1], [3, 0],[3,1]] },
    { position: [2, 1], connections: [[1, 1], [2, 0], [2, 2], [3, 1]] },
    { position: [2, 2], connections: [[1, 1], [1, 2], [1, 3], [2, 1], [2, 3], [3, 1], [3, 2], [3, 3]] },
    { position: [2, 3], connections: [[1, 3], [2, 2], [2, 4], [3, 3]] },
    { position: [2, 4], connections: [[1, 4],[1,3],[3,3], [2, 3], [3, 4]] },

    // Fourth row
    { position: [3, 0], connections: [[2, 0], [3, 1], [4, 0]] },
    { position: [3, 1], connections: [[2, 1],[2,0],[2, 2], [3, 0], [3, 2], [4, 0], [4, 1],[4,2]] },
    { position: [3, 2], connections: [[2, 2], [3, 1], [3, 3], [4, 2]] },
    { position: [3, 3], connections: [[2, 2], [2, 3], [3, 2], [3, 4], [4, 2], [4, 3],[2,4],[4,4] ]},
    { position: [3, 4], connections: [[2, 4], [3, 3], [4, 4]] },

    // Bottom row
    { position: [4, 0], connections: [[3, 0], [3, 1], [4, 1]] },
    { position: [4, 1], connections: [[3, 1], [4, 0], [4, 2]] },
    { position: [4, 2], connections: [[3, 2], [3, 3], [4, 1], [4, 3]] },
    { position: [4, 3], connections: [[3, 3], [4, 2], [4, 4]] },
    { position: [4, 4], connections: [[3, 4], [4, 3],[3,3]] },
];

// Helper function to find connections for a position
const getConnections = (position) => {
    const point = BOARD_LAYOUT.find(p =>
        p.position[0] === position[0] && p.position[1] === position[1]
    );
    return point ? point.connections : [];
};

// Check if two positions are equal
const positionsEqual = (pos1, pos2) => {
    return pos1[0] === pos2[0] && pos1[1] === pos2[1];
};

// Check if position is in the list
const positionInList = (pos, list) => {
    return list.some(p => positionsEqual(p, pos));
};

// Find the middle position between two positions
const getMiddlePosition = (pos1, pos2) => {
    // Only consider positions that are two steps away (for tiger jumps)
    if (Math.abs(pos1[0] - pos2[0]) === 2 && pos1[1] === pos2[1]) {
        return [Math.min(pos1[0], pos2[0]) + 1, pos1[1]];
    }
    if (Math.abs(pos1[1] - pos2[1]) === 2 && pos1[0] === pos2[0]) {
        return [pos1[0], Math.min(pos1[1], pos2[1]) + 1];
    }
    if (Math.abs(pos1[0] - pos2[0]) === 2 && Math.abs(pos1[1] - pos2[1]) === 2) {
        return [Math.min(pos1[0], pos2[0]) + 1, Math.min(pos1[1], pos2[1]) + 1];
    }
    return null;
};

const Goat = () => {
    const [gameState, setGameState] = useState({
        board: Array(BOARD_SIZE).fill(null).map(() => Array(BOARD_SIZE).fill(null)),
        currentPlayer: 'goat',
        selectedPiece: null,
        goatsPlaced: 0,
        goatsCaptured: 0,
        possibleMoves: [],
        gameOver: false,
        winner: null,
    });

    // Initialize the board with Ravan
    useEffect(() => {
        const initialBoard = Array(BOARD_SIZE).fill(null).map(() => Array(BOARD_SIZE).fill(null));

        // Place Ravan at the corners
        initialBoard[0][0] = 'tiger';
        initialBoard[0][4] = 'tiger';
        initialBoard[4][0] = 'tiger';
        initialBoard[4][4] = 'tiger';

        setGameState(prev => ({
            ...prev,
            board: initialBoard
        }));
    }, []);

    // Check if the game is over
    useEffect(() => {
        // Tiger wins if they capture 5 or more goats
        if (gameState.goatsCaptured >=3) {
            setGameState(prev => ({
                ...prev,
                gameOver: true,
                winner: 'tiger'
            }));
            toast.success("Ravan win! They captured 3 vanar veer.");
            return;
        }

        // Goat wins if Ravan can't move
        if (gameState.goatsPlaced === MAX_GOATS) {
            // Check if Ravan can move
            let tigerCanMove = false;

            for (let i = 0; i < BOARD_SIZE; i++) {
                for (let j = 0; j < BOARD_SIZE; j++) {
                    if (gameState.board[i][j] === 'tiger') {
                        const moves = getPossibleMoves([i, j], 'tiger');
                        if (moves.length > 0) {
                            tigerCanMove = true;
                            break;
                        }
                    }
                }
                if (tigerCanMove) break;
            }

            if (!tigerCanMove) {
                setGameState(prev => ({
                    ...prev,
                    gameOver: true,
                    winner: 'goat'
                }));
                toast.success("Goats win! Ravan are trapped.");
            }
        }
    }, [gameState.goatsCaptured, gameState.goatsPlaced, gameState.board]);

    // AI move for tiger
    useEffect(() => {
        if (gameState.currentPlayer === 'tiger' && !gameState.gameOver) {
            // Small delay to make it seem like the computer is thinking
            const timerRef = setTimeout(makeAIMove, 800);
            return () => clearTimeout(timerRef);
        }
    }, [gameState.currentPlayer, gameState.gameOver]);

    const getPossibleMoves = (position, pieceType) => {
        if (!pieceType) return [];

        const [row, col] = position;
        const connections = getConnections(position);
        const diagonalMoves = getDiagonalMoves(position); // New function to get diagonal moves

        if (pieceType === 'goat') {
            // Goats can move to adjacent empty positions (both orthogonal and diagonal)
            return [...connections, ...diagonalMoves].filter(([r, c]) => !gameState.board[r][c]);
        } else if (pieceType === 'tiger') {
            const moves = [];

            // Ravan can move to adjacent empty positions
            connections.forEach(([r, c]) => {
                if (!gameState.board[r][c]) {
                    moves.push([r, c]);
                }
            });

            // Ravan can also jump over adjacent goats to empty positions
            const jumpMoves = BOARD_LAYOUT.map(point => point.position)
                .filter(([r, c]) => {
                    if (gameState.board[r][c]) return false; // Must be empty

                    // Check if there's a goat to jump over
                    const middle = getMiddlePosition(position, [r, c]);
                    if (!middle) return false;

                    const [middleRow, middleCol] = middle;
                    return gameState.board[middleRow][middleCol] === 'goat';
                });

            return [...moves, ...jumpMoves];
        }

        return [];
    };

    // Function to get diagonal moves
 const getDiagonalMoves = (position) => {
    // Find the current position object in BOARD_LAYOUT
    const currentNode = BOARD_LAYOUT.find(node =>
        node.position[0] === position[0] && node.position[1] === position[1]
    );

    if (!currentNode) {
        console.error("Invalid position:", position);
        return []; // Return empty array if the position is not found
    }

    // Filter the connections to include only diagonal moves
    const diagonalMoves = currentNode.connections.filter(([r, c]) => {
        const isDiagonal = Math.abs(r - position[0]) === 1 && Math.abs(c - position[1]) === 1;
        return isDiagonal;
    });

    return diagonalMoves;
};

    // Handle piece selection and movement
    const handlePointClick = (position) => {
        if (gameState.gameOver) return;

        const [row, col] = position;
        const pieceAtPosition = gameState.board[row][col];

        // If it's goat's turn and all goats haven't been placed yet
        if (gameState.currentPlayer === 'goat' && gameState.goatsPlaced < MAX_GOATS) {
            if (!pieceAtPosition) {
                const newBoard = [...gameState.board.map(row => [...row])];
                newBoard[row][col] = 'goat';

                setGameState(prev => ({
                    ...prev,
                    board: newBoard,
                    goatsPlaced: prev.goatsPlaced + 1,
                    currentPlayer: 'tiger',
                    selectedPiece: null,
                    possibleMoves: []
                }));
            }
            return;
        }

        // If a piece is already selected
        if (gameState.selectedPiece) {
            const [selectedRow, selectedCol] = gameState.selectedPiece;
            const selectedPieceType = gameState.board[selectedRow][selectedCol];

            if (positionsEqual(position, gameState.selectedPiece)) {
                setGameState(prev => ({
                    ...prev,
                    selectedPiece: null,
                    possibleMoves: []
                }));
                return;
            }

            if (positionInList(position, gameState.possibleMoves)) {
                const newBoard = [...gameState.board.map(row => [...row])];

                // Move the piece
                newBoard[row][col] = selectedPieceType;
                newBoard[selectedRow][selectedCol] = null;

                let goatsCaptured = gameState.goatsCaptured;

                // Check if a tiger captured a goat
                if (selectedPieceType === 'tiger') {
                    const middle = getMiddlePosition(gameState.selectedPiece, position);

                    if (middle) {
                        const [middleRow, middleCol] = middle;
                        if (newBoard[middleRow][middleCol] === 'goat') {
                            newBoard[middleRow][middleCol] = null;
                            goatsCaptured++;
                            toast("A goat was captured!", {
                                style: { backgroundColor: '#FF7F50', color: 'white' }
                            });
                        }
                    }
                }

                setGameState(prev => ({
                    ...prev,
                    board: newBoard,
                    currentPlayer: prev.currentPlayer === 'goat' ? 'tiger' : 'goat',
                    selectedPiece: null,
                    possibleMoves: [],
                    goatsCaptured
                }));
                return;
            }
        }

        // Select a piece if it belongs to the current player
        if (pieceAtPosition === gameState.currentPlayer) {
            const possibleMoves = getPossibleMoves(position, pieceAtPosition);

            setGameState(prev => ({
                ...prev,
                selectedPiece: position,
                possibleMoves
            }));
        }
    };


    // AI move for goats
const makeAIMove = () => {
    const newBoard = [...gameState.board.map(row => [...row])];

    if (gameState.goatsPlaced < MAX_GOATS) {
        // AI places a goat on a random empty spot
        const emptySpots = [];
        for (let i = 0; i < BOARD_SIZE; i++) {
            for (let j = 0; j < BOARD_SIZE; j++) {
                if (!newBoard[i][j]) {
                    emptySpots.push([i, j]);
                }
            }
        }

        if (emptySpots.length > 0) {
            const randomSpot = emptySpots[Math.floor(Math.random() * emptySpots.length)];
            const [row, col] = randomSpot;
            newBoard[row][col] = 'goat';

            setGameState((prev) => ({
                ...prev,
                board: newBoard,
                goatsPlaced: prev.goatsPlaced + 1,
                currentPlayer: 'tiger',
            }));
        }
    } else {
        // Move a goat (basic AI: random valid move)
        const goats = [];
        for (let i = 0; i < BOARD_SIZE; i++) {
            for (let j = 0; j < BOARD_SIZE; j++) {
                if (newBoard[i][j] === 'goat') {
                    goats.push([i, j]);
                }
            }
        }

        let bestMove = null;

        for (const goat of goats) {
            const possibleMoves = getPossibleMoves(goat, 'goat');
            if (possibleMoves.length > 0) {
                const randomMove = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
                bestMove = { from: goat, to: randomMove };
                break;
            }
        }

        if (bestMove) {
            const { from, to } = bestMove;
            const [fromRow, fromCol] = from;
            const [toRow, toCol] = to;

            newBoard[toRow][toCol] = 'goat';
            newBoard[fromRow][fromCol] = null;

            setGameState((prev) => ({
                ...prev,
                board: newBoard,
                currentPlayer: 'tiger',
            }));
        } else {
            // No valid move for goats, tigers win
            setGameState((prev) => ({
                ...prev,
                gameOver: true,
                winner: 'tiger',
            }));
            toast.success("Tigers win! Goats have no valid moves.");
        }
    }
};


        // Prioritize moves that capture goats
        let bestMove = null;

        for (const tiger of Ravan) {
            const possibleMoves = getPossibleMoves(tiger, 'tiger');

            for (const move of possibleMoves) {
                const middle = getMiddlePosition(tiger, move);

                if (middle) {
                    const [middleRow, middleCol] = middle;
                    if (gameState.board[middleRow][middleCol] === 'goat') {
                        bestMove = { from: tiger, to: move };
                        break;
                    }
                }
            }

            if (bestMove) break;
        }

        // If no capturing move, choose a random move
        if (!bestMove) {
            const movableRavan = Ravan.filter(tiger =>
                getPossibleMoves(tiger, 'tiger').length > 0
            );

            if (movableRavan.length > 0) {
                const randomTiger = movableRavan[Math.floor(Math.random() * movableRavan.length)];
                const moves = getPossibleMoves(randomTiger, 'tiger');
                const randomMove = moves[Math.floor(Math.random() * moves.length)];

                bestMove = { from: randomTiger, to: randomMove };
            }
        }

        if (bestMove) {
            const { from, to } = bestMove;
            const [fromRow, fromCol] = from;
            const [toRow, toCol] = to;

            const newBoard = [...gameState.board.map(row => [...row])];
            newBoard[toRow][toCol] = 'tiger';
            newBoard[fromRow][fromCol] = null;

            let goatsCaptured = gameState.goatsCaptured;

            // Check if a tiger captured a goat
            const middle = getMiddlePosition(from, to);
            if (middle) {
                const [middleRow, middleCol] = middle;
                if (newBoard[middleRow][middleCol] === 'goat') {
                    newBoard[middleRow][middleCol] = null;
                    goatsCaptured++;
                    toast("A goat was captured!", {
                        style: { backgroundColor: '#FF7F50', color: 'white' }
                    });
                }
            }

            setGameState(prev => ({
                ...prev,
                board: newBoard,
                currentPlayer: 'goat',
                goatsCaptured
            }));
        } else {
            // No valid move for Ravan
            setGameState(prev => ({
                ...prev,
                gameOver: true,
                winner: 'goat'
            }));
            toast.success("Goats win! Ravan are trapped.");
        }
    

    // Reset game
// Reset game
const resetGame = () => {
    const initialBoard = Array(BOARD_SIZE).fill(null).map(() => Array(BOARD_SIZE).fill(null));

    // Place tigers at the corners
    initialBoard[0][0] = 'tiger';

    setGameState({
        board: initialBoard,
        currentPlayer: 'tiger', // Player is tiger now
        selectedPiece: null,
        goatsPlaced: 0,
        goatsCaptured: 0,
        possibleMoves: [],
        gameOver: false,
        winner: null,
    });

    toast("Game reset!");
};

    // Render board point
    const renderBoardPoint = (position) => {
        const [row, col] = position;

        // Calculate position based on triangular grid
        const boardSize = 640; // Size of the board in pixels
        const margin = 80; // Margin from the edges

        const x = margin + (col * (boardSize - 2 * margin) / (BOARD_SIZE - 1));
        const y = margin + (row * (boardSize - 2 * margin) / (BOARD_SIZE - 1));

        const piece = gameState.board[row][col];
        const isSelected = gameState.selectedPiece &&
            gameState.selectedPiece[0] === row &&
            gameState.selectedPiece[1] === col;
        const isPossibleMove = positionInList(position, gameState.possibleMoves);

        return (
            <React.Fragment key={`point-${row}-${col}`}>
                {/* Board point */}
                <div
                    className={cn(
                        "board-point",
                        isPossibleMove && "animate-pulse-soft bg-yellow-300 z-10"
                    )}
                    style={{
                        left: `${x}px`,
                        top: `${y}px`,
                        boxShadow: isPossibleMove ? '0 0 8px 2px rgba(255, 255, 0, 0.5)' : 'none'
                    }}
                    onClick={() => handlePointClick([row, col])}
                />

                {/* Piece */}
                {piece && (
                    <div
                        className={cn(
                            "piece",
                            piece === 'tiger' ? "piece-tiger" : "piece-goat",
                            isSelected && "shadow-lg ring-2 ring-yellow-400 ring-offset-2 ring-offset-transparent animate-bounce-soft"
                        )}
                        style={{
                            left: `${x}px`,
                            top: `${y}px`,
                            zIndex: isSelected ? 20 : 10
                        }}
                        onClick={() => handlePointClick([row, col])}
                    >
                        {piece === 'tiger' ? <img src={ravan} alt="ravan" className="w-20 h-20" /> :
                            <img src={hanuman} alt="hanuman" className="w-20 h-20" />

                        }

                    </div>
                )}
            </React.Fragment>
        );
    };

    const renderBoardLines = () => {
        const boardSize = 640; // Board size in pixels
        const margin = 80; // Margin from the edges
    
        // Calculate the exact pixel position on the board for a given row and column
        const getPosition = (pos) => {
            const [row, col] = pos;
            const x = margin + (col * (boardSize - 2 * margin) / (BOARD_SIZE - 1));
            const y = margin + (row * (boardSize - 2 * margin) / (BOARD_SIZE - 1));
            return { x, y };
        };
    
        const lines = [];
        const addedLines = new Set(); // Keep track of drawn lines to avoid duplicates
    
        // Draw lines based only on explicitly listed connections in BOARD_LAYOUT
        BOARD_LAYOUT.forEach((point) => {
            const from = getPosition(point.position); // Get pixel coordinates of start point
    
            point.connections.forEach((conn) => {
                if (
                    conn[0] < 0 || conn[0] >= BOARD_SIZE || // Out-of-bounds row check
                    conn[1] < 0 || conn[1] >= BOARD_SIZE    // Out-of-bounds column check
                ) {
                    return; // Skip invalid connections
                }
    
                // Compute pixel coordinates for the connection endpoint
                const to = getPosition(conn);
                const lineId = `${point.position.join(',')} -> ${conn.join(',')}`;
    
                // Only add the line if it hasn't already been added
                if (!addedLines.has(lineId) && !addedLines.has(`${conn.join(',')} -> ${point.position.join(',')}`)) {
                    lines.push(
                        <>
                            {/* Outer line for a thicker "shadowed" effect */}
                            <line
                                key={`${lineId}-outline`}
                                x1={from.x} y1={from.y}
                                x2={to.x} y2={to.y}
                                stroke="#e39c15"
                                strokeWidth="6"
                                strokeLinecap="round"
                            />
    
                            {/* Main thinner line */}
                            <line
                                key={lineId}
                                x1={from.x} y1={from.y}
                                x2={to.x} y2={to.y}
                                stroke="#fff"
                                strokeWidth="2"
                                strokeLinecap="round"
                            />
                        </>
                    );
                    addedLines.add(lineId); // Prevent this line from being added again
                }
            });
        });
    
        // Return the SVG containing all lines
        return (
            <svg className="board-lines" width={boardSize} height={boardSize}>
                {lines}
            </svg>
        );
    };
    
    

    return (
        <div className="flex flex-col items-center h-screen justify-around  py-8  overflow-hidden scrollbar-hide ">
            <div className='flex gap-16 mb-12'>
                {/* Computer status panel */}
                <div className="game-panel w-72 animate-fade-in">
                    <span className="player-indicator">
                        <div className="player-avatar bg-blue-500 mr-2">🤖</div>
                        Computer
                    </span>
                    <span className="font-semibold">Killed: {gameState.goatsCaptured}/3</span>
                </div>

                {/* Player status panel */}
                <div className="game-panel w-72  animate-fade-in">
                    <span className="player-indicator">
                        <div className="player-avatar bg-green-500 mr-2">👤</div>
                        You
                    </span>
                    <span className="font-semibold">
                        Remaining: {Math.max(0, MAX_GOATS - gameState.goatsPlaced)}
                    </span>
                </div>
            </div>


            {/* Game board */}
            <div className="relative  bg-violet-300 rounded-lg shadow-xl border border-white/20 "
            >
                {/* Board lines */}
                {renderBoardLines()}

                {/* Board points and pieces */}
                {BOARD_LAYOUT.map(point => renderBoardPoint(point.position))}

                {/* Game over overlay */}
                {gameState.gameOver && (
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center flex-col text-white rounded-lg animate-scale-in z-[9999] ">
                        <h2 className="text-2xl font-bold mb-4 ">
                            {gameState.winner === 'tiger' ? "Ravan Win!" : "Vanar veers Win!"}
                        </h2>
                        <p className="mb-4">
                            {gameState.winner === 'tiger'
                                ? "Ravan captured 3 Vanar veer"
                                : "Ravan have been immobilized"}
                        </p>
                        <button
                            className="flex items-center space-x-2 bg-green-500 text-game-background px-4 py-2 rounded-full hover:bg-opacity-90 transition-colors"
                            onClick={resetGame}
                        >
                            <RefreshCw size={16} />
                            <span>Play Again</span>
                        </button>
                    </div>
                )}
            </div>



            {/* Instructions */}
            <div className="mt-8 text-white opacity-70 text-sm max-w-md text-center px-4">
    {gameState.currentPlayer === 'tiger' ? (
        <p>Select a tiger and move it to an adjacent empty intersection or capture a goat.</p>
    ) : gameState.goatsPlaced < MAX_GOATS ? (
        <p>Computer is placing goats...</p>
    ) : (
        <p>Computer is moving goats...</p>
    )}
</div>
        </div>
    );
};

export default Goat;