import { FC } from "react";
import Square from "./Square";
import { checkWinner, winningCombinations } from "../utils/gameLogic";

interface BoardProps {
  squares: ("X" | "O" | null)[];
  onPlay: (index: number) => void;
  winner: "X" | "O" | null;
}

const Board: FC<BoardProps> = ({ squares, onPlay, winner }) => {
  const winningSquares = winner
    ? winningCombinations.find(
        ([a, b, c]) => squares[a] === winner && squares[b] === winner && squares[c] === winner
      ) || []
    : [];

  return (
    <div className="grid grid-cols-3 gap-1 w-60 mx-auto">
      {squares.map((square, index) => (
        <Square
          key={index}
          value={square}
          onClick={() => onPlay(index)}
          isWinningSquare={winningSquares.includes(index)}
        />
      ))}
    </div>
  );
};

export default Board;
