import { useContext } from "react";
import GameContext from "./GameContext";
import MusicPlayer from "./MusicPlayer";

const Result = () => {
  
  const { game, setGame } = useContext(GameContext);

  if (game.guessWasCorrect) {
    return (
      <div className="container">
        <h1>Score</h1>
        <p>{game.score}</p>
        <h2 className="correct">Correct</h2>
        <MusicPlayer />
        <button className="btn btn-primary" onClick={() => setGame({ type: "START_NEXT_ROUND" })}>
          Start Next Round
        </button>
        <button className="btn btn-primary" onClick={() => setGame({ type: "RETURN_TO_MAIN_MENU" })}>
          Return To Main Menu
        </button>
      </div>
    );
  } else {
    return (
      <div className="container">
        <h1>Score</h1>
        <p>{game.score}</p>
        <h2 className="wrong">Game Over</h2>
        <MusicPlayer />
        <button className="btn btn-primary" onClick={() => setGame({ type: "REPLAY" })}>
          Replay
        </button>
        <button className="btn btn-primary" onClick={() => setGame({ type: "RETURN_TO_MAIN_MENU" })}>
          Return To Main Menu
        </button>
      </div>
    );
  }
}

export default Result;