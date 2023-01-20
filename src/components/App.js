import { useSelector } from "react-redux";
import MainMenu from "./MainMenu";
import Error from "./Error";
import Villager from "./Villager";
import Result from "./Result";

const App = () => {
  const game = useSelector((state) => state.game);

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

  return <div className="app">{renderGame()}</div>;
};

export default App;
