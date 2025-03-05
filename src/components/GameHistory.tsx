import { FC } from "react";

interface GameHistoryProps {
  history: string[];
}

const GameHistory: FC<GameHistoryProps> = ({ history }) => {
  return (
    <div className="mt-4 text-sm">
      <h2 className="font-bold">Game History</h2>
      <ul>
        {history.map((entry, index) => (
          <li key={index}>{entry}</li>
        ))}
      </ul>
    </div>
  );
};

export default GameHistory;
