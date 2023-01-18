import { useReducer } from "react";
import { gameReducer, initialGame } from "../reducers/game";
import GameContext from "../contexts/game";
import MainMenu from "./MainMenu";
import Error from "./Error";
import Villager from "./Villager";
import Result from "./Result";

const App = () => {
  const [game, setGame] = useReducer(gameReducer, initialGame);

  const renderGame = () => {
    if (game.selectedOption === "Play") {
      if (game.guessWasSubmitted) {
        return <Result />;
      } else {
        if (game.error) {
          return <Error />;
        } else {
          return <Villager />;
        }
      }
    } else {
      return <MainMenu />;
    }
  };

  return (
    <GameContext.Provider value={{ game, setGame }}>
      <div className="app">{renderGame()}</div>
    </GameContext.Provider>
  );
};

export default App;
