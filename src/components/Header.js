import styled from "styled-components";
import { StyledButton } from "./Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { enableLightMode, enableDarkMode } from "../slices/settings";

const StyledHeader = styled.header`
  align-items: center;
  display: flex;
  justify-content: center;
  padding: 1rem;
`;

const SettingsButton = styled(StyledButton)`
  border-radius: 50%;
  border-style: none;
`;

const Header = () => {
  const settings = useSelector((state) => state.settings);

  const dispatch = useDispatch();

  const mapping = {
    dark: {
      cb: enableLightMode,
      icon: faSun,
    },
    light: {
      cb: enableDarkMode,
      icon: faMoon,
    },
  };

  const switchMode = () => {
    dispatch(mapping[settings.mode].cb());
  };

  const switchIcon = () => {
    return mapping[settings.mode].icon;
  };

  return (
    <StyledHeader>
      <SettingsButton dark={settings.mode === "dark"} onClick={switchMode}>
        <FontAwesomeIcon icon={switchIcon()} />
      </SettingsButton>
    </StyledHeader>
  );
};

export default Header;
