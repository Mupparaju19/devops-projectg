import { FC } from "react";

interface ScoreBoardProps {
  scores: { X: number; O: number; draws: number };
}

const ScoreBoard: FC<ScoreBoardProps> = ({ scores }) => {
  return (
    <div className="flex justify-center space-x-4 text-xl font-bold">
      <p>❌ X: {scores.X}</p>
      <p>⭕ O: {scores.O}</p>
      <p>➖ Draws: {scores.draws}</p>
    </div>
  );
};

export default ScoreBoard;
