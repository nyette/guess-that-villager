import styled from "styled-components";
import { useSelector } from "react-redux";
import Button from "./Button";
import MusicPlayer from "./MusicPlayer";

const StyledHeading = styled.h1`
  color: ${(props) => (props.guessWasCorrect ? "green" : "red")};
`;

const Result = () => {
  const game = useSelector((state) => state.game);

  return (
    <div>
      <StyledHeading guessWasCorrect={game.guessWasCorrect}>
        {game.guessWasCorrect ? "Correct" : "Game Over"}
      </StyledHeading>
      <h2>Score</h2>
      <p>{game.score}</p>
      <Button content={game.guessWasCorrect ? "Start Next Round" : "Replay"} />
      <Button content="Quit" />
      <MusicPlayer />
    </div>
  );
};

export default Result;
