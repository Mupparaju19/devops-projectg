export type Player = "X" | "O" | null;

export const winningCombinations = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

export const checkWinner = (squares: Player[]): Player | null => {
  for (let combination of winningCombinations) {
    const [a, b, c] = combination;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

export const isDraw = (squares: Player[]): boolean => {
  return squares.every(square => square !== null);
};
