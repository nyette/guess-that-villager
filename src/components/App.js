import { useReducer } from "react";
import GameContext, { gameReducer, initialGame } from "./GameContext";
import MainMenu from "./MainMenu";
import Loading from "./Loading";
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
        if (game.villager) {
          return <Villager />;
        } else {
          if (game.error) {
            return <Error />;
          } else {
            return <Loading />;
          }
        }
      }
    } else {
      return <MainMenu />;
    }
  }

  return (
    <GameContext.Provider value={{ game, setGame }}>
      <div className="app">
        {renderGame()}
      </div>
    </GameContext.Provider>
  );
}

export default App;