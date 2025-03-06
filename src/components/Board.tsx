import React, { useState } from "react";
import Square from "./Square";
import { checkWinner } from "../utils/gameLogic";

const players = ["X", "O"]; // Keeping X and O

const Board = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [scores, setScores] = useState({
    MupparajuX: 0,
    KrishnaO: 0,
    Draws: 0
  });
  const [winner, setWinner] = useState<string | null>(null);

  const handleClick = (index: number) => {
    if (board[index] || winner) return; // Prevent modifying after win

    const newBoard = [...board];
    newBoard[index] = players[currentPlayer]; // Assign X or O
    setBoard(newBoard);

    const gameWinner = checkWinner(newBoard);

    if (gameWinner) {
      setWinner(gameWinner);
      setScores(prev => ({
        ...prev, // ✅ Correctly spreads previous state
        [gameWinner === "X" ? "MupparajuX" : "KrishnaO"]: prev[gameWinner === "X" ? "MupparajuX" : "KrishnaO"] + 1
      }));
    } else if (!newBoard.includes(null)) {
      // If no winner and all squares filled, it's a draw
      setWinner("Draw");
      setScores(prev => ({
        ...prev,
        Draws: prev.Draws + 1
      }));
    } else {
      setCurrentPlayer((currentPlayer + 1) % 2);
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setWinner(null);
    setCurrentPlayer(0);
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      {/* Game Title */}
      <div className="bg-indigo-600 text-white text-xl font-bold py-3 px-10 rounded-lg shadow-md">
        🎮 Dic Don Game
      </div>

      {/* Player Turn / Winner Display */}
      {winner ? (
        <h2 className="text-lg font-bold mt-4 text-green-600">
          {winner === "Draw" ? "🤝 It's a Draw!" : `🏆 ${winner} Wins!`}
        </h2>
      ) : (
        <h2 className="text-lg font-semibold mt-4 text-gray-800">
          Next Player: <span className="text-indigo-600">{players[currentPlayer]}</span>
        </h2>
      )}

      {/* Game Board */}
      <div className="grid grid-cols-3 gap-2 bg-white p-5 rounded-lg shadow-lg mt-4">
       {board.map((value, index) => (
      <Square key={index} value={value} onClick={() => handleClick(index)} />
         ))}
      </div>


      {/* 🔹 Scoreboard (Formatted Like Reference) */}
      <div className="bg-white p-4 rounded-lg shadow-md mt-4 w-80">
        <h3 className="text-center text-gray-800 font-bold">🏆 Score Board</h3>
        <div className="mt-2">
          <div className="flex justify-between text-gray-600 py-2">
            <span>👤 Mupparaju (X)</span> <span className="text-red-500">{scores.MupparajuX}</span>
          </div>
          <div className="flex justify-between text-gray-600 py-2">
            <span>👤 Krishna (O)</span> <span className="text-blue-500">{scores.KrishnaO}</span>
          </div>
          <div className="flex justify-between text-gray-600 py-2">
            <span>🤝 Draws</span> <span className="text-yellow-500">{scores.Draws}</span>
          </div>
        </div>
      </div>

      {/* Game Controls */}
      <div className="flex space-x-4 mt-4">
        <button onClick={resetGame} className="bg-indigo-500 text-white px-4 py-2 rounded-md shadow hover:bg-indigo-700">
          Reset Game
        </button>
      </div>
    </div>
  );
};

export default Board;
