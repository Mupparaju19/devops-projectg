import React, { useState } from "react";
import Square from "./Square";
import { checkWinner } from "../utils/gameLogic";

const players = ["Krishna", "Mupparaju", "X", "O"]; // Defined players

const Board = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [scores, setScores] = useState({ Krishna: 0, Mupparaju: 0, X: 0, O: 0, Draw: 0 });
  const [winner, setWinner] = useState<string | null>(null);

  const handleClick = (index: number) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = players[currentPlayer];
    setBoard(newBoard);

    const gameWinner = checkWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner);
      setScores(prev => ({ ...prev, [gameWinner]: prev[gameWinner] + 1 }));
    } else {
      setCurrentPlayer((currentPlayer + 1) % players.length);
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
      
      {/* 🔹 FIXED: Improved Scoreboard Layout 🔹 */}
      <div className="scoreboard flex space-x-6 text-lg font-semibold text-gray-800 mb-4">
        <div>👤 Krishna: {scores.Krishna}</div>
        <div>👤 M

