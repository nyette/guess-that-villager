import getRandomVillager from "../services/getRandomVillager";
import { useState, useEffect, useRef } from "react";
import Score from "./Score";
import Result from "./Result";

const Villager = (props) => {
  const [villager, setVillager] = useState({});
  const [guess, setGuess] = useState("");
  const [score, setScore] = useState(0);
  const [result, setResult] = useState("");
  const [resultClassName, setResultClassName] = useState("");
  const submitButtonRef = useRef(null);
  const [timeLeft, setTimeLeft] = useState(10);
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    getRandomVillager().then((randomVillager) => setVillager(randomVillager));
  }, []);

  useEffect(() => {
    const countdown = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
      if (timeLeft === 1) {
        submitButtonRef.current.click();
      }
    }, 1000);
    return () => clearTimeout(countdown);
  }, [timeLeft]);

  const handleChange = (e) => {
    setGuess(e.target.value);
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Disable further submissions
    setIsDisabled(true);
    // Compare guess to data
    if (guess === villager["name"]["name-USen"]) {
      // If correct, increase score
      setScore(score + 1);
      // Reset guess
      setGuess("");
      // Show result
      setResultClassName("correct");
      setResult("Correct");
      // Prepare for a new round
      setTimeout(() => {
        // Reset result
        setResultClassName("");
        setResult("");
        // Allow submissions
        setIsDisabled(false);
      }, 2000);
      // Change villager
      getRandomVillager().then((randomVillager) => setVillager(randomVillager));
      // Reset countdown
      setTimeLeft(12);
    } else {
      // Otherwise, end the game
      setResultClassName("wrong");
      setResult("Game Over");
      setTimeout(() => {
        props.setGameStarted(!props.gameStarted);
      }, 2000);
    }
  }
  
  return (
    <div>
      <Score score={score} />
      {villager["icon_uri"] ? <img src={villager["icon_uri"]} alt="villager" /> : <p className="my-3">Loading...</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Enter the villager's name" name="guess" value={guess} onChange={handleChange} />
        <input type="submit" ref={submitButtonRef} className="btn btn-primary btn-lg" disabled={isDisabled} value={isDisabled ? "Submitted" : `Submit (${timeLeft})`} />
      </form>
      {result === "" ? null : <Result resultClassName={resultClassName} result={result} />}
    </div>
  );
}

export default Villager;