import styled from "styled-components";
import { StyledButton } from "./Button";
import { modes } from "../slices/settings";
import { useSelector, useDispatch } from "react-redux";
import { useRef, useEffect } from "react";
import {
  startFetch,
  endFetch,
  catchError,
  handleMusic,
  decreaseTimeLeft,
  changeGuess,
  handleCorrectGuess,
  handleWrongGuess,
} from "../slices/game";
import MusicPlayer from "./MusicPlayer";

const StyledImage = styled.img`
  border-radius: 50%;
  height: auto;
  margin: 1rem;
  padding: 1rem;
  width: 50%;
`;

const StyledInput = styled.input`
  background: ${(props) =>
    props.dark ? modes.dark.background : modes.light.background};
  color: ${(props) => (props.dark ? modes.dark.color : modes.light.color)};
  display: block;
  font-size: 1rem;
  margin: 1rem auto;
  max-width: 80%;
  padding: 1rem;
`;

const Villager = () => {
  const game = useSelector((state) => state.game);

  const settings = useSelector((state) => state.settings);

  const dispatch = useDispatch();

  const submitButtonRef = useRef(null);

  useEffect(() => {
    const getRandomIntInclusive = (min, max) => {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1) + min);
    };
    const getRandomVillager = async () => {
      const minVillagerId = 1;
      const maxVillagerId = 391;
      const randomVillagerId = getRandomIntInclusive(
        minVillagerId,
        maxVillagerId
      );
      const apiUrl = "https://acnhapi.com/v1/villagers/";
      const randomVillagerUrl = apiUrl + randomVillagerId;
      try {
        const res = await fetch(randomVillagerUrl);
        const randomVillager = await res.json();
        dispatch(endFetch(randomVillager));
      } catch (e) {
        dispatch(catchError(e));
      }
    };
    dispatch(startFetch());
    getRandomVillager();
  }, [dispatch]);

  useEffect(() => {
    if (game.villager) {
      dispatch(handleMusic());
    }
  }, [game.villager, dispatch]);

  useEffect(() => {
    if (game.villager) {
      const countdown = setTimeout(() => {
        if (game.timeLeft === 0) {
          submitButtonRef.current.click();
        } else {
          dispatch(decreaseTimeLeft());
        }
      }, 1000);
      return () => clearTimeout(countdown);
    }
  }, [game.villager, game.timeLeft, dispatch]);

  const handleChange = (e) => dispatch(changeGuess(e.target.value));

  const handleSubmit = (e) => {
    e.preventDefault();
    const guessIsCorrect = game.guess === game.villager.name["name-USen"];
    if (guessIsCorrect) {
      dispatch(handleCorrectGuess());
    } else {
      dispatch(handleWrongGuess());
    }
  };

  if (game.villager) {
    return (
      <div>
        <StyledImage src={game.villager["icon_uri"]} alt="villager" />
        <form onSubmit={handleSubmit}>
          <StyledInput
            type="text"
            placeholder="Enter the villager's name"
            name="guess"
            value={game.guess}
            onChange={handleChange}
            dark={settings.mode === "dark"}
          />
          <StyledButton
            type="submit"
            ref={submitButtonRef}
            dark={settings.mode === "dark"}
          >
            {game.timeLeft > 0 ? `Submit (${game.timeLeft})` : "Submitted"}
          </StyledButton>
        </form>
        <MusicPlayer />
      </div>
    );
  } else {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }
};

export default Villager;
