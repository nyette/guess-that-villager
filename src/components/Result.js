import { useContext } from "react";
import GameContext from "./GameContext";

const Result = () => {
  
  const { game, setGame } = useContext(GameContext);

  const getResult = () => {
    if (game.guessWasCorrect) {
      return (
        <div>
          <h3 className="correct">Correct</h3>
          <button className="btn btn-primary" onClick={() => setGame({ type: "START_NEXT_ROUND" })}>
            Start Next Round
          </button>
        </div>
      );
    } else {
      return (
        <div>
          <h3 className="wrong">Game Over</h3>
          <button className="btn btn-primary" onClick={() => setGame({ type: "REPLAY" })}>
            Replay
          </button>
        </div>
      );
    }
  }

  return (
    <div className="container">
      <h2>Score</h2>
      <p>{game.score}</p>
      {getResult()}
      <button className="btn btn-primary" onClick={() => setGame({ type: "RETURN_TO_MAIN_MENU" })}>
        Return To Main Menu
      </button>
    </div>
  );
}

export default Result;