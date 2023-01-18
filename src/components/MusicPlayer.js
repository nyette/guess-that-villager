import { useContext } from "react";
import GameContext from "../contexts/game";

const MusicPlayer = () => {
  const { game } = useContext(GameContext);

  return <audio src={game.music} autoPlay></audio>;
};

export default MusicPlayer;
