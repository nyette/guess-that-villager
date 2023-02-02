import styled from "styled-components";
import { modes } from "../slices/settings";
import { useSelector } from "react-redux";
import Header from "./Header";
import MainMenu from "./MainMenu";
import Error from "./Error";
import Villager from "./Villager";
import Result from "./Result";

const StyledApp = styled.div`
  background: ${(props) =>
    props.dark ? modes.dark.background : modes.light.background};
  color: ${(props) => (props.dark ? modes.dark.color : modes.light.color)};
  height: 100%;
  margin: 0;
`;

const StyledMain = styled.main`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1rem;
`;

const App = () => {
  const game = useSelector((state) => state.game);
  const settings = useSelector((state) => state.settings);

  const renderGame = () => {
    if (game.selectedOption === "Play") {
      if (game.guessWasSubmitted) {
        return <Result />;
      } else {
        if (game.error) {
          return <Error />;
        } else {
          return <Villager />;
        }
      }
    } else {
      return <MainMenu />;
    }
  };

  return (
    <StyledApp dark={settings.mode === "dark"}>
      <Header />
      <StyledMain>{renderGame()}</StyledMain>
    </StyledApp>
  );
};

export default App;
