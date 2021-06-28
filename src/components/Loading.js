import { useContext, useEffect } from "react";
import GameContext from "./GameContext";

const Loading = () => {
  
  const { setGame } = useContext(GameContext);

  useEffect(() => {
    const getRandomIntInclusive = (min, max) => {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1) + min);
    };
    const getRandomVillager = async () => {
      setGame({
        type: "START_FETCH"
      });
      const minVillagerId = 1;
      const maxVillagerId = 391;
      const randomVillagerId = getRandomIntInclusive(minVillagerId, maxVillagerId);
      const apiUrl = "https://acnhapi.com/v1/villagers/";
      const randomVillagerUrl = apiUrl + randomVillagerId;
      try {
        const res = await fetch(randomVillagerUrl);
        const randomVillager = await res.json();
        setGame({
          type: "END_FETCH",
          data: randomVillager
        });
      } catch (e) {
        setGame({
          type: "CATCH_ERROR",
          data: e
        });
      }
    };
    getRandomVillager();
  }, [setGame]);

  useEffect(() => {
    setGame({
      type: "CHANGE_MUSIC",
      data: "/assets/music/timer.mp3"
    });
  }, [setGame]);

  return (
    <div className="container">
      <h1>Loading...</h1>
    </div>
  );

}

export default Loading;