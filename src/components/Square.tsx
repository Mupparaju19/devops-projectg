import React from "react";

interface SquareProps {
  value: string | null;
  onClick: () => void;
}

const Square: React.FC<SquareProps> = ({ value, onClick }) => {
  return (
    <button
      className="w-20 h-20 flex items-center justify-center border-2 border-gray-300 text-3xl font-bold text-gray-800 
      bg-gray-50 hover:bg-indigo-200 transition-all rounded-md shadow-md"
      onClick={onClick}
    >
      {value}
    </button>
  );
};

export default Square;


