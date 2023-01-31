import styled from "styled-components";
import { modes } from "../slices/settings";
import { useSelector, useDispatch } from "react-redux";
import { play, startNextRound, replay, quit } from "../slices/game";

export const StyledButton = styled.button`
  background: ${(props) =>
    props.dark ? modes.dark.background : modes.light.background};
  border: 2px solid
    ${(props) => (props.dark ? modes.dark.color : modes.light.color)};
  border-radius: 12px;
  color: ${(props) => (props.dark ? modes.dark.color : modes.light.color)};
  display: inline-block;
  font-size: 1rem;
  margin: 1rem;
  padding: 1rem;
`;

const Button = ({ content }) => {
  const settings = useSelector((state) => state.settings);

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
    <StyledButton dark={settings.mode === "dark"} onClick={handleClick}>
      {content}
    </StyledButton>
  );
};

export default Button;
