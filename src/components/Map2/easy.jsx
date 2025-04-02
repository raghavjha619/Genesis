import React, { useState, useEffect } from "react";
import { cn } from "../lib/util";
import { toast } from "sonner";
import { RefreshCw } from "lucide-react";
import ravan from "../../assets/meghnatha_new.svg";
import hanuman from "../../assets/hanuman.svg";
import innerbutton from "../../assets/innerbutton.png";
import tigerWon from "../../assets/meghnath.mp3";
import goatWin from "../../assets/goat_win.mp3";
import kill from "../../assets/tiger_kill1.mp3";
import { useSound } from "../SoundContext";

const SOUNDS = {
  tigerKill: kill,
  goatWon: goatWin,
  tigerWin: tigerWon,
};

const BOARD_SIZE = 11;
const MAX_GOATS = 5;
const Ravan_COUNT = 1;
//first commit
const BOARD_LAYOUT = [
  // Top row

  {
    position: [0, 5],
    connections: [
      [1, 6],
      [1, 4],
    ],
  },

  // Second row
  {
    position: [1, 0],
    connections: [
      [2, 0],
      [1, 4],
    ],
  },

  {
    position: [1, 4],
    connections: [
      [0, 5],
      [1, 6],
      [1, 0],
      [2, 3],
    ],
  },
  {
    position: [1, 6],
    connections: [
      [0, 5],
      [1, 4],
      [2, 7],
      [1, 10],
    ],
  },

  {
    position: [1, 10],
    connections: [
      [2, 10],
      [1, 6],
    ],
  },

  // Middle row
  {
    position: [2, 0],
    connections: [
      [1, 0],
      [2, 3],
      [3, 0],
    ],
  },

  {
    position: [2, 3],
    connections: [
      [1, 4],
      [2, 0],
      [3, 2],
      [2, 7],
    ],
  },
  {
    position: [2, 7],
    connections: [
      [1, 6],
      [3, 8],
      [2, 3],
      [2, 10],
    ],
  },

  {
    position: [2, 10],
    connections: [
      [1, 10],
      [3, 10],
      [2, 7],
    ],
  },

  // Fourth row
  {
    position: [3, 0],
    connections: [
      [2, 0],
      [3, 2],
    ],
  },

  {
    position: [3, 2],
    connections: [
      [4, 1],
      [2, 3],
      [3, 8],
      [3, 0],
    ],
  },
  {
    position: [3, 8],
    connections: [
      [2, 7],
      [4, 9],
      [3, 2],
      [3, 10],
    ],
  },

  {
    position: [3, 10],
    connections: [
      [2, 10],
      [3, 8],
    ],
  },

  // Bottom row

  {
    position: [4, 1],
    connections: [
      [3, 2],
      [4, 9],
    ],
  },
  {
    position: [4, 9],
    connections: [
      [3, 8],
      [4, 1],
    ],
  },
];

// Helper function to find connections for a position
const getConnections = (position) => {
  const point = BOARD_LAYOUT.find(
    (p) => p.position[0] === position[0] && p.position[1] === position[1]
  );
  return point ? point.connections : [];
};

// Check if two positions are equal
const positionsEqual = (pos1, pos2) => {
  return pos1[0] === pos2[0] && pos1[1] === pos2[1];
};

// Check if position is in the list
const positionInList = (pos, list) => {
  return list.some((p) => positionsEqual(p, pos));
};

