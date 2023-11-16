const initialBoardGame = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

export const GameBoard = ({ onSquareSelect, turns }) => {
  let boardGame = initialBoardGame;

  for (const turn of turns) {
    const { square, player } = turn;
    boardGame[square.row][square.col] = player;
  }
  return (
    <ol id="game-board">
      {boardGame.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                <button onClick={() => onSquareSelect(rowIndex, colIndex)} disabled={playerSymbol !== null}>
                  {playerSymbol}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
};
