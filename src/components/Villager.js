import { useState, useEffect } from "react";
import Score from "./Score";
import Result from "./Result";

const getRandomVillager = async () => {
  const maxVillagerId = 391;
  const randomVillagerId = Math.round(Math.random() * maxVillagerId);
  const apiUrl = "https://acnhapi.com/v1/villagers/";
  const villagerUrl = apiUrl + randomVillagerId;
  try {
    const res = await fetch(villagerUrl);
    const villager = await res.json();
    return villager;
  } catch (e) {
    console.error(e);
  }
}

const Villager = (props) => {
  const [villager, setVillager] = useState({});
  const [guess, setGuess] = useState("");
  const [score, setScore] = useState(0);
  const [result, setResult] = useState("");
  const [resultClassName, setResultClassName] = useState("");

  useEffect(() => {
    getRandomVillager().then((villager) => setVillager(villager));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Compare guess to data
    if (guess === villager["name"]["name-USen"]) {
      // If correct, increase score
      setScore(score + 1);
      // Reset guess
      setGuess("");
      // Show result
      setResultClassName("correct");
      setResult("Correct");
      // Remove result after a few seconds
      setTimeout(() => {
        setResultClassName("");
        setResult("");
      }, 2000);
      // Change villager
      getRandomVillager().then((villager) => setVillager(villager));
    } else {
      // Otherwise, end the game
      setResultClassName("wrong");
      setResult("Wrong");
      setTimeout(() => {
        props.setGameStarted(!props.gameStarted);
      }, 2000);
    }
  }
  
  return (
    <div>
      <Score score={score} />
      {villager["icon_uri"] ? <img src={villager["icon_uri"]} alt="villager" /> : <p>Loading...</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Enter the villager's name..." name="guess" value={guess} onChange={(e) => setGuess(e.target.value)} />
        <button className="btn btn-primary" type="submit">Submit</button>
      </form>
      {result === "" ? null : <Result resultClassName={resultClassName} result={result} />}
    </div>
  );
}

export default Villager;