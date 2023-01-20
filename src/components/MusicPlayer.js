import { useSelector } from "react-redux";

const MusicPlayer = () => {
  const music = useSelector((state) => state.game.music);

  return <audio src={music} autoPlay></audio>;
};

export default MusicPlayer;
