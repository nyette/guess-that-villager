import styled from "styled-components";
import Button from "./Button";

const StyledHeading = styled.h1`
  color: hotpink;
`;

const MainMenu = () => {
  return (
    <div>
      <StyledHeading>Guess That Villager</StyledHeading>
      <p>Identify as many Animal Crossing villagers as you can!</p>
      <Button content="Play" />
    </div>
  );
};

export default MainMenu;
