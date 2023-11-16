import { useState } from "react";

export const Player = ({ name, symbol, isActive, changePlayer }) => {
  const [isEditing, setIsEdited] = useState(false);
  const [playerName, setPlayerName] = useState(name);

  const handleEditClick = () => {
      setIsEdited((editing) => !editing);
      isEditing && changePlayer(symbol, playerName)
  };

  const handleNameChange = (event) => {
    setPlayerName(event.target.value);
  };

  let playerNameElement = <span className="player-name">{playerName}</span>;

  if (isEditing) {
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
      <button onClick={handleEditClick}>{isEditing ? "Save" : "Edit"}</button>
    </li>
  );
};
