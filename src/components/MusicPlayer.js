import styled from "styled-components";
import { useSelector } from "react-redux";

const StyledMusicPlayer = styled.audio`
  display: block;
  margin: 1rem auto;
  max-width: 80%;
`;

const MusicPlayer = () => {
  const music = useSelector((state) => state.game.music);

  return <StyledMusicPlayer src={music} autoPlay></StyledMusicPlayer>;
};

export default MusicPlayer;
