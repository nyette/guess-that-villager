import { useDispatch } from "react-redux";
import { play, startNextRound, replay, quit } from "../slices/game";

const Button = ({ content }) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    const mapping = {
      Play: play,
      "Start Next Round": startNextRound,
      Replay: replay,
      Quit: quit,
    };
    dispatch(mapping[content]());
  };

  return (
    <button className="btn btn-primary" onClick={handleClick}>
      {content}
    </button>
  );
};

export default Button;
