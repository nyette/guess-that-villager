import { useContext } from "react";
import GameContext from "./GameContext";

const Error = () => {
  const { game, setGame } = useContext(GameContext);

  return (
    <div className="container">
      <h1 className="wrong">Error</h1>
      <p>{game.error.message}</p>
      <button
        className="btn btn-primary"
        onClick={() => setGame({ type: "RETURN_TO_MAIN_MENU" })}
      >
        Return To Main Menu
      </button>
    </div>
  );
};

export default Error;
