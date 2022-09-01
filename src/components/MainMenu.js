import { useContext } from "react";
import GameContext from "./GameContext";

const MainMenu = () => {
  const { setGame } = useContext(GameContext);

  return (
    <div className="container">
      <h1>Guess That Villager</h1>
      <p>Identify as many Animal Crossing villagers as you can!</p>
      <button
        className="btn btn-primary"
        onClick={() => setGame({ type: "START_GAME" })}
      >
        Play
      </button>
    </div>
  );
};

export default MainMenu;
