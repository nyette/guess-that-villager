import styled from "styled-components";
import { modes } from "../slices/settings";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSun,
  faMoon,
  faPlay,
  faRepeat,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { enableLightMode, enableDarkMode } from "../slices/settings";
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

const StyledSettingsButton = styled(StyledButton)`
  border-radius: 50%;
  border-style: none;
`;

const Button = ({ content }) => {
  const settings = useSelector((state) => state.settings);

  const dispatch = useDispatch();

  const mapping = {
    "Enable Light Mode": {
      cb: enableLightMode,
      icon: faSun,
    },
    "Enable Dark Mode": {
      cb: enableDarkMode,
      icon: faMoon,
    },
    Play: {
      cb: play,
      icon: faPlay,
    },
    "Start Next Round": {
      cb: startNextRound,
      icon: faRepeat,
    },
    Replay: {
      cb: replay,
      icon: faRepeat,
    },
    Quit: {
      cb: quit,
      icon: faArrowRightFromBracket,
    },
  };

  const handleClick = () => {
    dispatch(mapping[content].cb());
  };

  const handleIcon = () => {
    return mapping[content].icon;
  };

  if (content.startsWith("Enable")) {
    return (
      <StyledSettingsButton
        dark={settings.mode === "dark"}
        onClick={handleClick}
      >
        <FontAwesomeIcon icon={handleIcon()} />
      </StyledSettingsButton>
    );
  } else {
    return (
      <StyledButton dark={settings.mode === "dark"} onClick={handleClick}>
        <FontAwesomeIcon icon={handleIcon()} /> {content}
      </StyledButton>
    );
  }
};

export default Button;
