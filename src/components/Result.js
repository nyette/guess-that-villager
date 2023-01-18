import { useContext } from "react";
import GameContext from "../contexts/game";
import MusicPlayer from "./MusicPlayer";
import Button from "./Button";

const Result = () => {
  const { game } = useContext(GameContext);

  return (
    <div className="container">
      <h1>Score</h1>
      <p>{game.score}</p>
      {game.guessWasCorrect ? (
        <h2 className="correct">Correct</h2>
      ) : (
        <h2 className="wrong">Game Over</h2>
      )}
      {game.guessWasCorrect ? (
        <Button content="Continue" />
      ) : (
        <Button content="Replay" />
      )}
      <Button content="Quit" />
      <MusicPlayer />
    </div>
  );
};

export default Result;
