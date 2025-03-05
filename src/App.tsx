import { useState } from "react";
import Board from "./components/Board";
import ScoreBoard from "./components/ScoreBoard";
import GameHistory from "./components/GameHistory";
import { checkWinner, isDraw } from "./utils/gameLogic";

const App = () => {
  const [squares, setSquares] = useState<(null | "X" | "O")[]>(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [scores, setScores] = useState({ X: 0, O: 0, draws: 0 });
  const [history, setHistory] = useState<string[]>([]);
  
  const winner = checkWinner(squares);

  const handlePlay = (index: number) => {
    if (squares[index] || winner) return;
    
    const newSquares = squares.slice();
    newSquares[index] = xIsNext ? "X" : "O";
    setSquares(newSquares);
    
    if (checkWinner(newSquares)) {
      setScores(prev => ({ ...prev, [xIsNext ? "X" : "O"]: prev[xIsNext ? "X" : "O"] + 1 }));
      setHistory([...history, `Winner: ${xIsNext ? "X" : "O"}`]);
    } else if (isDraw(newSquares)) {
      setScores(prev => ({ ...prev, draws: prev.draws + 1 }));
      setHistory([...history, "Draw"]);
    }

    setXIsNext(!xIsNext);
  };

  return (
    <div className="text-center p-5">
      <h1 className="text-2xl font-bold">Dic Don Game</h1>
      <ScoreBoard scores={scores} />
      <Board squares={squares} onPlay={handlePlay} winner={winner} />
      <GameHistory history={history} />
      <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded" onClick={() => setSquares(Array(9).fill(null))}>
        Reset
      </button>
    </div>
  );
};

export default App;
