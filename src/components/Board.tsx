import React, { useState } from "react";
import Square from "./Square";
import { checkWinner } from "../utils/gameLogic";

const players = ["Krishna", "Mupparaju", "X", "O"]; // Add custom players

const Board = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [scores, setScores] = useState({ Krishna: 0, Mupparaju: 0, X: 0, O: 0, Draw: 0 });
  const [winner, setWinner] = useState<string | null>(null);

  const handleClick = (index: number) => {
    if (board[index] || winner) return; // Ignore if already filled

    const newBoard = [...board];
    newBoard[index] = players[currentPlayer];
    setBoard(newBoard);

    const gameWinner = checkWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner);
      setScores(prev => ({ ...prev, [gameWinner]: prev[gameWinner] + 1 }));
    } else {
      setCurrentPlayer((currentPlayer + 1) % players.length); // Rotate through players
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setWinner(null);
    setCurrentPlayer(0);
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Dic Don Game</h1>
      <div className="scoreboard">
        {players.map(player => (
          <span key={player}>{player}: {scores[player]}</span>
        ))}
      </div>
      <div className="board">
        {board.map((value, index) => (
          <Square key={index} value={value} onClick={() => handleClick(index)} />
        ))}
      </div>
      {winner && <h2 className="text-lg font-bold mt-4">🏆 {winner} Wins!</h2>}
      <button onClick={resetGame} className="mt-4 bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-900">
        Reset Game
      </button>
    </div>
  );
};

export default Board;
