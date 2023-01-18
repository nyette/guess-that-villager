import { useContext, useRef, useEffect } from "react";
import GameContext from "../contexts/game";
import MusicPlayer from "./MusicPlayer";

const Villager = () => {
  const { game, setGame } = useContext(GameContext);

  const submitButtonRef = useRef(null);

  useEffect(() => {
    const getRandomIntInclusive = (min, max) => {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1) + min);
    };
    const getRandomVillager = async () => {
      setGame({
        type: "START_FETCH",
      });
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
        setGame({
          type: "END_FETCH",
          data: randomVillager,
        });
      } catch (e) {
        setGame({
          type: "CATCH_ERROR",
          data: e,
        });
      }
    };
    getRandomVillager();
  }, [setGame]);

  useEffect(() => {
    if (game.villager) {
      setGame({
        type: "CHANGE_MUSIC",
        data: "/assets/music/timer.mp3",
      });
    }
  }, [setGame, game.villager]);

  useEffect(() => {
    if (game.villager) {
      const countdown = setTimeout(() => {
        if (game.timeLeft === 0) {
          submitButtonRef.current.click();
        } else {
          setGame({
            type: "DECREASE_TIME_LEFT",
          });
        }
      }, 1000);
      return () => clearTimeout(countdown);
    }
  }, [setGame, game.villager, game.timeLeft]);

  const handleChange = (e) => {
    setGame({
      type: "CHANGE_GUESS",
      data: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setGame({
      type: "SUBMIT_GUESS",
    });
    if (game["guess"] === game["villager"]["name"]["name-USen"]) {
      setGame({
        type: "CHECK_GUESS",
        data: true,
      });
      setGame({
        type: "INCREASE_SCORE",
      });
      setGame({
        type: "CHANGE_MUSIC",
        data: "/assets/music/correct.mp3",
      });
    } else {
      setGame({
        type: "CHECK_GUESS",
        data: false,
      });
      setGame({
        type: "CHANGE_MUSIC",
        data: "/assets/music/wrong.mp3",
      });
    }
  };

  if (game.villager) {
    return (
      <div className="container">
        <img src={game["villager"]["icon_uri"]} alt="villager" />
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter the villager's name"
            name="guess"
            value={game.guess}
            onChange={handleChange}
          />
          <button
            type="submit"
            ref={submitButtonRef}
            className="btn btn-primary"
          >
            {game.timeLeft > 0 ? `Submit (${game.timeLeft})` : "Submitted"}
          </button>
        </form>
        <MusicPlayer />
      </div>
    );
  } else {
    return (
      <div className="container">
        <h1>Loading...</h1>
      </div>
    );
  }
};

export default Villager;