// Find the middle position between two positions
// Function to get the middle position for tiger jumps
const getMiddlePosition = (pos1, pos2) => {
  const [row1, col1] = pos1;
  const [row2, col2] = pos2;

  // Explicit checks for all possible cases based on BOARD_LAYOUT
  if (
    (row1 === 0 && col1 === 5 && row2 === 2 && col2 === 3) ||
    (row1 === 2 && col1 === 3 && row2 === 0 && col2 === 5)
  ) {
    return [1, 4];
  }

  if (
    (row1 === 0 && col1 === 5 && row2 === 2 && col2 === 7) ||
    (row1 === 2 && col1 === 7 && row2 === 0 && col2 === 5)
  ) {
    return [1, 6];
  }
  if (
    (row1 === 2 && col1 === 3 && row2 === 2 && col2 === 10) ||
    (row1 === 2 && col1 === 10 && row2 === 2 && col2 === 3)
  ) {
    return [2, 7];
  }
  if (
    (row1 === 1 && col1 === 0 && row2 === 1 && col2 === 6) ||
    (row1 === 1 && col1 === 6 && row2 === 1 && col2 === 0)
  ) {
    return [1, 4];
  }
  if (
    (row1 === 1 && col1 === 4 && row2 === 1 && col2 === 10) ||
    (row1 === 1 && col1 === 10 && row2 === 1 && col2 === 4)
  ) {
    return [1, 6];
  }
  if (
    (row1 === 1 && col1 === 4 && row2 === 3 && col2 === 2) ||
    (row1 === 3 && col1 === 2 && row2 === 1 && col2 === 4)
  ) {
    return [2, 3];
  }
  if (
    (row1 === 2 && col1 === 0 && row2 === 2 && col2 === 7) ||
    (row1 === 2 && col1 === 7 && row2 === 2 && col2 === 0)
  ) {
    return [2, 3];
  }
  if (
    (row1 === 2 && col1 === 3 && row2 === 2 && col2 === 10) ||
    (row1 === 2 && col1 === 10 && row2 === 2 && col2 === 3)
  ) {
    return [2, 7];
  }
  if (
    (row1 === 3 && col1 === 0 && row2 === 3 && col2 === 8) ||
    (row1 === 3 && col1 === 8 && row2 === 3 && col2 === 0)
  ) {
    return [3, 2];
  }
  if (
    (row1 === 2 && col1 === 3 && row2 === 4 && col2 === 1) ||
    (row1 === 4 && col1 === 1 && row2 === 2 && col2 === 3)
  ) {
    return [3, 2];
  }
  if (
    (row1 === 2 && col1 === 7 && row2 === 4 && col2 === 9) ||
    (row1 === 4 && col1 === 9 && row2 === 2 && col2 === 7)
  ) {
    return [3, 8];
  }
  if (
    (row1 === 3 && col1 === 2 && row2 === 3 && col2 === 10) ||
    (row1 === 3 && col1 === 10 && row2 === 3 && col2 === 2)
  ) {
    return [3, 8];
  }
  if (
    (row1 === 1 && col1 === 10 && row2 === 3 && col2 === 10) ||
    (row1 === 3 && col1 === 10 && row2 === 1 && col2 === 10)
  ) {
    return [2, 10];
  }
  if (
    (row1 === 1 && col1 === 0 && row2 === 3 && col2 === 0) ||
    (row1 === 3 && col1 === 0 && row2 === 1 && col2 === 0)
  ) {
    return [2, 0];
  }

  // No valid middle position detected
  return null;
};

