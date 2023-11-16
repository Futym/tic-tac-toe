import { Player } from "./components/Player";
import { GameBoard } from "./components/GameBoard";
import { useState } from "react";
import { Log } from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning-combinations";

const deriveActivePlayer = (gameTurns) => {
  return gameTurns.length > 0 && gameTurns[0].player === "X" ? "O" : "X";
};

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const activePlayer = deriveActivePlayer(gameTurns);

  const handleChangePlayer = (rowIndex, colIndex) => {
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

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player name="Player 1" symbol="X" isActive={activePlayer === "X"} />
          <Player name="Player 2" symbol="O" isActive={activePlayer === "O"} />
        </ol>
        <GameBoard onSquareSelect={handleChangePlayer} turns={gameTurns} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
