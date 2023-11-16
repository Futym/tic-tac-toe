import { Player } from "./components/Player";
import { GameBoard } from "./components/GameBoard";
import { useState } from "react";
import { Log } from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning-combinations";
import { GameOver } from "./components/GameOver";

const initialBoardGame = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

const deriveActivePlayer = (gameTurns) => {
  return gameTurns.length > 0 && gameTurns[0].player === "X" ? "O" : "X";
};

function App() {
  const [players, setPlayers] = useState({
    X: "Player 1",
    O: "Player 2",
  });

  const [gameTurns, setGameTurns] = useState([]);
  const activePlayer = deriveActivePlayer(gameTurns);

  let boardGame = [...initialBoardGame.map((row) => [...row])];

  for (const turn of gameTurns) {
    const { square, player } = turn;
    boardGame[square.row][square.col] = player;
  }

  let winner = null;

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol =
      boardGame[combination[0].row][combination[0].column];
    const secondSquareSymbol =
      boardGame[combination[1].row][combination[1].column];
    const thirdSquareSymbol =
      boardGame[combination[2].row][combination[2].column];

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      secondSquareSymbol === thirdSquareSymbol
    ) {
      winner = players[firstSquareSymbol];
    }
  }

  let isDraw = gameTurns.length === 9 && !winner;

  const handleSquareSelect = (rowIndex, colIndex) => {
    setGameTurns((prevTurns) => {
      const actPlayer = deriveActivePlayer(prevTurns);

      console.log(activePlayer);
      console.log(prevTurns);
      const actTurns = [
        { square: { row: rowIndex, col: colIndex }, player: actPlayer },
        ...prevTurns,
      ];
      return actTurns;
    });
  };

  const handleRestart = () => {
    setGameTurns([]);
  };

  const handlePlayerNameChange = (symbol, newPlayerName) => {
    setPlayers((oldPlayers) => {
      return {
        ...oldPlayers,
        [symbol]: newPlayerName
      }
    })
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player name="Player 1" symbol="X" isActive={activePlayer === "X"} changePlayer={handlePlayerNameChange} />
          <Player name="Player 2" symbol="O" isActive={activePlayer === "O"} changePlayer={handlePlayerNameChange}/>
        </ol>
        {(winner || isDraw) && (
          <GameOver winner={winner} onRestart={handleRestart} />
        )}
        <GameBoard onSquareSelect={handleSquareSelect} board={boardGame} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