const Medium = () => {
  const { isMuted } = useSound();
  const playSound = (soundFile) => {
    if (isMuted === false && soundFile) {
      // Only play if not muted
      const audio = new Audio(soundFile);
      audio
        .play()
        .catch((error) => console.error("Sound playback error:", error));
    }
  };

  const [gameState, setGameState] = useState({
    board: Array(BOARD_SIZE)
      .fill(null)
      .map(() => Array(BOARD_SIZE).fill(null)),
    currentPlayer: "goat",
    selectedPiece: null,
    goatsPlaced: 0,
    goatsCaptured: 0,
    possibleMoves: [],
    gameOver: false,
    winner: null,
  });

  // Initialize the board with Ravan
  useEffect(() => {
    const initialBoard = Array(BOARD_SIZE)
      .fill(null)
      .map(() => Array(BOARD_SIZE).fill(null));

    // Place Ravan at the corners

    initialBoard[0][5] = "tiger";
    
   

    setGameState((prev) => ({
      ...prev,
      board: initialBoard,
    }));
  }, []);

  // Check if the game is over
  useEffect(() => {
    // Tiger wins if they capture 5 or more goats
    if (gameState.goatsCaptured >= 2) {
      setGameState((prev) => ({
        ...prev,
        gameOver: true,
        winner: "tiger",
      }));
      playSound(SOUNDS.tigerWin);
      toast.success("Ravan win! They captured 3 vanar veer.");
      return;
    }

    // Goat wins if Ravan can't move
    if (gameState.goatsPlaced === MAX_GOATS) {
      // Check if Ravan can move
      let tigerCanMove = false;

      for (let i = 0; i < BOARD_SIZE; i++) {
        for (let j = 0; j < BOARD_SIZE; j++) {
          if (gameState.board[i][j] === "tiger") {
            const moves = getPossibleMoves([i, j], "tiger");
            if (moves.length > 0) {
              tigerCanMove = true;
              break;
            }
          }
        }
        if (tigerCanMove) break;
      }

      if (!tigerCanMove) {
        setGameState((prev) => ({
          ...prev,
          gameOver: true,
          winner: "goat",
        }));
        playSound(SOUNDS.goatWon);
        toast.success("Goats win! Ravan are trapped.");
      }
    }
  }, [gameState.goatsCaptured, gameState.goatsPlaced, gameState.board]);

  // AI move for tiger
  useEffect(() => {
    if (gameState.currentPlayer === "tiger" && !gameState.gameOver) {
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

    if (pieceType === "goat") {
      // Goats can move to adjacent empty positions (both orthogonal and diagonal)
      return [...connections, ...diagonalMoves].filter(
        ([r, c]) => !gameState.board[r][c]
      );
    } else if (pieceType === "tiger") {
      const moves = [];

      // Ravan can move to adjacent empty positions
      connections.forEach(([r, c]) => {
        if (!gameState.board[r][c]) {
          moves.push([r, c]);
        }
      });

      // Ravan can also jump over adjacent goats to empty positions
      const jumpMoves = BOARD_LAYOUT.map((point) => point.position).filter(
        ([r, c]) => {
          if (gameState.board[r][c]) return false; // Must be empty

          // Check if there's a goat to jump over
          const middle = getMiddlePosition(position, [r, c]);
          if (!middle) return false;

          const [middleRow, middleCol] = middle;
          return gameState.board[middleRow][middleCol] === "goat";
        }
      );

      return [...moves, ...jumpMoves];
    }

    return [];
  };

  // Function to get diagonal moves
  // Function to get diagonal moves
  const getDiagonalMoves = (position) => {
    const [row, col] = position;

    // Special diagonal moves for specific positions according to BOARD_LAYOUT
    const diagonalMap = {
      "0,5": [
        [1, 4],
        [1, 6],
      ],

      "1,0": [[2, 3]],
      "1,4": [
        [0, 5],
        [2, 3],
        [1, 0],
        [1, 6],
      ],
      "1,6": [
        [0, 5],
        [2, 7],
        [1, 4],
        [1, 10],
      ],
      "1,10": [
        [2, 7],
        [2, 10],
        [1, 6],
      ],

      "2,0": [
        [1, 0],
        [3, 2],
      ],
      "2,3": [
        [1, 4],
        [3, 2],
        [2, 0],
        [2, 7],
      ],
      "2,7": [
        [1, 6],
        [3, 8],
        [2, 3],
        [2, 10],
      ],
      "2,10": [
        [1, 10],
        [3, 10],
        [2, 7],
      ],

      "3,0": [
        [2, 0],
        [3, 2],
      ],
      "3,2": [
        [2, 3],
        [4, 1],
        [3, 0],
        [3, 8],
      ],
      "3,8": [
        [2, 7],
        [4, 9],
        [3, 2],
        [3, 10],
      ],
      "3,10": [
        [2, 10],
        [3, 8],
      ],

      "4,1": [
        [3, 2],
        [4, 9],
      ],
      "4,9": [
        [3, 8],
        [4, 1],
      ],
    };

    // Convert current position to a string key
    const key = `${row},${col}`;

    // If the position exists in diagonalMap, return its specific diagonal connections
    if (diagonalMap[key]) {
      return diagonalMap[key];
    }

    // Default general diagonals (only used if no specific rule in BOARD_LAYOUT)
    const possibleDiagonals = [
      [row - 1, col - 1], // Top-left
      [row - 1, col + 1], // Top-right
      [row + 1, col - 1], // Bottom-left
      [row + 1, col + 1], // Bottom-right
    ];

    // Return diagonals that are within the bounds of the board
    return possibleDiagonals.filter(
      ([r, c]) => r >= 0 && r < 5 && c >= 0 && c <= 10
    );
  };

  // Handle piece selection and movement
  const handlePointClick = (position) => {
    if (gameState.gameOver) return;

    const [row, col] = position;
    const pieceAtPosition = gameState.board[row][col];

    // If it's goat's turn and all goats haven't been placed yet
    if (
      gameState.currentPlayer === "goat" &&
      gameState.goatsPlaced < MAX_GOATS
    ) {
      if (!pieceAtPosition) {
        const newBoard = [...gameState.board.map((row) => [...row])];
        newBoard[row][col] = "goat";

        setGameState((prev) => ({
          ...prev,
          board: newBoard,
          goatsPlaced: prev.goatsPlaced + 1,
          currentPlayer: "tiger",
          selectedPiece: null,
          possibleMoves: [],
        }));
      }
      return;
    }

    // If a piece is already selected
    if (gameState.selectedPiece) {
      const [selectedRow, selectedCol] = gameState.selectedPiece;
      const selectedPieceType = gameState.board[selectedRow][selectedCol];

      if (positionsEqual(position, gameState.selectedPiece)) {
        setGameState((prev) => ({
          ...prev,
          selectedPiece: null,
          possibleMoves: [],
        }));
        return;
      }

      if (positionInList(position, gameState.possibleMoves)) {
        const newBoard = [...gameState.board.map((row) => [...row])];

        // Move the piece
        newBoard[row][col] = selectedPieceType;
        newBoard[selectedRow][selectedCol] = null;

        let goatsCaptured = gameState.goatsCaptured;

        // Check if a tiger captured a goat
        if (selectedPieceType === "tiger") {
          const middle = getMiddlePosition(gameState.selectedPiece, position);

          if (middle) {
            const [middleRow, middleCol] = middle;
            if (newBoard[middleRow][middleCol] === "goat") {
              newBoard[middleRow][middleCol] = null;
              goatsCaptured++;
              playSound(SOUNDS.tigerKill);
              toast("A goat was captured!", {
                style: { backgroundColor: "#FF7F50", color: "white" },
              });
            }
          }
        }

        setGameState((prev) => ({
          ...prev,
          board: newBoard,
          currentPlayer: prev.currentPlayer === "goat" ? "tiger" : "goat",
          selectedPiece: null,
          possibleMoves: [],
          goatsCaptured,
        }));
        return;
      }
    }

    // Select a piece if it belongs to the current player
    if (pieceAtPosition === gameState.currentPlayer) {
      const possibleMoves = getPossibleMoves(position, pieceAtPosition);

      setGameState((prev) => ({
        ...prev,
        selectedPiece: position,
        possibleMoves,
      }));
    }
  };

  // AI move for tiger
  const makeAIMove = () => {
    // Find all Ravan
    const Ravan = [];

    for (let i = 0; i < BOARD_SIZE; i++) {
      for (let j = 0; j < BOARD_SIZE; j++) {
        if (gameState.board[i][j] === "tiger") {
          Ravan.push([i, j]);
        }
      }
    }

    // Prioritize moves that capture goats
    let bestMove = null;

    for (const tiger of Ravan) {
      const possibleMoves = getPossibleMoves(tiger, "tiger");

      for (const move of possibleMoves) {
        const middle = getMiddlePosition(tiger, move);

        if (middle) {
          const [middleRow, middleCol] = middle;
          if (gameState.board[middleRow][middleCol] === "goat") {
            bestMove = { from: tiger, to: move };
            break;
          }
        }
      }

      if (bestMove) break;
    }

    // If no capturing move, choose a random move
    if (!bestMove) {
      const movableRavan = Ravan.filter(
        (tiger) => getPossibleMoves(tiger, "tiger").length > 0
      );

      if (movableRavan.length > 0) {
        const randomTiger =
          movableRavan[Math.floor(Math.random() * movableRavan.length)];
        const moves = getPossibleMoves(randomTiger, "tiger");
        const randomMove = moves[Math.floor(Math.random() * moves.length)];

        bestMove = { from: randomTiger, to: randomMove };
      }
    }

    if (bestMove) {
      const { from, to } = bestMove;
      const [fromRow, fromCol] = from;
      const [toRow, toCol] = to;

      const newBoard = [...gameState.board.map((row) => [...row])];
      newBoard[toRow][toCol] = "tiger";
      newBoard[fromRow][fromCol] = null;

      let goatsCaptured = gameState.goatsCaptured;

      // Check if a tiger captured a goat
      const middle = getMiddlePosition(from, to);
      if (middle) {
        const [middleRow, middleCol] = middle;
        if (newBoard[middleRow][middleCol] === "goat") {
          newBoard[middleRow][middleCol] = null;
          goatsCaptured++;
          playSound(SOUNDS.tigerKill);
          toast("A goat was captured!", {
            style: { backgroundColor: "#FF7F50", color: "white" },
          });
        }
      }

      setGameState((prev) => ({
        ...prev,
        board: newBoard,
        currentPlayer: "goat",
        goatsCaptured,
      }));
    } else {
      // No valid move for Ravan
      setGameState((prev) => ({
        ...prev,
        gameOver: true,
        winner: "goat",
      }));
      playSound(SOUNDS.goatWon);
      toast.success("Goats win! Ravan are trapped.");
    }
  };

  // Reset game
  const resetGame = () => {
    const initialBoard = Array(BOARD_SIZE)
      .fill(null)
      .map(() => Array(BOARD_SIZE).fill(null));

    // Place Ravan at the corners

    initialBoard[0][5] = "tiger";
    

    setGameState({
      board: initialBoard,
      currentPlayer: "goat",
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
  const getBoardSize = () => {
    const width = window.innerWidth;
    if (width < 400) return 290; // Extra Small screens
    if (width < 640) return 360; // Small screens
    if (width < 768) return 480; // Medium screens
    return 640; // Default large screens
  };

  const renderBoardPoint = (position) => {
    const [boardSize, setBoardSize] = useState(getBoardSize()); // Dynamically set board size

    const margin = 40;
    const verticalStretchFactor = 2.4; // Adjust for stretching

    useEffect(() => {
      const handleResize = () => setBoardSize(getBoardSize());
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);

    const [row, col] = position;

    // Calculate position based on triangular grid
    const x = margin + (col * (boardSize - 2 * margin)) / (BOARD_SIZE - 1);
    const y =
      margin +
      (row * (boardSize - 2 * margin) * verticalStretchFactor) /
        (BOARD_SIZE - 1);

    const piece = gameState.board[row][col];
    const isSelected =
      gameState.selectedPiece &&
      gameState.selectedPiece[0] === row &&
      gameState.selectedPiece[1] === col;
    const isPossibleMove = positionInList(position, gameState.possibleMoves);

    return (
      <React.Fragment key={`point-${row}-${col}`}>
        {/* Board point */}
        <div
          className={cn(
            "board-point bg-[#91206ff2] border-2 border-[#E5B84B] sm:w-6 sm:h-6 w-4 h-4",
            isPossibleMove && "scale-125 bg-red-700 z-10"
          )}
          style={{
            left: `${x}px`,
            top: `${y}px`,
            boxShadow: isPossibleMove
              ? "0 0 8px 2px rgba(255, 255, 0, 0.5)"
              : "none",
          }}
          onClick={() => handlePointClick([row, col])}
        />

        {/* Piece */}
        {piece && (
          <div
            className={cn(
              "piece",
              piece === "tiger" ? "piece-tiger" : "piece-goat",
              isSelected &&
                "shadow-lg ring-2 ring-yellow-300 ring-offset-2 ring-offset-transparent animate-bounce-soft"
            )}
            style={{
              left: `${x}px`,
              top: `${y}px`,
              zIndex: isSelected ? 20 : 10,
            }}
            onClick={() => handlePointClick([row, col])}
          >
            {piece === "tiger" ? (
              <img src={ravan} alt="ravan" className="w-14 h-14 md:w-14 md:h-14 " />
            ) : (
              <img src={hanuman} alt="hanuman" width={40} height={40} />
            )}
          </div>
        )}
      </React.Fragment>
    );
  };

  const renderBoardLines = () => {
    const [boardSize, setBoardSize] = useState(getBoardSize()); // Dynamically set board size

    const margin = 40;
    const verticalStretchFactor = 2.4; // Adjust for stretching

    useEffect(() => {
      const handleResize = () => setBoardSize(getBoardSize());
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Convert board position (like [2, 3]) to pixel position for SVG placement.
    const getPosition = (pos) => {
      const [row, col] = pos;
      const x = margin + (col * (boardSize - 2 * margin)) / (BOARD_SIZE - 1);
      const y =
        margin +
        (row * (boardSize - 2 * margin) * verticalStretchFactor) /
          (BOARD_SIZE - 1);
      return { x, y };
    };

    const lines = [];
    const addedLines = new Set(); // Prevent duplicate connections

    // Iterate through BOARD_LAYOUT to draw connections between points
    BOARD_LAYOUT.forEach((point) => {
      const from = getPosition(point.position);

      // Loop through the connections defined for the current point
      point.connections.forEach((conn) => {
        if (
          conn[0] < 0 ||
          conn[0] >= BOARD_SIZE ||
          conn[1] < 0 ||
          conn[1] >= BOARD_SIZE
        ) {
          return; // Skip out-of-bound connections
        }

        const to = getPosition(conn);
        const lineId = `${point.position.join(",")} -> ${conn.join(",")}`;

        if (!addedLines.has(lineId)) {
          lines.push(
            <>
              {/* Outline (Thicker Dark Line) */}
              <line
                key={`${lineId}-outline`}
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                stroke="#e39c15" // Black outline
                strokeWidth="6" // Make it slightly thicker
                strokeLinecap="round"
              />

              {/* Main Line */}
              <line
                key={lineId}
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                stroke="#fff" // White main line
                strokeWidth="2" // Keep it thinner
                strokeLinecap="round"
              />
            </>
          );
          addedLines.add(lineId); // Track the connection to avoid duplicates
        }
      });
    });

    // Return the SVG element containing all the drawn lines
    return (
      <svg className="board-lines" width={boardSize} height={boardSize}>
        {lines}
      </svg>
    );
  };

  return (
    <div className="flex flex-col items-center justify-start sm:justify-around min-h-screen py-8 overflow-hidden scrollbar-hide mt-16 md:mt-24 xl:mt-0">
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-2 md:gap-16 mb-8 sm:mb-12">
        {/* Computer status panel */}
        <div
          className="h-[68px] w-64 sm:w-64 md:w-80 sm:h-[68px] md:h-[84px] lg:w-96 lg:h-[100px]  flex justify-around items-center text-white"
          style={{
            backgroundImage: `url(${innerbutton})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="font-semibold ml-10 ">Computer</div>
          <div className="font-semibold mr-10">
            Killed: {gameState.goatsCaptured}/2
          </div>
        </div>

        {/* Player status panel */}
        <div
          className="h-[68px] w-64 sm:w-64 md:w-80 sm:h-[68px] md:h-[84px] lg:w-96 lg:h-[100px]  flex justify-around items-center text-white"
          style={{
            backgroundImage: `url(${innerbutton})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="font-semibold ml-10 ">You</div>
          <div className="font-semibold mr-10">
            Remaining: {Math.max(0, MAX_GOATS - gameState.goatsPlaced)}
          </div>
        </div>
      </div>

      {/* Game board */}
      <div className="box relative max-w-[90%] xxs:max-w-[96%] flex-col justify-center items-center mx-auto w-auto h-auto bg-[#f5e1c0] rounded-lg shadow-xl">
        {/* Board lines */}
        {renderBoardLines()}

        {/* Board points and pieces */}
        {BOARD_LAYOUT.map((point) => renderBoardPoint(point.position))}

        {/* Instructions */}
        <div className="my-2 text-amber-800 text-base text-center px-4">
          {gameState.currentPlayer === "goat" ? (
            gameState.goatsPlaced < MAX_GOATS ? (
              <p>Place your vanar veer on an empty intersection</p>
            ) : (
              <p>
                Select a vanar veer and move it to an adjacent empty
                intersection
              </p>
            )
          ) : (
            <p>Computer is thinking...</p>
          )}
        </div>

        {/* Game over overlay */}
        {gameState.gameOver && (
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center flex-col text-white rounded-lg animate-scale-in z-[9999] ">
            <h2 className="text-2xl font-bold mb-4 ">
              {gameState.winner === "tiger" ? "Ravan Win!" : "Vanar veers Win!"}
            </h2>
            <p className="mb-4">
              {gameState.winner === "tiger"
                ? "Ravan captured 10 Vanar veer"
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
    </div>
  );
};

export default Medium;
