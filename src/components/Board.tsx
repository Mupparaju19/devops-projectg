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
      setScores(prev => ({ ...prev, [g
