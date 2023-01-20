import { useSelector } from "react-redux";
import Button from "./Button";
import MusicPlayer from "./MusicPlayer";

const Result = () => {
  const game = useSelector((state) => state.game);

  return (
    <div className="container">
      <h1>Score</h1>
      <p>{game.score}</p>
      <h2 className={game.guessWasCorrect ? "correct" : "wrong"}>
        {game.guessWasCorrect ? "Correct" : "Game Over"}
      </h2>
      <Button content={game.guessWasCorrect ? "Start Next Round" : "Replay"} />
      <Button content="Quit" />
      <MusicPlayer />
    </div>
  );
};

export default Result;
