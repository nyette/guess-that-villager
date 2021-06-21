import getRandomVillager from "../services/getRandomVillager";
import { useContext, useRef, useEffect } from "react";
import GameContext from "./GameContext";

const Villager = () => {

  const { game, setGame } = useContext(GameContext);

  const submitButtonRef = useRef(null);

  useEffect(() => {
    setGame({
      type: "START_FETCH"
    });
    getRandomVillager()
    .then((randomVillager) => {
      setGame({
        type: "END_FETCH",
        data: randomVillager
      });
    });
  }, [setGame]);

  useEffect(() => {
    const countdown = setTimeout(() => {
      if (game.timeLeft === 0) {
        submitButtonRef.current.click();
      } else {
        setGame({
          type: "DECREASE_TIME_LEFT"
        });
      }
    }, 1000);
    return () => clearTimeout(countdown);
  }, [setGame, game.timeLeft]);

  const handleChange = (e) => {
    setGame({
      type: "CHANGE_GUESS",
      data: e.target.value
    });
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setGame({
      type: "SUBMIT_GUESS"
    });
    const language = "name-" + game["language"];
    if (game["guess"] === game["villager"]["name"][language]) {
      setGame({
        type: "CHECK_GUESS",
        data: true
      });
      setGame({
        type: "INCREASE_SCORE"
      });
    } else {
      setGame({
        type: "CHECK_GUESS",
        data: false
      });
    }
  }
  
  return (
    <div className="container">
      {game["villager"] ? <img src={game["villager"]["icon_uri"]} alt="villager" /> : <p>Loading...</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Enter the villager's name" name="guess" value={game.guess} onChange={handleChange} />
        <button type="submit" ref={submitButtonRef} className="btn btn-primary">{game.timeLeft > 0 ? `Submit (${game.timeLeft})` : "Submitted"}</button>
      </form>
    </div>
  );
}

export default Villager;