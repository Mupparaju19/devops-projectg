import { FC } from "react";

interface SquareProps {
  value: "X" | "O" | null;
  onClick: () => void;
  isWinningSquare: boolean;
}

const Square: FC<SquareProps> = ({ value, onClick, isWinningSquare }) => {
  return (
    <button
      className={`w-20 h-20 border text-3xl font-bold flex items-center justify-center ${
        isWinningSquare ? "bg-green-300" : "bg-white"
      }`}
      onClick={onClick}
    >
      {value}
    </button>
  );
};

export default Square;
