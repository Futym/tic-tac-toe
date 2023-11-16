import { useState } from "react";

export const Player = ({ name, symbol, isActive }) => {
  const [isEdited, setIsEdited] = useState(false);
  const [playerName, setPlayerName] = useState(name);

  const handleEditClick = () => {
    setIsEdited((editing) => !editing);
  };

  const handleNameChange = (event) => {
    setPlayerName(event.target.value);
  };

  let playerNameElement = <span className="player-name">{playerName}</span>;

  if (isEdited) {
    playerNameElement = (
      <input
        type="text"
        required
        value={playerName}
        onChange={handleNameChange}
      />
    );
  }

  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player">
        {playerNameElement}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEditClick}>{isEdited ? "Save" : "Edit"}</button>
    </li>
  );
};
